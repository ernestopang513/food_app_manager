import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnRouteScreen from '../../screens/orders/OnRouteScreen';
import WaitingStackNavigator, { StackParamsWaiting } from './waitingStack/WaitingStackNavigator';
import OrdersProfileScreen from '../../screens/orders/profile/OrdersProfileScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

export type OrderTabsParamList = {
  'En camino': undefined;
  // 'En espera': undefined; // Porque `WaitingStackNavigator` ya tiene su propio stack con params
   'En espera': NavigatorScreenParams<StackParamsWaiting>;
  'Entregas': undefined;
};
const Tab = createMaterialTopTabNavigator<OrderTabsParamList>();
const OrderStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="En camino" component={OnRouteScreen} />
      {/* <Tab.Screen name="Profile" component={TemporalScreen} /> */}
      <Tab.Screen name="En espera" component={WaitingStackNavigator} />
      <Tab.Screen name="Entregas" component={OrdersProfileScreen} />
    </Tab.Navigator>
  )
}
export default OrderStackNavigation