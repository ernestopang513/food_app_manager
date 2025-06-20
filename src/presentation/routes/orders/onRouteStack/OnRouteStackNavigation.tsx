import { createStackNavigator } from '@react-navigation/stack'
import { fadeAnimation } from '../../shared/fade_animation';
import OnRouteScreen from '../../../screens/orders/onRoute/OnRouteScreen';
import DeliveryPointOnRouteScreen from '../../../screens/orders/onRoute/DeliveryPointScreen.onRoute';

export type StackParamsOnRoute = {
    OnRouteScreen: undefined;
    DeliveryScreen: {deliveryPointId: string, dpName: string};
}

const OnRouteStack = createStackNavigator<StackParamsOnRoute>();

const OnRouteStackNavigation = () => {
  return (
    <OnRouteStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName='OnRouteScreen'
    >

        <OnRouteStack.Screen
            name='OnRouteScreen'
            component={OnRouteScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />
        <OnRouteStack.Screen
            name='DeliveryScreen'
            component={DeliveryPointOnRouteScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />
    </OnRouteStack.Navigator>
  )
}
export default OnRouteStackNavigation