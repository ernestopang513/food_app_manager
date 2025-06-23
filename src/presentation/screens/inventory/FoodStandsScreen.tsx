


import { Icon, Layout, Text } from '@ui-kitten/components'
import FoodStandsList from '../../components/foodStands/FoodStandsList'
import { getAllFoodStandsWithDishes } from '../../../actions/foodStands/get-all-foodStand'
import { useQuery } from '@tanstack/react-query'
import { LoadingScreen } from '../loading/LoadingScreen'
import { useCallback } from 'react'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import NoticeScreen from '../../components/ui/NoticeScreen'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { StackScreenProps } from '@react-navigation/stack'
import { Pressable } from 'react-native'
import { StackParamsSettings } from '../../routes/settings/SettingsStackNavigation'

interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandsScreen'>{}

const FoodStandsScreen = ({navigation}: Props) => {

  const {data: foodStands, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStandsWithDishes,
    staleTime: 0,
    // refetchInterval: 1000
  })
  
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );
  
  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  if (error) {
    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }} >
        <Text style={{ alignSelf: 'center' }} category='h2' status='danger' >Error al cargar los locales.</Text>
      </Layout>
    )
  }

  // const foodStandError = [] as any


  return (
    <TopNavigationLayout
      title='Locales'
      subTitle='inventario'
      renderRightAction={OpenClose}
    >

      <Layout
        style={{ paddingHorizontal: 10, flex: 1 }}
      >
        
        {
          ( !foodStands || (foodStands.length === 0) )
          ? <NoticeScreen title='Sin locales' message='Ve a crear locales! Pista: estan en ajustes' />
          : <FoodStandsList foodStands={foodStands} onRefresh={() => refetch().then(() => { })} />
        }

      </Layout>
      </TopNavigationLayout>
  )
}
export default FoodStandsScreen


const OpenClose = () => {
  const navigation = useNavigation<NavigationProp<StackParamsInventory>>();
  return(

    <Pressable
      onPress={() => navigation.navigate('FoodStandSettingsScreen')}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon
        style={{height: 24 }}
        name={'toggle-sharp'}

      />
      <Text category="label">Abrir/Cerrar</Text>
    </Pressable>
  )
}

