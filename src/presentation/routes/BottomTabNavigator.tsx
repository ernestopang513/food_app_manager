import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import BottomTabBar from '../components/navigation/BottomTabBar';
import FoodStandsScreen from '../screens/inventory/FoodStandsScreen';
import FoodStandScreen from '../screens/inventory/FoodStandScreen';
import { Layout, useTheme } from '@ui-kitten/components';
import StackNavigationInventory from './inventory/StackNavigationInventory';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SettingsStackNavigation from './settings/SettingsStackNavigation';
import TopNavigationLayout from '../layouts/TopNavigationLayout';
import FoodStandSettinsScreen from '../screens/inventory/FoodStandSettingsScreen';

export type RootBottomParams = {
  Inventario: undefined;
  Pedidos: undefined;
  Ajustes: undefined;
}

const { Navigator, Screen} = createBottomTabNavigator<RootBottomParams>();


const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Layout style={{flex: 1, backgroundColor: theme['color-primary-200']}}>

    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
      >
      <Screen name= 'Inventario' component={StackNavigationInventory} />
      <Screen name= 'Pedidos' component={FoodStandSettinsScreen} />
      <Screen name= 'Ajustes' component={SettingsStackNavigation} />
    </Navigator>
    </Layout>
  )
}

export default BottomTabNavigator









