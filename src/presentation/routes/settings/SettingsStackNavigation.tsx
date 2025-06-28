import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity } from 'react-native';
import FoodStandScreen from '../../screens/inventory/FoodStandScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { fadeAnimation } from '../shared/fade_animation';
import FoodStandSettinsScreen from '../../screens/inventory/FoodStandSettingsScreen';
import TemporalScreen from '../../screens/develop/TemporalScreen';
import FdSettingsStackNav from './foodStandNav/FdSettingsStackNav';
import Icon from '@react-native-vector-icons/ionicons';
import { Text } from '@ui-kitten/components';
import DishSettingsStackNav from './dishNav/DishSettingsStackNav';
import DeliveryPStackNav from './deliveryPointNav/DeliveryPStackNav';
import Prueba from '../../screens/settings/fdDish/prueba';
import FdDishSettisgStackNav from './foodStandDishNav/fdDishSettisgStackNav';


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
      <SettingsStack.Screen name='FoodStandScreen' component={FdSettingsStackNav} />
      <SettingsStack.Screen name='DishScreen' component={DishSettingsStackNav} />
      <SettingsStack.Screen name='FoodStandDishes' component={FdDishSettisgStackNav} />
      <SettingsStack.Screen name='DeliveryPoint' component={DeliveryPStackNav} />
      <SettingsStack.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        // options={{
        //   headerRight: () => (
        //     <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { }}>
        //       <Icon name="log-out" size={25} color="red" />
        //       <Text category='label' >LogOut</Text>
        //     </TouchableOpacity>
        //   )
        // }}
      />
    </SettingsStack.Navigator>
  )
}
export default SettingsStackNavigation