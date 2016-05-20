import Login from './Login';
import HomeRoute from '../routes/HomeRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('http://192.168.1.128:3001/graphql')
);

export default class App extends Component {
  render():void {
    return (
      <RootContainer
        Component={Login}
        route={new HomeRoute({ status: 'any' })}
      />
    );
  }
}
