import { createStackNavigator } from "@react-navigation/stack";




export type StackParamsFoodStandDish = {
    AllFoodStands: undefined;
    Dishes: {foodStandId: string};
    FoodStandDish: {foodStandDishId: string}
    
}

const FoodStandDishSettingsStack = createStackNavigator();


import { fadeAnimation } from "../../shared/fade_animation";
import FoodStandDishScreen from "../../../screens/settings/fdDish/FoodStandDishScreen";
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
    </FoodStandDishSettingsStack.Navigator>
  )
}
export default FdDishSettisgStackNav