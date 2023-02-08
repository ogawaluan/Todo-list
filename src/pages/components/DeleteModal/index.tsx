import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import { TRPCClientError } from "@trpc/client";

interface IDeleteModalProps {
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
  todoId?: string;
}

const DeleteModal = ({ isOpen, onChangeIsOpen, todoId }: IDeleteModalProps) => {
  const utils = api.useContext();
  const { isLoading: isLoadingClear, mutate: mutateClear } =
    api.todo.clearCompletedTodos.useMutation({
      onSuccess: async () => {
        await utils.todo.getAllTodos.invalidate();
        onChangeIsOpen(false);
        toast("Cleaned all to-dos successfully", {
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

  const { isLoading: isLoadingDeleteTodo, mutate: mutateDeleteTodo } =
    api.todo.deleteTodo.useMutation({
      onSuccess: async () => {
        await utils.todo.getAllTodos.invalidate();
        onChangeIsOpen(false);
        toast("Deleted to-do successfully", {
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

  const handleDelete = () => {
    if (todoId) {
      mutateDeleteTodo({ id: todoId });
    } else {
      mutateClear();
    }
  };

  return (
    <Modal open={isOpen} onClose={() => onChangeIsOpen(false)}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        aria-labelledby="alert-dialog-modal-title"
        aria-describedby="alert-dialog-modal-description"
      >
        <Typography
          id="alert-dialog-modal-title"
          component="h2"
          startDecorator={<WarningRoundedIcon />}
        >
          Confirmation
        </Typography>
        <Divider />
        <Typography
          id="alert-dialog-modal-description"
          textColor="text.tertiary"
        >
          {todoId
            ? "Are you sure you want to discard?"
            : "Are you sure you want to discard all of your completed to-dos?"}
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
        >
          <Button
            variant="plain"
            color="neutral"
            onClick={() => onChangeIsOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" color="danger" onClick={handleDelete}>
            {isLoadingClear || isLoadingDeleteTodo ? (
              <CircularProgress size="sm" />
            ) : (
              "Discard"
            )}
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
