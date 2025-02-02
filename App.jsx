import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const App = () => {
  // Initialize permission states with proper mapping
  const [permissionStates, setPermissionStates] = useState({
    readPhoneState: RESULTS.DENIED,
    readCallLog: RESULTS.DENIED,
    answerPhoneCalls: RESULTS.DENIED,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Define permissions with proper PERMISSIONS mapping
  const permissionConfigs = [
    {
      key: 'readPhoneState',
      permission: PERMISSIONS.ANDROID.READ_PHONE_STATE,
      title: 'Phone State',
      description: 'Required to detect incoming calls'
    },
    {
      key: 'readCallLog',
      permission: PERMISSIONS.ANDROID.READ_CALL_LOG,
      title: 'Call Log',
      description: 'Access call history for tracking'
    },
    {
      key: 'readContacts',
      permission: PERMISSIONS.ANDROID.READ_CONTACTS,
      title: 'Read Contacts',
      description: 'Required to access and display contacts'
    },    
    {
      key: 'answerPhoneCalls',
      permission: PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS,
      title: 'Answer Calls',
      description: 'Manage phone calls automatically'
    }
  ];

  useEffect(() => {
    checkAllPermissions();
  }, []);

  const checkAllPermissions = async () => {
    try {
      const newStates = { ...permissionStates };
      
      for (const config of permissionConfigs) {
        try {
          const result = await check(config.permission);
          newStates[config.key] = result;
        } catch (error) {
          console.warn(`Error checking ${config.key}:`, error);
          newStates[config.key] = RESULTS.DENIED;
        }
      }
      
      setPermissionStates(newStates);
    } catch (error) {
      console.error('Permission check failed:', error);
    }
  };

  const requestPermission = async (config) => {
    setIsLoading(true);
    try {
      const result = await request(config.permission);
      setPermissionStates(prev => ({
        ...prev,
        [config.key]: result
      }));
    } catch (error) {
      console.warn(`Error requesting ${config.key}:`, error);
      setPermissionStates(prev => ({
        ...prev,
        [config.key]: RESULTS.DENIED
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case RESULTS.GRANTED:
        return styles.statusBadgeGranted;
      case RESULTS.DENIED:
        return styles.statusBadgeDenied;
      default:
        return styles.statusBadgePending;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case RESULTS.GRANTED:
        return 'GRANTED';
      case RESULTS.DENIED:
        return 'DENIED';
      case RESULTS.BLOCKED:
        return 'BLOCKED';
      default:
        return 'PENDING';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Tracker Permissions</Text>
        <Text style={styles.subtitle}>Manage app permissions</Text>
      </View>

      <View style={styles.permissionsContainer}>
        {permissionConfigs.map((config) => (
          <View key={config.key} style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={styles.permissionTitleContainer}>
                <Text style={styles.permissionTitle}>{config.title}</Text>
                <View style={[
                  styles.statusBadge,
                  getStatusBadgeStyle(permissionStates[config.key])
                ]}>
                  <Text style={styles.statusText}>
                    {getStatusText(permissionStates[config.key])}
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.permissionDescription}>
              {config.description}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.permissionButton,
                permissionStates[config.key] === RESULTS.GRANTED && styles.permissionButtonGranted
              ]}
              onPress={() => requestPermission(config)}
              disabled={isLoading || permissionStates[config.key] === RESULTS.GRANTED}
            >
              <Text style={[
                styles.buttonText,
                permissionStates[config.key] === RESULTS.GRANTED && styles.buttonTextGranted
              ]}>
                {permissionStates[config.key] === RESULTS.GRANTED 
                  ? 'Granted' 
                  : 'Grant Permission'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Separate card for overlay permission */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <View style={styles.permissionTitleContainer}>
              <Text style={styles.permissionTitle}>Overlay Permission</Text>
              <Text style={styles.overlayNote}>
                This permission needs to be granted from System Settings
              </Text>
            </View>
          </View>
          
          <Text style={styles.permissionDescription}>
            Display information over other apps
          </Text>
          
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={() => Linking.openSettings()}
          >
            <Text style={styles.buttonText}>
              Open Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  permissionsContainer: {
    padding: 16,
  },
  permissionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionTitleContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  overlayNote: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeGranted: {
    backgroundColor: '#dcfce7',
  },
  statusBadgeDenied: {
    backgroundColor: '#fee2e2',
  },
  statusBadgePending: {
    backgroundColor: '#f1f5f9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  permissionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  permissionButtonGranted: {
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  buttonTextGranted: {
    color: '#64748b',
  },
});

export default App;