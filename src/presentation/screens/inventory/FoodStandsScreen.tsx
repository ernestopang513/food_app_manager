


import { Layout, Text } from '@ui-kitten/components'
import FoodStandsList from '../../components/foodStands/FoodStandsList'
import { getAllFoodStands } from '../../../actions/foodStands/get-all-foodStand'
import { useQuery } from '@tanstack/react-query'
import { LoadingScreen } from '../loading/LoadingScreen'
import { useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
const FoodStandsScreen = () => {

  const {data: foodStands, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStands'],
    queryFn: getAllFoodStands,
    staleTime: 0,
    // refetchInterval: 1000
  })
  if (isLoading) {
      return (
          <LoadingScreen/>
        )
      }
      
      if (error) {
          return (
              <Layout style= {{flex: 1, justifyContent: 'center', alignContent: 'center'}} >
                <Text style={{alignSelf: 'center'}}  category='h2' status='danger' >Error al cargar los locales.</Text>
              </Layout>
            )
          }
          

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <Layout
        style = {{paddingHorizontal: 10, flex: 1}}
    >
      <Text category='h1' >Locales</Text>
      
      <FoodStandsList foodStands={foodStands!} onRefresh={() => refetch().then(()=>{})}/>
      {/* <FoodStandsList foodStands={foodStands!} onRefresh={() => refetch().then(()=>{})}/> */}

    </Layout>
  )
}
export default FoodStandsScreen


