import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
  hasCheckBox?: boolean;
}

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = false,
  ...rest

}: Props) {
  const { secondary40, secondary50, secondary70 } = theme.colors;

  return (
    <RectButton {...rest}>
      <LinearGradient
        style={styles.container}
        colors={[ secondary50, secondary70 ]}
      >
        <LinearGradient 
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[ checked ? '#171F52' : secondary40, secondary40 ]}
        >
          { hasCheckBox ? (
            <View style={checked ? styles.checked : styles.check} />
          ) : (
            <View style={{ height: 12 }} />
          ) }
          
          <Icon
            width={48}
            height={48}
            style={{
              marginTop: 3,
              marginBottom: 16
            }}
          />

          <Text style={styles.title}>
            { title }
          </Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}