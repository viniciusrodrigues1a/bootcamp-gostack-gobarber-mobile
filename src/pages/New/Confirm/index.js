import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ route, navigation }) {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: ptBR }),
    [time]
  );

  async function handleCreateAppointment() {
    await api.post('/appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/120/${provider.name}`,
          }}
        />

        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleCreateAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
