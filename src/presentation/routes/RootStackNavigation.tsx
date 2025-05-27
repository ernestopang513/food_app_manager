import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import AuthStackNavigation from './auth/AuthStackNavigation';
import BottomTabNavigator from './BottomTabNavigator';
import { fadeAnimation } from './shared/fade_animation';
import { LoadingScreen } from '../screens/loading/LoadingScreen';


export type RootStackParams = {
    Auth: undefined; 
    MainApp: undefined;
    LoadingScreen: undefined;
}

const RootStack = createStackNavigator();


const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName='LoadingScreen'
        screenOptions={{
            headerShown: false
        }}
    >
        <RootStack.Screen name='Auth' component = {AuthStackNavigation} />
        <RootStack.Screen name='MainApp' component = {BottomTabNavigator} />
        <RootStack.Screen 
                    options={{cardStyleInterpolator: fadeAnimation}}
                    name = 'LoadingScreen' 
                    component={LoadingScreen} 
                />
    </RootStack.Navigator>
  )
}
export default RootStackNavigation