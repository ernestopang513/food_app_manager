import { Button, Divider, Icon, Layout, List, ListItem, Text, useTheme } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem from '../../components/settings/MenuItem';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface optionItem {
  name: string;
  rightIcon: string;
  leftIcon: string;
}


const optionsItemsAction = [
  {
    name: 'Locales',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Platillos',
    icon: 'fast-food-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Menu de platillos',
    icon: 'restaurant-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Punto de entrega',
    icon: 'location-outline',
    component: 'FoodStandScreen',
  },
  
]



const SettingsScreen = () => {

  const { logout} = useAuthStore();

 
  return (
    <Layout style={{flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
      
      <ScrollView>

        <Text 
          category='h2' 
          style={{marginBottom: 20}}
        >
          Ajustes
        </Text>

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

        <Button 
          style={{marginTop: 20}}
          status='danger'
          onPress={logout}  
        >
          LogOut
        </Button>

      </ScrollView>
    </Layout>

  )
}
export default SettingsScreen