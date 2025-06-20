import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnRouteScreen from '../../screens/orders/onRoute/OnRouteScreen';
import WaitingStackNavigator, { StackParamsWaiting } from './waitingStack/WaitingStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import OrdersFoodStandScreen from '../../screens/orders/foodStands/OrdersFoodStandScreen';
import OnRouteStackNavigation from './onRouteStack/OnRouteStackNavigation';
import { useAuthStore } from '../../store/auth/useAuthStore';
import useSocketOrders from '../../hooks/orders/socketHooks/useSocketOrders';
import { useOrderStore } from '../../store/orders/useOrdersStore';
import CustomModal from '../../components/ui/CustomModal';
import { useUIStore } from '../../store/ui/useUIStore';
import { useModal } from '../../hooks/useModal';
import { useEffect } from 'react';

export type OrderTabsParamList = {
  'En camino': undefined;
  // 'En espera': undefined; // Porque `WaitingStackNavigator` ya tiene su propio stack con params
   'En espera': NavigatorScreenParams<StackParamsWaiting>;
  'Local': undefined;
};
const Tab = createMaterialTopTabNavigator<OrderTabsParamList>();
const OrderStackNavigation = () => {

  const socketError = useUIStore(state => state.socketError);
  const setSocketError = useUIStore(state => state.setSocketError);

  useSocketOrders();

  const {visible, disabled, openModal,closeModal,setDisabled} = useModal();

  useEffect(() => {
    if (!!socketError) {
      openModal(true);
    } else {
      closeModal();
    }
  
  }, [socketError])
  



  return (
    <>
    <Tab.Navigator>
      <Tab.Screen name="Local" component={OrdersFoodStandScreen} />
      <Tab.Screen name="En espera" component={WaitingStackNavigator} />
      <Tab.Screen name="En camino" component={OnRouteStackNavigation} />
      {/* <Tab.Screen name="Profile" component={TemporalScreen} /> */}
    </Tab.Navigator>
      <CustomModal
        // visible = {!!socketError}
        visible = {visible}
        title='Socket error'
        message={socketError}
        onClose={() => {
          setSocketError(undefined)
          closeModal()
        }}
      />
    </>
  )
}
export default OrderStackNavigation