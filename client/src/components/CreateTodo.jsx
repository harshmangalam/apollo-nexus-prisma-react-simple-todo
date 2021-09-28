import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {QUERY_TODOS} from "../graphql-query"
const MUTATION_CREATE_TODO = gql`
  mutation CreateTodoMutation($body: String!) {
    createTodo(body: $body) {
      id
      body
      isCompleted
    }
  }
`;
function CreateTodo() {
  const [body, setBody] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [createTodo, { loading, error }] = useMutation(MUTATION_CREATE_TODO,{
    refetchQueries:[QUERY_TODOS]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({
      variables: {
        body: body,
      },
    });
    setBody("")
    handleClose()
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Todo
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="create-todo-form"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="create-todo-form">Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="todo-body">
              <Form.Label>Todo Body</Form.Label>
              <Form.Control value={body} onChange={e=>setBody(e.target.value)} type="text" placeholder="Enter Text" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateTodo;
