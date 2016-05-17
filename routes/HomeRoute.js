import Relay, {
    Route,
} from 'react-relay';

export default class HomeRoute extends Route {
    static paramDefinitions = {
        status: {required: false},
    };
    static queries = {
        me: () => Relay.QL`query { me }`,
    };
    static routeName = 'HomeRoute';
}