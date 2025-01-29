/* import React, { useState, useEffect } from 'react';
import { View, Button, PermissionsAndroid, NativeModules, DeviceEventEmitter } from 'react-native';
import CallPopup from './src/components/CallPopup';

const { CallDetectorModule } = NativeModules;

export default function App() {
  const [callVisible, setCallVisible] = useState(false);
  const [callNumber, setCallNumber] = useState('');

  useEffect(() => {
    // Set up event listeners
    const incomingSub = DeviceEventEmitter.addListener('IncomingCall', (event) => {
      setCallNumber(event.number);
      setCallVisible(true);
    });

    const outgoingSub = DeviceEventEmitter.addListener('OutgoingCall', (event) => {
      setCallNumber(event.number);
      setCallVisible(true);
    });

    return () => {
      incomingSub.remove();
      outgoingSub.remove();
    };
  }, []);

  const requestPermissions = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.ANSWER_PHONE_CALLS,
      ]);
      
      await CallDetectorModule.requestPermissions();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Enable Call Detection"
        onPress={requestPermissions}
      />

      <CallPopup
        visible={callVisible}
        number={callNumber}
        onAccept={() => setCallVisible(false)}
        onReject={() => setCallVisible(false)}
      />
    </View>
  );
} */


import React, { useEffect } from 'react';
import { PermissionsAndroid, NativeModules, View, Text } from 'react-native';

const App = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      ]);
    } catch (err) {
      console.warn(err);
    }
  };


  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App