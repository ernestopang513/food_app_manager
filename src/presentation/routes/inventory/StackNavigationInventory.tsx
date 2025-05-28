import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from 'react-native'
import FoodStandsScreen from "../../screens/inventory/FoodStandsScreen";
import FoodStandScreen from "../../screens/inventory/FoodStandScreen";
import FoodStandSettinsScreen from '../../screens/inventory/FoodStandSettinsScreen';
import { Sucursal } from "../../components/foodStands/FoodStandCard";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { fadeAnimation } from "../shared/fade_animation";
import { FoodStand } from "../../../domain/entities/foodStand";

export type RootStackParamsInventory = {
    FoodStandsScreen: undefined;
    FoodStandScreen: {FoodStand: FoodStand};
    FoodStandSettinsScreen: undefined;
}

const InventoryStack = createStackNavigator();

const StackNavigationInventory = () => {

    return (

    <InventoryStack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="FoodStandsScreen"
    >
        <InventoryStack.Screen 
            name="FoodStandsScreen" 
            component={FoodStandsScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
            />
        <InventoryStack.Screen 
            name="FoodStandScreen" 
            component={FoodStandScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
            />
        <InventoryStack.Screen 
            name="FoodStandSettings" 
            component={FoodStandSettinsScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />
    </InventoryStack.Navigator>
  )
}
export default StackNavigationInventory










