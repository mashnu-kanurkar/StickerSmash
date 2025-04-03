import { Text, View, StyleSheet } from 'react-native';
import CleverTap from 'clevertap-react-native'; 
import { useEffect, useState } from 'react';



export default function InboxScreen() {
  const [inboxMessageList, setinboxMessageList] = useState([]);

  CleverTap.initializeInbox()
    useEffect(() => {
      const fetchAllInboxMsgs = () => {
        CleverTap.getAllInboxMessages((err, res)=>{
          if (err) {
            console.error('Error fetching inbox message:', err);
          } else{
            console.debug('Fetching inbox message:', err);

          }
        })
      };
    
      fetchAllInboxMsgs();
  
      // Optionally, set an interval to fetch the count periodically
      const interval = setInterval(fetchAllInboxMsgs, 30000); // Fetch every 30s
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inbox screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
