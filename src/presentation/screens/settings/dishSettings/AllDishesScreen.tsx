import { useQuery } from '@tanstack/react-query'
import { View, Text, FlatList, Pressable } from 'react-native'
import { getAllDishes } from '../../../../actions/dishes/get-all-dishes'
import { Icon, Layout, TopNavigation } from '@ui-kitten/components'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import DishCard from '../../../components/settings/dishSettings/DishCard'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StackParamsDishSettings } from '../../../routes/settings/dishNav/DishSettingsStackNav'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'



interface Props extends StackScreenProps<StackParamsDishSettings, 'AllDishes'> {}

const AllDishesScreen = ({navigation : {navigate}}: Props) => {
    
    const {data: dishes, isLoading, isError, error} = useQuery({
        queryKey: ['AllDishesSettings'],
        queryFn: getAllDishes
    })

    // const {navigate} = useNavigation<StackNavigationProp<StackParamsDishSettings>>();


  return (
    <TopNavigationLayout 
    title='Platilos'
    subTitle='Edición'
    renderRightAction={Add}
    >
        <Layout
            style = {{paddingHorizontal: 20, flex: 1}}
        >
            {
                isLoading && <SkeletonCard style={{marginTop: 20}}/>
            }
            {
                !dishes && !isLoading && isError &&
                <ErrorScreen message={error.message ?? 'Error inesperado'} />
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
            renderItem={({ item }) => <DishCard dish={item} onPress={() => navigate('Dish', { dishId: item.id })} />}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 40 }}
          />
        }

        </Layout>
    </TopNavigationLayout>
  )
}
export default AllDishesScreen



export const Add = () => {
  const navigation = useNavigation<NavigationProp<StackParamsDishSettings>>();
  return(

    <Pressable
      onPress={() => navigation.navigate('Dish', {dishId: 'new'})}
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
