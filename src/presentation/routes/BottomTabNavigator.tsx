import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import BottomTabBar from '../components/navigation/BottomTabBar';
import FoodStandsScreen from '../screens/inventory/FoodStandsScreen';
import FoodStandScreen from '../screens/inventory/FoodStandScreen';
import { Layout, useTheme } from '@ui-kitten/components';
import StackNavigationInventory from './StackNavigationInventory';

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
      <Screen name= 'Pedidos' component={FoodStandScreen} />
      <Screen name= 'Ajustes' component={FoodStandScreen} />
    </Navigator>
    </Layout>
  )
}

export default BottomTabNavigator









