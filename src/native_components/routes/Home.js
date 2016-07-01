import Relay, {
  Route,
} from 'react-relay';

export default class Home extends Route {
  static paramDefinitions = {
    status: { required: false },
  };
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'Home';
}
