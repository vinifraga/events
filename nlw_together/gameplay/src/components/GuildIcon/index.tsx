import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://logodownload.org/wp-content/uploads/2014/09/CS-GO-logo.png'
  
  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}