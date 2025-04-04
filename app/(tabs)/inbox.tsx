import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CleverTap from 'clevertap-react-native';
import { useEffect, useState } from 'react';
// Uncomment if using vector icons
// import Icon from 'react-native-vector-icons/Ionicons';

type InboxMessage = {
  id: string;
  isRead: boolean;
  msg: {
    content: {
      title: { text: string };
      message: { text: string };
    }[];
  };
};

export default function InboxScreen() {
  const [inboxMessageList, setInboxMessageList] = useState<InboxMessage[]>([]);

  useEffect(() => {
    CleverTap.initializeInbox();

    CleverTap.getAllInboxMessages((err, res) => {
      if (err) {
        console.error('Error fetching inbox messages:', err);
      } else {
        // Ensure it's an array and set state
        if (Array.isArray(res)) {
          setInboxMessageList(res as InboxMessage[]);
        } else {
          console.error('Inbox response is not an array:', res);
        }
      }
    });
  }, []);

  const handlePress = (messageId: string) => {
    CleverTap.markReadInboxMessageForId(messageId);
    setInboxMessageList((prevList) =>
      prevList.map((msg) =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const renderItem = ({ item }: { item: InboxMessage }) => {
    const content = item?.msg?.content?.[0] || {};
    const titleText = content?.title?.text || 'No Title';
    const messageText = content?.message?.text || 'No Message';
    const isRead = item?.isRead;

    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View style={[styles.messageCard, isRead ? styles.read : styles.unread]}>
          <View style={styles.row}>
            <Text style={[styles.messageTitle, !isRead && styles.unreadTitle]}>
              {titleText}
            </Text>
            {isRead ? (
              // Uncomment below if using vector icons:
              // <Icon name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.checkmark}>✅</Text>
            ) : null}
          </View>
          <Text style={styles.messageBody}>{messageText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {inboxMessageList.length === 0 ? (
        <Text style={styles.text}>No messages</Text>
      ) : (
        <FlatList
          data={inboxMessageList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  messageTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageBody: {
    color: '#ccc',
    marginTop: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
    color: '#fff',
  },
  unread: {
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 4,
  },
  read: {
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: '#4CAF50',
  },
});
