import { gql } from "@apollo/client";

const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      todo
      completed
      tags
    }
  }
`;


export { GET_TODOS };
