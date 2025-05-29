import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from 'react-native'
import FoodStandsScreen from "../../screens/inventory/FoodStandsScreen";
import FoodStandScreen from "../../screens/inventory/FoodStandScreen";
import FoodStandSettinsScreen from '../../screens/inventory/FoodStandSettingsScreen';
import { Sucursal } from "../../components/foodStands/FoodStandCard";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { fadeAnimation } from "../shared/fade_animation";
import { FoodStand } from "../../../domain/entities/foodStand";
import FoodStandSettingsScreen from "../../screens/inventory/FoodStandSettingsScreen";

export type StackParamsInventory = {
    FoodStandsScreen: undefined;
    FoodStandScreen: {foodStandId: string};
    FoodStandSettingsScreen: undefined;
}

const InventoryStack = createStackNavigator<StackParamsInventory>();

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
            name="FoodStandSettingsScreen" 
            component={FoodStandSettingsScreen}
            options={{
                cardStyleInterpolator: fadeAnimation
            }}
        />
    </InventoryStack.Navigator>
  )
}
export default StackNavigationInventory










