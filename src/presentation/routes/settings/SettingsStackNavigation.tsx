import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { fadeAnimation } from '../shared/fade_animation';
import FdSettingsStackNav from './foodStandNav/FdSettingsStackNav';
import DishSettingsStackNav from './dishNav/DishSettingsStackNav';
import DeliveryPStackNav from './deliveryPointNav/DeliveryPStackNav';
import FdDishSettisgStackNav from './foodStandDishNav/fdDishSettisgStackNav';
import CreateAdminScreen from '../../screens/settings/adminSettings/CreateAdminScreen';
import AllAdminScreen from '../../screens/settings/adminSettings/AllAdminScreen';
import AllEmployeeScreen from '../../screens/settings/adminSettings/AllEmployeeScreen';
import CreateEmployeeScreen from '../../screens/settings/adminSettings/CreateEmployeeScreen';


export type StackParamsSettings = {
  FoodStandScreen: undefined
  DishScreen: undefined
  FoodStandDishes: undefined
  DeliveryPoint: undefined
  SettingsScreen: undefined;
  CreateAdminScreen: undefined;
  AllEmployeeScreen: undefined;
  AllAdminScreen: undefined;
  CreateEmployeeScreen: undefined;
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
      <SettingsStack.Screen name='CreateAdminScreen' component={CreateAdminScreen} />
      <SettingsStack.Screen name='CreateEmployeeScreen' component={CreateEmployeeScreen} />
      <SettingsStack.Screen name='AllEmployeeScreen' component={AllEmployeeScreen} />
      <SettingsStack.Screen name='AllAdminScreen' component={AllAdminScreen} />
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