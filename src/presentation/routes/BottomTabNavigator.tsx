// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { View, Text } from 'react-native'
// import BottomTabBar from '../components/navigation/BottomTabBar';
// import FoodStandsScreen from '../screens/inventory/FoodStandsScreen';
// import FoodStandScreen from '../screens/inventory/FoodStandScreen';
// import { Layout, useTheme } from '@ui-kitten/components';
// import StackNavigationInventory from './inventory/StackNavigationInventory';
// import SettingsScreen from '../screens/settings/SettingsScreen';
// import SettingsStackNavigation from './settings/SettingsStackNavigation';
// import TopNavigationLayout from '../layouts/TopNavigationLayout';
// import FoodStandSettinsScreen from '../screens/inventory/FoodStandSettingsScreen';

// export type RootBottomParams = {
//   Inventario: undefined;
//   Pedidos: undefined;
//   Ajustes: undefined;
// }

// const { Navigator, Screen} = createBottomTabNavigator<RootBottomParams>();


// const BottomTabNavigator = () => {
//   const theme = useTheme();
//   return (
//     <Layout style={{flex: 1, backgroundColor: theme['color-primary-200']}}>

//     <Navigator
//       tabBar={props => <BottomTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard: true
//       }}
//       >
//       <Screen name= 'Inventario' component={StackNavigationInventory} />
//       <Screen name= 'Pedidos' component={FoodStandSettinsScreen} />
//       <Screen name= 'Ajustes' component={SettingsStackNavigation} />
//     </Navigator>
//     </Layout>
//   )
// }

// export default BottomTabNavigator

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import StackNavigationInventory from './inventory/StackNavigationInventory';
// import FoodStandSettingsScreen from '../screens/inventory/FoodStandSettingsScreen';
// import SettingsStackNavigation from './settings/SettingsStackNavigation';
// import Icon from '@react-native-vector-icons/ionicons';

// export type RootBottomParams = {
//   Inventario: undefined;
//   Pedidos: undefined;
//   Ajustes: undefined;
// };

// const Tab = createBottomTabNavigator<RootBottomParams>();

// const BottomTabNavigator = () => {
//   return (
//     <View style={styles.container}>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarHideOnKeyboard: true,
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName = '';

//             if (route.name === 'Inventario') {
//               iconName = focused ? 'storefront' : 'storefront-outline';
//             } else if (route.name === 'Pedidos') {
//               iconName = focused ? 'bicycle' : 'bicycle-outline';
//             } else if (route.name === 'Ajustes') {
//               iconName = focused ? 'settings' : 'settings-outline';
//             }

//             return <Icon name={iconName as any} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#3366FF', // color activo
//           tabBarInactiveTintColor: 'gray', // color inactivo
//           tabBarStyle: {
//             backgroundColor: '#C5D9FF', // fondo tab bar, parecido a 'color-primary-200'
//           },
//         })}
//       >
//         <Tab.Screen name="Inventario" component={StackNavigationInventory} />
//         <Tab.Screen name="Pedidos" component={FoodStandSettingsScreen} />
//         <Tab.Screen name="Ajustes" component={SettingsStackNavigation} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#C5D9FF',
//   },
// });

// export default BottomTabNavigator;





import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigationInventory from './inventory/StackNavigationInventory';
import FoodStandSettingsScreen from '../screens/inventory/FoodStandSettingsScreen';
import SettingsStackNavigation from './settings/SettingsStackNavigation';
import Icon from '@react-native-vector-icons/ionicons';
import { useTheme } from '@ui-kitten/components';

export type RootBottomParams = {
  Inventario: undefined;
  Pedidos: undefined;
  Ajustes: undefined;
};

const Tab = createBottomTabNavigator<RootBottomParams>();

const BottomTabNavigator = () => {

  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Inventario') {
              iconName = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'Pedidos') {
              iconName = focused ? 'bicycle' : 'bicycle-outline';
            } else if (route.name === 'Ajustes') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3366FF', // UI Kitten primary color aproximado
          tabBarInactiveTintColor: '#8F9BB3', // color gris azulado UI Kitten
          tabBarStyle: {
            // backgroundColor: '#E4E9F2', // UI Kitten background light variant
            backgroundColor: theme['color-primary-100'], // UI Kitten background light variant
            borderTopWith: 5,
            // borderTopWidth: 0,
            // elevation: 8, // sombra Android
            shadowColor: '#000', // sombra iOS
            // shadowOffset: { width: 0, height: -3 },
            // shadowOpacity: 0.1,
            shadowRadius: 4,
            height: 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            // paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
           tabBarButton: (props) => (
            <TouchableOpacity {...( props as any)} activeOpacity={0.7} />
          ),
        })}
      >
        <Tab.Screen name="Inventario" component={StackNavigationInventory} />
        <Tab.Screen name="Pedidos" component={FoodStandSettingsScreen} />
        <Tab.Screen name="Ajustes" component={SettingsStackNavigation} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E9F2', // Mismo fondo para toda la pantalla
    // backgroundColor: 'red', // Mismo fondo para toda la pantalla
  },
});

export default BottomTabNavigator;

