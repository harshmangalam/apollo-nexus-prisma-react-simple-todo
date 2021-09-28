import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { gql, useMutation } from "@apollo/client";
import { QUERY_TODOS } from "../graphql-query";

const MUTATION_UPDATE_TODO = gql`
  mutation UpdateTodoMutation(
    $isCompleted: Boolean!
    $body: String!
    $id: ID!
  ) {
    updateTodo(isCompleted: $isCompleted, body: $body, id: $id) {
      id
      body
      isCompleted
    }
  }
`;
function TodoItem({ todo }) {
  const [updateTodo, { loading, error }] = useMutation(MUTATION_UPDATE_TODO, {
    refetchQueries: [QUERY_TODOS],
  });

  const handleUpdate = () => {
    updateTodo({
      variables: {
        ...todo,
        isCompleted: !todo.isCompleted,
      },
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Card>
      <Card.Body>
        <Card.Text
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
          {todo.body}
        </Card.Text>
        <Button
          variant={todo.isCompleted ? "danger" : "secondary"}
          onClick={handleUpdate}
        >
          {loading ? "Updating..." : "Completed"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TodoItem;
