import React, { useState, useEffect } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Alert, FlatList, ImageBackground, Share, Text, View, Platform } from 'react-native';
import * as Linking from 'expo-linking';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { api } from '../../services/api';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';
import { AppointmentProps } from '../../components/Appointment';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Params = {
  appointmentSelectedId: string;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {
  const [appointment, setAppointment] = useState<AppointmentProps>({} as AppointmentProps);
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const routes = useRoute();
  const { appointmentSelectedId } = routes.params as Params;

  async function loadAppointmentData() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS) as string;

    const parsedResponse = JSON.parse(response) as AppointmentProps[];

    const appointmentFound = parsedResponse.find(item => item.id === appointmentSelectedId) as AppointmentProps;

    setAppointment(appointmentFound);
    
    await fetchGuildWidget(appointmentFound.guild.id);
  }

  async function fetchGuildWidget(guildId: string) {
    try {
      const response = await api.get(`/guilds/${guildId}/widget.json`);
      setWidget(response.data);
      console.log(response.data);
    } catch (error) {
      Alert.alert(
      'Erro ao buscar dados do Widget do servidor',
      'Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
    ? `Junte-se a ${appointment.guild.name}`
    : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    loadAppointmentData()
  }, [])
  
  return (
    <Background>
      {
        loading ? <Load /> : (
          <>
            <Header 
              title="Detalhes"
              action={appointment.guild.owner && (
                <BorderlessButton onPress={handleShareInvitation}>
                  <Fontisto 
                    name="share"
                    size={24}
                    color={theme.colors.primary}
                  />
                </BorderlessButton>
              )}
            />

            <ImageBackground
              source={BannerImg}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <Text style={styles.title}>
                  { appointment.guild.name }
                </Text>

                <Text style={styles.subtitle}>
                  { appointment.description }
                </Text>
              </View>
            </ImageBackground>

            <ListHeader 
              title="Jogadores"
              subtitle={`Total ${widget.presence_count ?? 0}`}
            />

            <FlatList 
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />

            {
              appointment.guild.owner && (
                <View style={styles.footer}>
                  <ButtonIcon 
                    title="Entrar na partida" 
                    onPress={handleOpenGuild}
                  />
                </View>
              )
            }
          </>
        )
      }
    </Background>
  );
}