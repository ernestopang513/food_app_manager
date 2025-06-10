import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnRouteScreen from '../../screens/orders/OnRouteScreen';
import WaitingStackNavigator from './waitingStack/WaitingStackNavigator';
import OrdersProfileScreen from '../../screens/orders/profile/OrdersProfileScreen';

const Tab = createMaterialTopTabNavigator();

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