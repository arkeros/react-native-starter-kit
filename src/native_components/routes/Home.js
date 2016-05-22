import Relay, {
  Route,
} from 'react-relay';

export default class Home extends Route {
  static paramDefinitions = {
    status: { required: false },
  };
  static queries = {
    me: () => Relay.QL`query { me }`,
  };
  static routeName = 'Home';
}
