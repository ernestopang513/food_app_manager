import { createStackNavigator } from "@react-navigation/stack";
import FoodStandsScreen from "../../screens/inventory/FoodStandsScreen";
import FoodStandScreen from "../../screens/inventory/FoodStandScreen";
import { fadeAnimation } from "../shared/fade_animation";
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










