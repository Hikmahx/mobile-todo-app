import { gql } from "@apollo/client";

const ADD_TODO = gql`
  mutation addTodo($todo: String!, $completed: Boolean!, $tags: [String]!) {
    addTodo(todo: $todo, completed: $completed, tags: $tags) {
      id
      todo
      completed
      tags
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      todo
      completed
      tags
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $todo: String, $completed: Boolean, $tags: [String]) {
    updateTodo(id: $id, todo: $todo, completed: $completed, tags: $tags) {
      id
      todo
      completed
      tags
    }
  }
`;

export { ADD_TODO, DELETE_TODO, UPDATE_TODO };






