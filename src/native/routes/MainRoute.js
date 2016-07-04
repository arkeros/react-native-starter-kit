import Relay, {
  Route,
} from 'react-relay';

export default class MainRoute extends Route {
  static paramDefinitions = {
    group: { required: true },
  };
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'MainRoute';
}
