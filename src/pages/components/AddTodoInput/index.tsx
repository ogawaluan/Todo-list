import { useState } from "react";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { TRPCClientError } from "@trpc/client";

const AddTodoInput = () => {
  const utils = api.useContext();
  const mutation = api.todo.createTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.getAllTodos.invalidate();
    },
    onError: (error) => {
      if (error instanceof TRPCClientError) {
        const parseError = JSON.parse(error.message) as Array<{
          message: string;
        }>;
        console.log(parseError[0]?.message);
        toast(parseError[0]?.message, {
          type: "error",
        });
      }
    },
  });

  const [todo, setTodo] = useState<string>("");

  const handleAddTodo = (todo: string) => {
    mutation.mutate({ title: todo });
    setTodo("");
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      bgcolor="#fff"
      borderRadius={1}
      padding={0.5}
      pl={2}
      mb={3}
    >
      <FormControlLabel
        control={<Checkbox name="checkedB" color="primary" disabled />}
        label=""
        sx={{ marginRight: 1 }}
      />
      <TextField
        id="outlined-basic"
        variant="standard"
        color="primary"
        placeholder="To submit, press enter"
        fullWidth
        InputProps={{
          disableUnderline: true,
          style: { background: "transparent" },
        }}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo(todo)}
      />
    </Box>
  );
};

export default AddTodoInput;
