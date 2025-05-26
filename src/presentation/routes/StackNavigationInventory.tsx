import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from 'react-native'
import FoodStandsScreen from "../screens/inventory/FoodStandsScreen";
import FoodStandScreen from "../screens/inventory/FoodStandScreen";
import FoodStandSettinsScreen from '../screens/inventory/FoodStandSettinsScreen';
import { Sucursal } from "../components/foodStands/FoodStandCard";

export type RootStackParamsInventory = {
    FoodStandsScreen: undefined;
    FoodStandScreen: {FoodStand: Sucursal};
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
        <InventoryStack.Screen name="FoodStandsScreen" component={FoodStandsScreen}/>
        <InventoryStack.Screen name="FoodStandScreen" component={FoodStandScreen}/>
        <InventoryStack.Screen name="FoodStandSettings" component={FoodStandSettinsScreen}/>
    </InventoryStack.Navigator>
  )
}
export default StackNavigationInventory










