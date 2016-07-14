/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';
import Root from './src/native/Root';

console.ignoredYellowBox = [
    // FIXME: https://github.com/facebook/react-native/issues/1501
    'Warning: ScrollView doesn\'t take rejection well - scrolls anyway',
];

AppRegistry.registerComponent('ReactNativeStarterKit', () => Root);
