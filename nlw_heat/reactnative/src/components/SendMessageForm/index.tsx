import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../themes';
import { Button } from '../Button';

import {
  styles
} from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    try {
      setSendingMessage(true);
      const messageFormatted = message.trim();

      await api.post('/messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      Alert.alert('Mensagem enviada com sucesso'); 
    } catch (error) {
      console.log('error envio mensagem', error)
    } finally {
      setSendingMessage(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button 
        title="Enviar mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        disabled={!message.trim()}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}