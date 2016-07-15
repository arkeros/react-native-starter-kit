export const addTodo = `
  mutation ($text: String!) {
    addTodo(input: {text:$text, clientMutationId:"pepe"}) {
      todoEdge {
        node {
          id
        }
      }
    }
  }
`;

export const removeTodo = `
  mutation ($id: ID!) {
    removeTodo(input: {id:$id, clientMutationId:"pepe"}) {
      deletedTodoId
    }
  }
`;

export const renameTodo = `
  mutation ($id: ID!, $text: String!) {
    renameTodo(input: {id:$id, text:$text, clientMutationId:"pepe"}) {
      todo {
        text,
      }
    }
  }
`;
