import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { io } from 'socket.io-client';
import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import {
  styles
} from './styles';

const messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
})

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);
  
  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      { currentMessages.map(message => <Message data={message} key={message.id} />) }
    </ScrollView>
  );
}