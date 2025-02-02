import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, NativeModules } from 'react-native';

const { width } = Dimensions.get('window');

const CallOverlay = ({ phoneNumber = 'Unknown', callType = 'Unknown' }) => {
  useEffect(() => {
    console.log('CallOverlay mounted with props:', { phoneNumber, callType });
  }, [phoneNumber, callType]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.callType}>{callType} Call</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => NativeModules.CallModule.closeOverlay()} // Use native module
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  callType: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CallOverlay;