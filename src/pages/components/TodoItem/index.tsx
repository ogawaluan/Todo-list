import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import type { Todo } from "@prisma/client";
import { useState } from "react";
import { api } from "../../../utils/api";
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <Button
        color="inherit"
        fullWidth
        sx={{
          justifyContent: "start",
          textTransform: "initial",
          textDecorationLine: todo.completed ? "line-through" : "initial",
        }}
        onClick={() => setIsOpen(true)}
      >
        {todo.title}
      </Button>
      <UpdateTodoModal
        todo={todo}
        isOpen={isOpen}
        onChangeIsOpen={(isOpen) => setIsOpen(isOpen)}
      />
    </Box>
  );
};

export default TodoItem;
