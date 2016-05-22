/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';
import App from './src/native_components/App';

console.ignoredYellowBox = [
    // FIXME: https://github.com/facebook/react-native/issues/1501
    'Warning: ScrollView doesn\'t take rejection well - scrolls anyway',
];

AppRegistry.registerComponent('ReactNativeStarterKit', () => App);
