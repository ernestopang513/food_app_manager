import { View, Text, ScrollView } from 'react-native'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsFdSSettings } from '../../../routes/settings/foodStandNav/FdSettingsStackNav'
import { FoodStand } from '../../../../domain/entities/foodStand'
import { useRef } from 'react'
import { getFoodStandById, getFoodStandByIdNoDishes } from '../../../../actions/foodStands/get-foodStand-by-id';
import { useQuery } from '@tanstack/react-query'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { Button, Input, Layout } from '@ui-kitten/components'
import Icon from '@react-native-vector-icons/ionicons'

const emptyFoodStand: Partial<FoodStand> = {
    name: 'Nuevo Local',
    location: 'En algun lugar de CU',
    latitude: 0,
    longitude: 0,
}

const FoodStandSettingsScreen = ({route}:StackScreenProps<StackParamsFdSSettings, 'FoodStand'>) => {

  const foodStandId = useRef(route.params.foodStandId)


  const isNew = foodStandId.current === 'new'

  const {data: foodStand, isLoading, isError} = useQuery({
    queryKey: ['foodStand', foodStandId.current, 'settings'],
    queryFn: () => getFoodStandByIdNoDishes(foodStandId.current),
    enabled: !isNew
  })


  const finalFoodStand = isNew? emptyFoodStand : foodStand

  

  return (
    <TopNavigationLayout 
        title={finalFoodStand?.name ?? ''}        
    >
      <Layout
        style = {{marginHorizontal: 20,  flex: 1}}
      >

      {
        isLoading && <SkeletonCard style={{marginTop: 40}} />
      }

      <ScrollView
        showsVerticalScrollIndicator = {false}
        >

        <Layout>
          <Input
            label={"Nombre"}
            value={finalFoodStand?.name}
            style={{marginVertical: 5}}
          />
          <Input
            label={"Locación"}
            value={finalFoodStand?.location}
            style={{marginVertical: 5}}
          />
          <Input
            label={"Latitud"}
            value={finalFoodStand?.latitude?.toString()}
            style={{marginVertical: 5}}
          />
          <Input
            label={"Longitud"}
            value={finalFoodStand?.longitude?.toString()}
            style={{marginVertical: 5}}
          />
        </Layout>

        <Button
          accessoryLeft={ () => <Icon name='save-outline' color={'white'} size={35} />}
          style =  {{marginTop: 20}}
        >
          Guardar
        </Button>

      <Text>{JSON.stringify(finalFoodStand, null, 2)}</Text>
      </ScrollView>

        </Layout>


    </TopNavigationLayout>
  )
}
export default FoodStandSettingsScreen