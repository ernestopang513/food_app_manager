import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFilterFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'
import DishQuantityController from './DishQuantityController'
import NoticeScreen from '../../components/ui/NoticeScreen'
import SkeletonCard from '../../components/ui/SkeletonCard'
import { Layout } from '@ui-kitten/components'


interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandScreen'>{}


const FoodStandScreen = ({route}: Props) => {

  const { foodStandId } = route.params;

  const {data: foodStand, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStand', foodStandId],
    queryFn: () => getFilterFoodStandById(foodStandId)
  })

  const title = isLoading
    ? 'Cargando...'
    : error
      ? 'Error'
      : foodStand?.name ?? 'No disponible'
  return (
    <TopNavigationLayout
      title={title}
    >
      {isLoading && <Layout style={{flex: 1}}><SkeletonCard/></Layout>}

      {!isLoading && error && <ErrorScreen message={error.message}  />}

      { !isLoading && !error && foodStand && (
        
        <DishQuantityController foodStand={foodStand} onRefresh={() => refetch().then(()=> {})} />

      )}
      { !isLoading && !error && !foodStand && (
        
        <NoticeScreen 
          title='No se encontro información'
          message='Posible foodStand sin info'
        />

      )}

    </TopNavigationLayout>
  )
}
export default FoodStandScreen


