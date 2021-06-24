import React from 'react';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/useAuth';

import { Avatar } from '../Avatar';
import { ModalSignOut } from '../ModalSignOut';

import { styles } from './styles';

export function Profile() {
  const { user, signOut } = useAuth();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  function handleCloseSignOutModal() {
    setIsSignOutModalOpen(false);
  }

  function handleSignOut() {
    setIsSignOutModalOpen(true);
  }

  return (
    <View style={styles.container}>

      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>
            Olá,
          </Text>

          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>

        <Text style={styles.message}>
          Hoje é dia de vitória
        </Text>
      </View>


      <ModalSignOut 
        visible={isSignOutModalOpen}
        closeModal={handleCloseSignOutModal}
      />
    </View>
  );
}