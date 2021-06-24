import React, { ReactNode } from 'react';
import { Modal, ModalProps, TouchableWithoutFeedback, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Background } from '../Background';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/useAuth';

type Props = ModalProps & {
  closeModal: () => void;
}

export function ModalSignOut({ closeModal, ...rest }: Props) {
  const { secondary100, secondary80 } = theme.colors;
  const { signOut } = useAuth();

  return (
    <Modal 
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LinearGradient
            style={{ flex: 1}}
            colors={[ secondary100, secondary80 ]}
          >
            <View style={styles.content}>
              <Text style={styles.title}>
                Deseja sair do Game<Text style={styles.titleRed}>Play</Text>?
              </Text>

              <View style={styles.options}>
                <View style={styles.optionNoContainer}>
                  <TouchableWithoutFeedback onPress={closeModal}>
                    <RectButton style={styles.optionNo}>
                      <Text style={styles.optionText}>Não</Text>
                    </RectButton>
                  </TouchableWithoutFeedback>
                </View>

                <View style={styles.optionYesContainer}>
                  <TouchableWithoutFeedback onPress={signOut}>
                    <RectButton style={styles.optionYes}>
                      <Text style={styles.optionText}>Sim</Text>
                    </RectButton>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}