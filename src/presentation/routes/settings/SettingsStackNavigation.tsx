import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import FoodStandScreen from '../../screens/inventory/FoodStandScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { fadeAnimation } from '../shared/fade_animation';
import FoodStandSettinsScreen from '../../screens/inventory/FoodStandSettingsScreen';




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
        <SettingsStack.Screen name = 'FoodStandScreen' component={FoodStandSettinsScreen} />
        <SettingsStack.Screen name = 'DishScreen' component={FoodStandSettinsScreen} />
        <SettingsStack.Screen name = 'FoodStandDishes' component={FoodStandSettinsScreen} />
        <SettingsStack.Screen name = 'DeliveryPoint' component={FoodStandSettinsScreen} />
        <SettingsStack.Screen name = 'SettingsScreen' component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}
export default SettingsStackNavigation