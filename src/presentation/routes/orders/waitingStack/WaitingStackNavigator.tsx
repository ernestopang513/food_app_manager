import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { fadeAnimation } from "../../shared/fade_animation";
import OnWaitingScreen from "../../../screens/orders/waiting/OnWaitingScreen";
import DeliveryPointScreen from "../../../screens/orders/waiting/DeliveryPointScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { useOrderStore } from "../../../store/orders/useOrdersStore";


export type StackParamsWaiting = {
    OnWaitingScreen: undefined;
    DeliveryPointScreen: {deliveryPointId: string, dpName: string}

}


const WaitingStack = createStackNavigator<StackParamsWaiting>();


const WaitingStackNavigator = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsWaiting>>();
    const foodStandId = useOrderStore(state => state.foodStandId);
 
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










