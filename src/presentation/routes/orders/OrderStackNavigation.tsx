import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnRouteScreen from '../../screens/orders/onRoute/OnRouteScreen';
import WaitingStackNavigator, { StackParamsWaiting } from './waitingStack/WaitingStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import OrdersFoodStandScreen from '../../screens/orders/foodStands/OrdersFoodStandScreen';
import OnRouteStackNavigation from './onRouteStack/OnRouteStackNavigation';
import { useAuthStore } from '../../store/auth/useAuthStore';
import useSocketWaitingOrders from '../../hooks/orders/socketHooks/useSocketWaitingOrders';
import { useOrderStore } from '../../store/orders/useOrdersStore';

export type OrderTabsParamList = {
  'En camino': undefined;
  // 'En espera': undefined; // Porque `WaitingStackNavigator` ya tiene su propio stack con params
   'En espera': NavigatorScreenParams<StackParamsWaiting>;
  'Local': undefined;
};
const Tab = createMaterialTopTabNavigator<OrderTabsParamList>();
const OrderStackNavigation = () => {
  useSocketWaitingOrders();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Local" component={OrdersFoodStandScreen} />
      <Tab.Screen name="En espera" component={WaitingStackNavigator} />
      <Tab.Screen name="En camino" component={OnRouteStackNavigation} />
      {/* <Tab.Screen name="Profile" component={TemporalScreen} /> */}
    </Tab.Navigator>
  )
}
export default OrderStackNavigation