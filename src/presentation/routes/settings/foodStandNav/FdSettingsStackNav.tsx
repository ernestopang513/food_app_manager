import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import TemporalScreen from '../../../screens/develop/TemporalScreen';
import { fadeAnimation } from '../../shared/fade_animation';
import AllFdScreen from '../../../screens/settings/fdSettings/AllFdScreen';
import FoodStandSettingsScreen from '../../../screens/settings/fdSettings/FoodStandSettingsScreen';

export type StackParamsFdSSettings = {
    AllFoodStands: undefined
    FoodStand: {foodStandId: string}
}

const FdSettingsStack = createStackNavigator<StackParamsFdSSettings>();

const FdSettingsStackNav = () => {
  return (
    <FdSettingsStack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: fadeAnimation
        }}
        initialRouteName='AllFoodStands'
    >
        <FdSettingsStack.Screen name='AllFoodStands' component={AllFdScreen}/>
        <FdSettingsStack.Screen name='FoodStand' component={FoodStandSettingsScreen}/>
    </FdSettingsStack.Navigator>
  )
}
export default FdSettingsStackNav