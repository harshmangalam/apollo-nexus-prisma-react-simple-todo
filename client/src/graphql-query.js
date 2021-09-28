import { gql } from "@apollo/client";
export const QUERY_TODOS = gql`
  query FetchTodos {
    todos {
      id
      isCompleted
      body
    }
  }
`;
