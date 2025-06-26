import { createStackNavigator } from '@react-navigation/stack'
import { fadeAnimation } from '../../shared/fade_animation';
import TemporalScreen from '../../../screens/develop/TemporalScreen';
import AllDishesScreen from '../../../screens/settings/dishSettings/AllDishesScreen';

export type StackParamsDishSettings = {
    AllDishes: undefined
    Dish: {dishId: string}
}

const DishSettingStack = createStackNavigator<StackParamsDishSettings>();

const DishSettingsStackNav = () => {
  return (
    <DishSettingStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName='AllDishes'
    >
        <DishSettingStack.Screen name='AllDishes' component={AllDishesScreen}/>
        <DishSettingStack.Screen name='Dish' component={TemporalScreen}/>
    </DishSettingStack.Navigator>
  )
}
export default DishSettingsStackNav