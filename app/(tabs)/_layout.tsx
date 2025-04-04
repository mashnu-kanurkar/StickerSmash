import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CleverTap from 'clevertap-react-native';


export default function TabLayout() {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    CleverTap.setDebugLevel(3);
    CleverTap.initializeInbox();
    const fetchUnreadCount = () => {
      CleverTap.getInboxMessageUnreadCount((err, res) => {
        if (err) {
          console.error('Error fetching unread count:', err);
        } else if (typeof res === 'number') {
          setUnreadCount(res);
        } else {
          console.warn('Unexpected unread count response:', res);
        }
      });
    };

    fetchUnreadCount();

    // Optionally, set an interval to fetch the count periodically
    const interval = setInterval(fetchUnreadCount, 30000); // Fetch every 30s

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIconWithBadge
              iconName={focused ? 'mail' : 'mail-outline'}
              color={color}
              size={24}
              badgeCount={unreadCount}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}

// Custom component to display a badge on the Inbox icon
import { View, Text, StyleSheet } from 'react-native';

const TabBarIconWithBadge = ({ iconName, color, size, badgeCount }: any) => {
  return (
    <View>
      <Ionicons name={iconName} color={color} size={size} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
