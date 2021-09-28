import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useQuery,gql } from "@apollo/client";
import TodoItem from "./TodoItem";
import {QUERY_TODOS} from "../graphql-query"

function TodoLists() {
  const { loading, error, data } = useQuery(QUERY_TODOS);
  if(loading){
      return <h1>Loading...</h1>
  }

  if(error){
      return <p>{error.message}</p>
  }
  return (
    <Row xs={12} sm={6} md={4} lg={4}>
      {data.todos.map((todo) => (
        <Col key={todo.id}>
          <TodoItem todo={todo} />
        </Col>
      ))}
    </Row>
  );
}


export default TodoLists;
