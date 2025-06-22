import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import FoodStandScreen from '../../screens/inventory/FoodStandScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { fadeAnimation } from '../shared/fade_animation';
import FoodStandSettinsScreen from '../../screens/inventory/FoodStandSettingsScreen';
import TemporalScreen from '../../screens/develop/TemporalScreen';


export type StackParamsSettings = {
  FoodStandScreen: undefined
  DishScreen: undefined
  FoodStandDishes: undefined
  DeliveryPoint: undefined
  SettingsScreen: undefined
}

const SettingsStack = createStackNavigator<StackParamsSettings>();

const SettingsStackNavigation = () => {
  return (
    <SettingsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName='SettingsScreen'
    >
        <SettingsStack.Screen name = 'FoodStandScreen' component={TemporalScreen} />
        <SettingsStack.Screen name = 'DishScreen' component={TemporalScreen} />
        <SettingsStack.Screen name = 'FoodStandDishes' component={TemporalScreen} />
        <SettingsStack.Screen name = 'DeliveryPoint' component={TemporalScreen} />
        <SettingsStack.Screen name = 'SettingsScreen' component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}
export default SettingsStackNavigation