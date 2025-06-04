import { Button, Divider, Icon, Layout, List, ListItem, Text, useTheme } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem from '../../components/settings/MenuItem';
import { useAuthStore } from '../../store/auth/useAuthStore';
import TopNavigationLayout from '../../layouts/TopNavigationLayout';
import FtdOpenControl from '../../components/foodStands/FtdOpenControl';
import { Pressable } from 'react-native';
import { useState } from 'react';


const optionsItemsAction = [
  {
    name: 'Locales',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Platillos',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Menu de platillos',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  {
    name: 'Punto de entrega',
    icon: 'storefront-outline',
    component: 'FoodStandScreen',
  },
  
]



const SettingsScreen = () => {

  const [state, setState] = useState(false)
  const theme = useTheme();
 
  return (

    <TopNavigationLayout
      title='Ajustes'
      subTitle='Abrir/Cerrar Locales'
    >

      <Layout style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>

        <ScrollView>

          <Pressable 
          style={[{
            flexDirection: 'row',
            justifyContent: 'space-evenly', 
            alignItems: 'center' , 
            marginVertical: 40,
            borderWidth: 0.5,
            borderRadius: 20,
            paddingVertical: 30,
            },
            state ? {backgroundColor:  theme['color-primary-500']}
            : {backgroundColor: 'white', borderColor: theme['color-primary-500'] }
          ]}
            onLongPress={() => setState(!state)}
            // disabled={true}
          >
          

            <Icon 
              name={state ? 'lock-open-sharp' : 'lock-closed-sharp'}  
              color = {state ? 'white' :  theme['color-primary-500']}
            />



            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[
                { label: 'Edición:' },
                { label: 'Bloqueada' },
              ].map(({ label }, idx) => (
                <Text
                  key={idx}
                  style={{
                    backgroundColor: state ? theme['color-primary-500'] : 'white',
                    color: state ? 'white' : theme['color-primary-500'],
                    paddingHorizontal: 6,
                  }}
                  category='h6'
                >
                  {label}
                </Text>
              ))}
            </Layout>
            
          </Pressable>

          {
            optionsItemsAction.map((item, index) => (
              <FtdOpenControl
                key={`${item.component}+${index}`}
                {...item}
                isFirst={index === 0}
                isLast={index === optionsItemsAction.length - 1}
                state= {state}
              />
            ))
          }

          

        </ScrollView>
      </Layout>
    </TopNavigationLayout>

  )
}
export default SettingsScreen