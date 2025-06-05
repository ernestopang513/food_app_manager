import { Button, Divider, Icon, Layout, List, ListItem, Modal, ModalService, Text, useTheme } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler';
import MenuItem from '../../components/settings/MenuItem';
import { useAuthStore } from '../../store/auth/useAuthStore';
import TopNavigationLayout from '../../layouts/TopNavigationLayout';
import FtdOpenControl from '../../components/foodStands/FtdOpenControl';
import { Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllFoodStandsWithDishes } from '../../../actions/foodStands/get-all-foodStand';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { openFoodStand } from '../../../actions/foodStands/open-foodStand';
import { FoodStand } from '../../../domain/entities/foodStand';
import { useModal } from '../../hooks/useModal';
import CustomModal from '../../components/ui/CustomModal';


type LocalFoodStand = {
  id: string;
  isOpen: boolean;
  name: string;
}

const SettingsScreen = () => {

  const queryClient = useQueryClient();
  const [state, setState] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [localFoodStands, setLocalFoodStands] = useState<LocalFoodStand[]>([])

  const {visible, disabled, openModal, closeModal, setDisabled} = useModal();

  const theme = useTheme();

   const {data: foodStands, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStandsWithDishes,
    staleTime: 0,
    
    // refetchInterval: 1000
  })

  const handleToggle = (id: string, newValue: boolean) => {
    openModal(true)
    setLocalFoodStands((prev) => prev.map((stand)=>(stand.id === id ? {...stand, isOpen: newValue} : stand)));
    mutation.mutate([{id, isOpen: newValue}])
  }

  useEffect(() => {
    if(foodStands){

      const sortedFoodStands = [...foodStands]
    .sort((a,b) => a.name.localeCompare(b.name))

      setLocalFoodStands(
        sortedFoodStands.map((f)=> ({
          id: f.id,
          isOpen: f.isOpen,
          name: f.name,
        }))
      )
    }   
  }, [foodStands])
  
 
  const mutation = useMutation({
    mutationFn: async(data: Partial<FoodStand>[]) => {
      const promises = data.map((foodStand: Partial<FoodStand>) => openFoodStand({id: foodStand.id, isOpen: foodStand.isOpen}))
      try {
        // const results = await Promise.all(promises)
        // return results 
        await Promise.all(promises);
      } catch (error) {
        console.log(error);
        throw new Error(`Error abrindo/cerrando locales.`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['foodStands']});
      setDisabled(false)
      console.log('Success');
    },
  })


  


  return (

    <TopNavigationLayout
      title='Ajustes'
      subTitle='Abrir/Cerrar Locales'
    >

      <Layout style={{ flex: 1, paddingHorizontal: 20, paddingTop: 0 }}>

        <ScrollView>

          <Pressable 
          style={[{
            flexDirection: 'row',
            justifyContent: 'space-evenly', 
            alignItems: 'center', 
            marginVertical: 25,
            borderWidth: 0.5,
            borderRadius: 20,
            paddingVertical: 30,
            },
            state ? {backgroundColor:  theme['color-primary-500']}
            : {backgroundColor: 'white', borderColor: theme['color-primary-500'] }
          ]}
            onLongPress={() =>{
              const newState = !state;
              setState(newState);
            }}
            // disabled={true}
          >
          

            <Icon 
              name={state ? 'lock-open-sharp' : 'lock-closed-sharp'}  
              color = {state ? 'white' :  theme['color-primary-500']}
            />



            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[
                { label: 'Edición:' },
                { label: state? 'Abierta' : 'Cerrada' },
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
            isLoading &&  <SkeletonCard/>
          }
          { 
            localFoodStands.map((item, index) => {
             
              return (
              <FtdOpenControl
                key={`${item.id}+${index}`}
                name={item.name}
                isFirst={index === 0}
                isLast={index === localFoodStands.length - 1}
                state= {state}
                isOpen = {item.isOpen}
                onToggle={(value) => handleToggle(item.id, value)}

              />
            )})
          }

          <View style={{height:120}} />

          <CustomModal
            visible = {visible}
            title={'Actualizando estado'}
            message={mutation.isPending? 'Procesando' : 'Cambio exitoso'}
            loading ={mutation.isPending}
            disabled= {disabled}
            onClose={closeModal}

          
          />

        </ScrollView>
      </Layout>
    </TopNavigationLayout>

  )
}
export default SettingsScreen

