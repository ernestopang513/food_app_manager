import { Icon, Layout, Text, useTheme } from '@ui-kitten/components'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'


interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandScreen'>{}


const FoodStandScreen = ({route}: Props) => {

  const { foodStandId } = route.params;

  const {data: foodStand, isLoading, error} = useQuery({
    queryKey: ['foodStand', foodStandId],
    queryFn: () => getFoodStandById(foodStandId)
  })

  const title = isLoading
    ? 'Cargando...'
    : error
      ? 'Error'
      : foodStand?.name ?? 'No disponible'
  console.log(error?.message)
  return (
    <TopNavigationLayout
      title={title}
    >
      {isLoading && <LoadingScreen/>}

      {error && <ErrorScreen message={error.message}  />}

      {foodStand && (
        <Text status='succes' >{foodStand.name}</Text>
      )}

    </TopNavigationLayout>
  )
}
export default FoodStandScreen


