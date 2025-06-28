



import { View, Text, FlatList, Pressable } from 'react-native'
import { getAllFoodStands } from '../../../../actions/settings/get-all-foodStand.settings'
import { useQuery } from '@tanstack/react-query'
import { Icon, Layout } from '@ui-kitten/components'
import FoodStandsList from '../../../components/foodStands/FoodStandsList'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import FoodStandDishCard from '../../../components/settings/foodStandDishSettings/FoodStandDishCard'
import { useState } from 'react'
const FoodStandDishScreen = () => {

    const [refreshing, setRefreshing] = useState(false);

    const { data: foodStands, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['foodStandsSettings'],
        queryFn: getAllFoodStands,
        // staleTime: 1000 * 60,
        staleTime: 0,
    })


   return (
    <TopNavigationLayout
        title='Menú'
        subTitle='Edición'
        renderRightAction={Add}
    >
      <Layout
        style = {{paddingHorizontal: 10, flex: 1}}
      >
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
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item}) => <FoodStandDishCard foodStand={item}  /> }
                refreshing = {refreshing}
                onRefresh={refetch}
            />
        }
        </Layout>
    </TopNavigationLayout>
  )
}
export default FoodStandDishScreen

const Add = () => {
  return(

    <Pressable
      onPress={() => []}
    //   onPress={() => {}}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon
        style={{ height: 34 }}
        name={'add'}

      />
      {/* <Text category="label"></Text> */}
    </Pressable>
  )
}
