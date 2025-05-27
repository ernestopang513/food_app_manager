import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import FoodStandScreen from '../../screens/inventory/FoodStandScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { fadeAnimation } from '../shared/fade_animation';




const SettingsStack = createStackNavigator();

const SettingsStackNavigation = () => {
  return (
    <SettingsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName='SettingsScreen'
    >
        <SettingsStack.Screen name = 'FoodStandScreen' component={FoodStandScreen} />
        <SettingsStack.Screen name = 'DishScreen' component={FoodStandScreen} />
        <SettingsStack.Screen name = 'FoodStandDishes' component={FoodStandScreen} />
        <SettingsStack.Screen name = 'DeliveryPoint' component={FoodStandScreen} />
        <SettingsStack.Screen name = 'SettingsScreen' component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}
export default SettingsStackNavigation