import React from 'react';
import { View, ViewProps } from 'react-native';

import { styles } from './styles';

type Props = {
  isCentered?: boolean;
}

export function ListDivider({ isCentered }: Props) {
  return (
    <View style={[
      styles.container, 
      isCentered ? {
        marginVertical: 12
      } : {
        marginTop: 2,
        marginBottom: 31,
      }
    ]} />
  );
}