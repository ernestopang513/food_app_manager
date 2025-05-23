import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import BottomTabBar from '../components/navigation/BottomTabBar';
import FoodStandsScreen from '../screens/inventory/FoodStandsScreen';
import FoodStandScreen from '../screens/inventory/FoodStandScreen';
import { Layout, useTheme } from '@ui-kitten/components';


const { Navigator, Screen} = createBottomTabNavigator();


const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Layout style={{flex: 1, backgroundColor: theme['color-primary-200']}}>

    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      >
      <Screen name= 'Inventario' component={FoodStandsScreen} />
      <Screen name= 'Pedidos' component={FoodStandScreen} />
      <Screen name= 'Ajustes' component={FoodStandScreen} />
    </Navigator>
    </Layout>
  )
}

export default BottomTabNavigator









