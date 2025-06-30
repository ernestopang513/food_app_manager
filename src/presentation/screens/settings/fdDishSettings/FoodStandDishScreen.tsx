



import { View, FlatList} from 'react-native'
import { getAllFoodStands } from '../../../../actions/settings/get-all-foodStand.settings'
import { useQuery } from '@tanstack/react-query'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import FoodStandDishCard from '../../../components/settings/foodStandDishSettings/FoodStandDishCard'
import { useState } from 'react'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsFoodStandDish } from '../../../routes/settings/foodStandDishNav/fdDishSettisgStackNav'

interface Props extends StackScreenProps<StackParamsFoodStandDish, 'AllFoodStands'>{}

const FoodStandDishScreen = ({navigation}: Props) => {

    const [refreshing, setRefreshing] = useState(false);

    const { data: foodStands, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['foodStandsSettings'],
        queryFn: getAllFoodStands,
        // staleTime: 1000 * 60,
        staleTime: 0,
    })

    const handleRefresh = async() => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false)
    }


   return (
    <TopNavigationLayout
        title='Menú'
        subTitle='Edición'
    >
      
        {
          isLoading && 
          <View style = {{paddingHorizontal: 20, flex: 1, paddingTop: 30}}>
          <SkeletonCard  />
          </View>
        }

        {
          !foodStands &&  !isLoading && isError &&
          <ErrorScreen message={error.message} />
        }


        {
            !isLoading && !isError && !!foodStands && foodStands.length === 0  
          && <NoticeScreen title='Sin locales' message='No hay locales puedes crear uno!' />
        }

        {
          !isLoading && !isError && !!foodStands && foodStands.length !== 0 &&
            <FlatList
                data = {foodStands}
                contentContainerStyle = {{paddingHorizontal: 20}}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item}) => <FoodStandDishCard foodStand={item} onPress={() => navigation.navigate('Dishes', {foodStandId: item.id})} /> }
                refreshing = {refreshing}
                onRefresh={handleRefresh}
            />
        }
    </TopNavigationLayout>
  )
}
export default FoodStandDishScreen

