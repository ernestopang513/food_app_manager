import { Button, Divider, Icon, Layout, List, ListItem, Text, useTheme } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem from '../../components/settings/MenuItem';
import { useAuthStore } from '../../store/auth/useAuthStore';
import TopNavigationLayout from '../../layouts/TopNavigationLayout';
import { Pressable } from 'react-native';
import { StackParamsSettings } from '../../routes/settings/SettingsStackNavigation';

interface optionItem {
  name: string;
  icon: string;
  component: keyof StackParamsSettings;
}


const optionsItemsAction: optionItem[] = [
  {
    name: 'Locales',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Platillos',
    icon: 'fast-food-outline',
    component: 'DishScreen',
  },
  {
    name: 'Menu de platillos',
    icon: 'restaurant-outline',
    component: 'FoodStandDishes',
  },
  {
    name: 'Punto de entrega',
    icon: 'location-outline',
    component: 'DeliveryPoint',
  },
  
]



const SettingsScreen = () => {
  return (

    <TopNavigationLayout
      title='Ajustes'
      renderRightAction={LogOutComponent}
    >

    <Layout style={{flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
      
      <ScrollView>
        {
          optionsItemsAction.map((item, index) => (
            <MenuItem
            key={`${item.component}+${index}`}
            {...item}
            isFirst = {index === 0}
            isLast={index === optionsItemsAction.length - 1}
            />
          ))
        }
      </ScrollView>
    </Layout>
          </TopNavigationLayout>

  )
}
export default SettingsScreen


const LogOutComponent = () => {
  const logout = useAuthStore(state => state.logout);
  const theme = useTheme();
  return(

    <Pressable
      onPress={logout}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon
        style={{height: 24 }}
        name={'log-out'}
        color = {theme['color-danger-500']}
      />
      <Text category="label">LogOut</Text>
    </Pressable>
  )
}
