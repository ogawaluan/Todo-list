import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  createTodo: publicProcedure
    .input(
      z.object({
        title: z
          .string({
            required_error: "Title is required",
          })
          .min(1, "Title too short"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.create({
        data: input,
      });

      return todo;
    }),
  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      orderBy: {
        completed: "desc",
      },
    });
  }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        data: z.object({
          completed: z.boolean().optional(),
          title: z.string().min(1, "Title too short").optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const todo = await ctx.prisma.todo.update({
        where: { id },
        data,
      });

      return todo;
    }),
  deleteTodo: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;

      return ctx.prisma.todo.delete({ where: { id } });
    }),
  clearCompletedTodos: publicProcedure.mutation(({ ctx }) => {
    return ctx.prisma.todo.deleteMany({ where: { completed: true } });
  }),
});
