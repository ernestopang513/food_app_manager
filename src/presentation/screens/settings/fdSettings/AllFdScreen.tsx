import { Icon, Layout, Text } from '@ui-kitten/components'
import { Pressable } from 'react-native'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { useQuery } from '@tanstack/react-query'
import { getAllFoodStandsWithDishes } from '../../../../actions/foodStands/get-all-foodStand'
import { getAllFoodStands } from '../../../../actions/settings/get-all-foodStand.settings'
import { log } from '../../../../config/loggers/logger'
import { StackParamsFdSSettings } from '../../../routes/settings/foodStandNav/FdSettingsStackNav'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import FoodStandsList from '../../../components/settings/foodStandSettings/FoodStandList.settings'
const AllFdScreen = () => {

    const { data: foodStands, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['foodStandsSettings'],
        queryFn: getAllFoodStands,
        // staleTime: 1000 * 60,
        staleTime: 0,
    })

    log(foodStands)

  return (
    <TopNavigationLayout
        title='Locales'
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
          <FoodStandsList foodStands={foodStands} onRefresh={() => refetch().then(() => { })} />
        }
        </Layout>
    </TopNavigationLayout>
  )
}
export default AllFdScreen

export const Add = () => {
  const navigation = useNavigation<NavigationProp<StackParamsFdSSettings>>();
  return(

    <Pressable
      onPress={() => navigation.navigate('FoodStand', {foodStandId: 'new'})}
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
