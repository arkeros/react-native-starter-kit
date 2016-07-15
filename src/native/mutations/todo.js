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

export const changeTodoStatus = `
  mutation ($id: ID!, $completed: Boolean!) {
    changeTodoStatus(input: {id:$id, completed:$completed, clientMutationId:"pepe"}) {
      todo {
        completed,
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
