import { TRPCError, type inferProcedureInput } from "@trpc/server";
import { appRouter, type AppRouter } from "../root";
import { createInnerTRPCContext } from "../trpc";
import { expect, test } from "vitest";

test("Creating a todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["todo"]["createTodo"]>;
  const input: Input = {
    title: "test",
  };

  const todo = await caller.todo.createTodo(input);

  expect(todo).toMatchObject({ title: "test" });
  await caller.todo.deleteTodo({ id: todo.id });
});

test("Should not allow creating a todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["todo"]["createTodo"]>;
  const input: Input = {
    example: "test",
  };

  await expect(caller.todo.createTodo(input)).rejects.toBeInstanceOf(TRPCError);
});

test("Updating a todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["todo"]["createTodo"]>;
  type UpdateInput = inferProcedureInput<AppRouter["todo"]["updateTodo"]>;
  const input: Input = {
    title: "test",
  };

  const todo = await caller.todo.createTodo(input);

  const updatedInput: UpdateInput = {
    id: todo.id,
    data: {
      completed: true,
    },
  };

  const updatedTodo = await caller.todo.updateTodo(updatedInput);

  expect(updatedTodo).toMatchObject({ title: "test", completed: true });
  await caller.todo.deleteTodo({ id: todo.id });
});

test("Should not update a nonexistent todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type UpdateInput = inferProcedureInput<AppRouter["todo"]["updateTodo"]>;

  const updatedInput: UpdateInput = {
    id: "1231231",
    data: {
      completed: true,
    },
  };

  await expect(caller.todo.updateTodo(updatedInput)).rejects.toBeInstanceOf(
    TRPCError
  );
});

test("Should be able to list todos", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["todo"]["createTodo"]>;
  const input: Input = {
    title: "test",
  };

  const todo = await caller.todo.createTodo(input);

  const todos = await caller.todo.getAllTodos();

  expect(todos.length).greaterThan(0);
  await caller.todo.deleteTodo({ id: todo.id });
});

test("Should be able to delete a todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter["todo"]["createTodo"]>;
  const input: Input = {
    title: "test",
  };

  const todoCreated = await caller.todo.createTodo(input);

  const todos = await caller.todo.getAllTodos();

  const deletedTodo = await caller.todo.deleteTodo({ id: todoCreated.id });

  const findDeleteTodo = todos.find((todo) => todo === deletedTodo);

  expect(findDeleteTodo).toBeUndefined();
});

test("Should not delete a nonexistent todo", async () => {
  const ctx = createInnerTRPCContext({});
  const caller = appRouter.createCaller(ctx);

  type DeleteTodo = inferProcedureInput<AppRouter["todo"]["deleteTodo"]>;

  const deletedTodo: DeleteTodo = {
    id: "1231231",
  };

  await expect(caller.todo.deleteTodo(deletedTodo)).rejects.toBeInstanceOf(
    TRPCError
  );
});
