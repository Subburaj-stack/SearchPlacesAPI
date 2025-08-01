import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PlaceListScreen from './screens/PlaceListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{ headerBackVisible: false }}
/>
        <Stack.Screen name="History" component={PlaceListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
