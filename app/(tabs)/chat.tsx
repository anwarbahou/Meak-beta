import React from 'react';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useAuth } from '@/store/auth';
import { supabase } from '@/lib/supabase';
import { MessageCircle } from 'lucide-react-native';
import { Database } from '@/types/database';

type TaskWithTasker = {
  id: string;
  title: string;
  tasker: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
};

type ChatPreview = {
  id: string;
  task_id: string;
  task_title: string;
  provider_id: string;
  provider_name: string;
  provider_avatar: string | null;
  last_message: string;
  last_message_time: string;
  unread_count: number;
};

export default function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = React.useState<ChatPreview[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  const fetchChats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          tasker:tasker_id (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('client_id', user.id)
        .not('tasker_id', 'is', null)
        .order('created_at', { ascending: false }) as { 
          data: TaskWithTasker[] | null; 
          error: any; 
        };

      if (error) throw error;

      const chatPreviews = (data || []).map(task => ({
        id: task.id,
        task_id: task.id,
        task_title: task.title,
        provider_id: task.tasker.id,
        provider_name: `${task.tasker.first_name || ''} ${task.tasker.last_name || ''}`.trim() || 'Service Provider',
        provider_avatar: task.tasker.avatar_url,
        last_message: 'No messages yet',
        last_message_time: new Date().toISOString(),
        unread_count: 0
      }));

      setChats(chatPreviews);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChat = ({ item }: { item: ChatPreview }) => (
    <Pressable style={styles.chatCard}>
      <Image 
        source={{ 
          uri: item.provider_avatar || 
          `https://ui-avatars.com/api/?name=${encodeURIComponent(item.provider_name)}` 
        }}
        style={styles.avatar}
      />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.providerName}>{item.provider_name}</Text>
          <Text style={styles.time}>
            {new Date(item.last_message_time).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.taskTitle}>{item.task_title}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.last_message}
        </Text>
      </View>
      {item.unread_count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.unread_count}</Text>
        </View>
      )}
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Messages</Text>
      {chats.length === 0 ? (
        <View style={styles.emptyState}>
          <MessageCircle size={48} color="#666" />
          <Text style={styles.emptyText}>No conversations yet</Text>
          <Text style={styles.emptySubtext}>
            Book a service to start chatting with providers
          </Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChat}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  list: {
    padding: 16,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  taskTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#444',
  },
  badge: {
    backgroundColor: '#000',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});