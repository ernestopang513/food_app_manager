import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import AuthStackNavigation from './auth/AuthStackNavigation';
import BottomTabNavigator from './BottomTabNavigator';


export type RootStackParams = {
    Auth: undefined; 
    MainApp: undefined;
}

const RootStack = createStackNavigator();


const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <RootStack.Screen name='Auth' component = {AuthStackNavigation} />
        <RootStack.Screen name='MainApp' component = {BottomTabNavigator} />
    </RootStack.Navigator>
  )
}
export default RootStackNavigation