import { createStackNavigator } from "@react-navigation/stack";




export type StackParamsFoodStandDish = {
    AllFoodStands: undefined;
    Dishes: {foodStandId: string};
    FoodStandDish: {foodStandDishId: string}
    
}

const FoodStandDishSettingsStack = createStackNavigator<StackParamsFoodStandDish>();


import { fadeAnimation } from "../../shared/fade_animation";
import FoodStandDishScreen from "../../../screens/settings/fdDishSettings/FoodStandDishScreen";
import DishesScreen from "../../../screens/settings/fdDishSettings/DishesScreen";
const FdDishSettisgStackNav = () => {
  return (
    <FoodStandDishSettingsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName="AllFoodStands"
    >
        <FoodStandDishSettingsStack.Screen name='AllFoodStands' component={FoodStandDishScreen} />
        <FoodStandDishSettingsStack.Screen name='Dishes' component={DishesScreen} />
    </FoodStandDishSettingsStack.Navigator>
  )
}
export default FdDishSettisgStackNav