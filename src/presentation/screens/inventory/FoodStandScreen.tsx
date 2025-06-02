import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'
import DishQuantityController from './DishQuantityController'
import NoticeScreen from '../../components/ui/NoticeScreen'


interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandScreen'>{}


const FoodStandScreen = ({route}: Props) => {

  const { foodStandId } = route.params;

  const {data: foodStand, isLoading, error, refetch} = useQuery({
    queryKey: ['foodStand', foodStandId],
    queryFn: () => getFoodStandById(foodStandId)
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
      {isLoading && <LoadingScreen/>}

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




