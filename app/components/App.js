import Home from './Home';
import HomeRoute from '../routes/HomeRoute';
import React, {Component} from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('http://10.111.69.248:3001/graphql')
);

export default class App extends Component {
  render():void {
    return (
      <RootContainer
        Component={Home}
        route={new HomeRoute({ status: 'any' })}
      />
    );
  }
}
