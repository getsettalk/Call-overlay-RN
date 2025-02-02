/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CallOverlay from './src/components/CallOverlay';

// Register the overlay first
AppRegistry.registerComponent('YourReactNativeComponentName', () => CallOverlay);

AppRegistry.registerComponent(appName, () => App);
