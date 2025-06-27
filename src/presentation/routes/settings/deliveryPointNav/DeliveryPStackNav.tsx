import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import { fadeAnimation } from '../../shared/fade_animation';
import TemporalScreen from '../../../screens/develop/TemporalScreen';
import AllDeliveryPoint from '../../../screens/settings/dpSettings/AllDeliveryPoint.screen';
import DeliveryPointSettingsScreen from '../../../screens/settings/dpSettings/DeliveryPointSettingsScreen';

export type StackParamsDPSettings = {
    AllDeliveryP: undefined;
    DeliveryPointScreen: {deliveryPId: string}
}

const DeliveryPSettingsStack = createStackNavigator<StackParamsDPSettings>();
const DeliveryPStackNav = () => {
  return (
    <DeliveryPSettingsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName='AllDeliveryP'
    >
      <DeliveryPSettingsStack.Screen name='AllDeliveryP' component ={AllDeliveryPoint} />
      <DeliveryPSettingsStack.Screen name='DeliveryPointScreen' component ={DeliveryPointSettingsScreen} />
    </DeliveryPSettingsStack.Navigator>
  )
}
export default DeliveryPStackNav