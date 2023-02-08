import { type ChangeEvent, useState, type FormEvent } from "react";
import type { Todo } from "@prisma/client";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { TRPCClientError } from "@trpc/client";

interface IUpdateModalProps {
  todo: Todo;
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
}

const UpdateTodoModal = ({
  todo,
  isOpen,
  onChangeIsOpen,
}: IUpdateModalProps) => {
  const utils = api.useContext();
  const { isLoading, mutate } = api.todo.updateTodo.useMutation({
    onSuccess: async () => {
      await utils.todo.getAllTodos.invalidate();
      onChangeIsOpen(false);
      toast("To do has been updated successfully", {
        type: "success",
      });
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

  const [checked, setChecked] = useState<boolean>(todo.completed);
  const [title, setTitle] = useState<string>(todo.title);

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ id: todo.id, data: { title, completed: checked } });
  };

  return (
    <Modal open={isOpen} onClose={() => onChangeIsOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.body",
          }}
        />
        <Typography id="basic-modal-dialog-title" component="h2">
          Update a To do
        </Typography>
        <Typography mb={2}>
          If you want, you can change the information of a to do.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                autoFocus
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChangeCheck}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    defaultChecked={todo.completed}
                  />
                }
                label="Completed"
              />
            </FormControl>
            <Button type="submit">
              {isLoading ? (
                <CircularProgress color="neutral" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default UpdateTodoModal;
