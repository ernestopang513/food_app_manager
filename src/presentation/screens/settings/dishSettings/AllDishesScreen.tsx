import { useQuery } from '@tanstack/react-query'
import { View, Text, FlatList } from 'react-native'
import { getAllDishes } from '../../../../actions/dishes/get-all-dishes'
import { Layout, TopNavigation } from '@ui-kitten/components'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import { DishInfoItem } from '../../../components/foodStands/DishInfoItem'
import DishCard from '../../../components/settings/dishSettings/DishCard'





const AllDishesScreen = () => {
    
    const {data: dishes, isLoading, isError, error} = useQuery({
        queryKey: ['AllDishesSettings'],
        queryFn: getAllDishes
    })

  return (
    <TopNavigationLayout 
    title='Platilos'
    subTitle='Edición'
    >
        <Layout
            style = {{paddingHorizontal: 20, flex: 1}}
        >
            {
                isLoading && <SkeletonCard style={{marginTop: 20}}/>
            }
            {
                !dishes && !isLoading && isError &&
                <ErrorScreen message={error.message ?? 'error artificial'} />
            }

            {
                !isLoading && !isError && !!dishes && dishes.length === 0 &&
                <NoticeScreen title='Sin platillos' message='No hay platillos, puedes crear uno!' />
            }

            {
                !isLoading && !isError && !!dishes && dishes.length !== 0 &&
                <FlatList
                    data={dishes}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({item}) => <DishCard dish = {item} />}
                />
            }

        </Layout>
    </TopNavigationLayout>
  )
}
export default AllDishesScreen