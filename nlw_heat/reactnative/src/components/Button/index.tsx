import React from 'react';
import { ActivityIndicator, ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import {
  styles
} from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({ 
  title, 
  color, 
  backgroundColor, 
  icon,
  isLoading,
  disabled,
  ...rest }: Props) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        {
          backgroundColor,
          opacity: disabled || isLoading ? 0.7 : 1
        }
      ]}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      {...rest}
    >
      { isLoading ? <ActivityIndicator color={color} /> : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[
            styles.title,
            {
              color
            }
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}