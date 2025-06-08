import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TemporalScreen from '../../screens/develop/TemporalScreen';
import OnRouteScreen from '../../screens/orders/OnRouteScreen';
import OnWaitingScreen from '../../screens/orders/OnWaitingScreen';
import WaitingStackNavigator from './waitingStack/WaitingStackNavigator';

const Tab = createMaterialTopTabNavigator();

const OrderStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="En camino" component={OnRouteScreen} />
      {/* <Tab.Screen name="Profile" component={TemporalScreen} /> */}
      <Tab.Screen name="En espera" component={WaitingStackNavigator} />
      <Tab.Screen name="Entregas" component={TemporalScreen} />
    </Tab.Navigator>
  )
}
export default OrderStackNavigation