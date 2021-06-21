import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { GuildProps } from '../Appointment';
import { GuildIcon } from '../GuildIcon';
import { Feather } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  data: GuildProps
}

export function Guild({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <GuildIcon />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            { data.name }
          </Text>

          <Text style={styles.type}>
            { data.owner ? 'Administrador' : 'Convidado' }
          </Text>
        </View>
      </View>

      <Feather 
        name="chevron-right"
        size={24}
        color={theme.colors.heading}
      />
    </TouchableOpacity>
  );
}