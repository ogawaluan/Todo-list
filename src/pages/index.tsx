import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import AddTodoInput from "./components/AddTodoInput";
import TodoItem from "./components/TodoItem";
import { useState } from "react";
import DeleteModal from "./components/DeleteModal";

const Home: NextPage = () => {
  const { isLoading, isSuccess, data } = api.todo.getAllTodos.useQuery(
    undefined,
    {
      staleTime: 30000,
    }
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>ToDo List App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "300px",
            background: "linear-gradient(to right bottom, #1D3FB8, #0079B8)",
          }}
        ></Box>
        <Container maxWidth="sm" sx={{ alignSelf: "center", marginBottom: 10 }}>
          <Typography
            fontSize={42}
            fontWeight="700"
            letterSpacing={15}
            color="white"
            mt={-31}
            pt={10}
            mb={5}
          >
            TODO
          </Typography>
          <AddTodoInput />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setIsOpen(true)}>
              Clear All completed To-do
            </Button>
          </Box>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 4,
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : data?.length === 0 ? (
              <Typography textAlign={"center"}>Empty todo</Typography>
            ) : (
              isSuccess &&
              data.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </Box>
        </Container>
        <DeleteModal
          isOpen={isOpen}
          onChangeIsOpen={(isOpen) => setIsOpen(isOpen)}
        />
      </Box>
    </>
  );
};

export default Home;
