


import { Layout, Text } from '@ui-kitten/components'
import FoodStandsList from '../../components/foodStands/FoodStandsList'
import { getAllFoodStands } from '../../../actions/foodStands/get-all-foodStand'
import { useQuery } from '@tanstack/react-query'
import { LoadingScreen } from '../loading/LoadingScreen'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import NoticeScreen from '../../components/ui/NoticeScreen'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandsScreen'>{}

const FoodStandsScreen = ({navigation}: Props) => {

  const {data: foodStands, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStands,
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
      rightAction={() =>navigation.navigate('FoodStandSettingsScreen')}
      rightActionIcon='toggle-sharp'
    >

      <Layout
        style={{ paddingHorizontal: 10, flex: 1 }}
      >
        
        {
          ( foodStands === undefined || (foodStands.length === 0) )
          ? <NoticeScreen title='Sin locales' message='Ve a crear locales! Pista: estan en ajustes' />
          : <FoodStandsList foodStands={foodStands} onRefresh={() => refetch().then(() => { })} />
        }

      </Layout>
      </TopNavigationLayout>
  )
}
export default FoodStandsScreen


