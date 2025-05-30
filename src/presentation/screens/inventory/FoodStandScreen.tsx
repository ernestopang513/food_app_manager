import { Icon, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
        
        <KeyboardAwareScrollView
          style = {{flex: 1}}
          enableOnAndroid
          extraScrollHeight={90}
          keyboardShouldPersistTaps= 'handled'
        
        >


        <Layout>

        <Text status='success' >{foodStand.name}</Text>

        <Input keyboardType='numeric' style ={{marginVertical: 80}}/>
        <Input keyboardType='numeric' style ={{marginVertical: 80}}/>
        <Input keyboardType='numeric' style ={{marginVertical: 80}}/>
        <Input keyboardType='numeric' style ={{marginVertical: 80}}/>
        <Input keyboardType='numeric' style ={{marginVertical: 80}}/>

        </Layout>
       
        </KeyboardAwareScrollView>

      )}

    </TopNavigationLayout>
  )
}
export default FoodStandScreen


