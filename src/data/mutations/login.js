import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { User } from '../models';
import me from '../queries/me';

const login = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  outputFields: {
    sessionToken: {
      type: new NonNull(StringType) ,
      resolve: ({ sessionToken }) => sessionToken,
    },
    me,
  },
  async mutateAndGetPayload({ email, password}, { request }) {
    const sessionToken = "jajaja";
    console.log(JSON.stringify(request.user));
    return { sessionToken };
  },
});

export default login;
