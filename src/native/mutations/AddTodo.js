const addTodo = `
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

export default addTodo;
