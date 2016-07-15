const removeTodo = `
  mutation ($id: ID!) {
    removeTodo(input: {id:$id, clientMutationId:"pepe"}) {
      deletedTodoId
    }
  }
`;

export default removeTodo;
