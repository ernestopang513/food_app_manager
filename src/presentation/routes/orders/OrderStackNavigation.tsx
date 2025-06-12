import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnRouteScreen from '../../screens/orders/onRoute/OnRouteScreen';
import WaitingStackNavigator, { StackParamsWaiting } from './waitingStack/WaitingStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import OrdersFoodStandScreen from '../../screens/orders/foodStands/OrdersFoodStandScreen';
import OnRouteStackNavigation from './onRouteStack/OnRouteStackNavigation';

export type OrderTabsParamList = {
  'En camino': undefined;
  // 'En espera': undefined; // Porque `WaitingStackNavigator` ya tiene su propio stack con params
   'En espera': NavigatorScreenParams<StackParamsWaiting>;
  'Local': undefined;
};
const Tab = createMaterialTopTabNavigator<OrderTabsParamList>();
const OrderStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="En camino" component={OnRouteStackNavigation} />
      {/* <Tab.Screen name="Profile" component={TemporalScreen} /> */}
      <Tab.Screen name="En espera" component={WaitingStackNavigator} />
      <Tab.Screen name="Local" component={OrdersFoodStandScreen} />
    </Tab.Navigator>
  )
}
export default OrderStackNavigation