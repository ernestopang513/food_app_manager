import { createStackNavigator } from "@react-navigation/stack";


export type StackParamsWaiting = {
    OnWaitingScreen: undefined;
    DeliveryPointScreen: {deliveryPointId: string}

}


const WaitingStack = createStackNavigator<StackParamsWaiting>();


import OnWaitingScreen from "../../../screens/orders/OnWaitingScreen";
import { fadeAnimation } from "../../shared/fade_animation";
import DeliveryPointScreen from "../../../screens/orders/DeliveryPointScreen";
const WaitingStackNavigator = () => {
  return (
    <WaitingStack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="OnWaitingScreen"
    >

        <WaitingStack.Screen
            name = "OnWaitingScreen"
            component={OnWaitingScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />
        
        <WaitingStack.Screen
            name = "DeliveryPointScreen"
            component={DeliveryPointScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />

    </WaitingStack.Navigator>
  )
}
export default WaitingStackNavigator










