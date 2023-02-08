import { DeleteForever } from "@mui/icons-material";
import { Button as ButtonJoy } from "@mui/joy";
import {
  Box,
  Button as ButtonMaterial,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import type { Todo } from "@prisma/client";
import { useState } from "react";
import { api } from "../../../utils/api";
import DeleteModal from "../DeleteModal";
import UpdateTodoModal from "../UpdateTodoModal";

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: ITodoItemProps) => {
  const utils = api.useContext();

  const { isLoading, mutate } = api.todo.updateTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.getAllTodos.invalidate();
    },
  });

  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const handleCheckTodo = (check: boolean) => {
    mutate({ id: todo.id, data: { completed: check } });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      bgcolor="#fff"
      padding={0.5}
      pl={2}
      borderBottom={1}
      borderColor="#d3d3d3"
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              checked={todo.completed}
              disabled={todo.completed}
              onClick={() => handleCheckTodo(true)}
            />
          }
          label=""
          sx={{ marginRight: 1 }}
        />
      )}
      <ButtonMaterial
        color="inherit"
        fullWidth
        sx={{
          justifyContent: "start",
          textTransform: "initial",
          textDecorationLine: todo.completed ? "line-through" : "initial",
        }}
        onClick={() => setIsOpenUpdate(true)}
      >
        {todo.title}
      </ButtonMaterial>
      <ButtonJoy
        variant="plain"
        color="danger"
        onClick={() => setIsOpenDelete(true)}
      >
        <DeleteForever />
      </ButtonJoy>
      <UpdateTodoModal
        todo={todo}
        isOpen={isOpenUpdate}
        onChangeIsOpen={(isOpen) => setIsOpenUpdate(isOpen)}
      />
      <DeleteModal
        isOpen={isOpenDelete}
        onChangeIsOpen={(isOpen) => setIsOpenDelete(isOpen)}
        todoId={todo.id}
      />
    </Box>
  );
};

export default TodoItem;
