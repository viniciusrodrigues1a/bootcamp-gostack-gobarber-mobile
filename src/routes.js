import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function NewAppointmentsStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={({ navigation }) => ({
          title: 'Selecione o prestador',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { marginLeft: 20 },
        })}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) => ({
          title: 'Selecione o horário',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { marginLeft: 20 },
        })}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirme o agendamento',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default function Routes({ signedIn }) {
  return (
    <NavigationContainer>
      {!signedIn ? (
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SignIn"
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <>
          <Tab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
              labelPosition: 'below-icon',
            }}
          >
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                tabBarLabel: 'Agendamentos',
                tabBarIcon: ({ color }) => (
                  <Icon name="event" size={20} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="New"
              component={NewAppointmentsStackRoutes}
              options={{
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: () => (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
                unmountOnBlur: true,
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: 'Meu perfil',
                tabBarIcon: ({ color }) => (
                  <Icon name="person" size={20} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
