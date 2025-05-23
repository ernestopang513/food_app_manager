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

const Stack = createStackNavigator();

const StackNavigationInventory = () => {

    return (

    <Stack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName="FoodStandsScreen"
    >
        <Stack.Screen name="FoodStandsScreen" component={FoodStandsScreen}/>
        <Stack.Screen name="FoodStandScreen" component={FoodStandScreen}/>
        <Stack.Screen name="FoodStandSettings" component={FoodStandSettinsScreen}/>
    </Stack.Navigator>

  )
}
export default StackNavigationInventory










