import { Button, ButtonGroup, Card, Divider, Icon, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsInventory } from '../../routes/inventory/StackNavigationInventory'
import { useQuery } from '@tanstack/react-query'
import { getFoodStandById } from '../../../actions/foodStands/get-foodStand-by-id'
import { LoadingScreen } from '../loading/LoadingScreen'
import ErrorScreen from '../../components/ui/ErrorScreen'
import { View, ViewProps } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FoodStand } from '../../../domain/entities/foodStand'
import { useState } from 'react';
import DishCardForm from '../../components/foodStands/DishCardForm'


interface Props extends StackScreenProps<StackParamsInventory, 'FoodStandScreen'>{}


const FoodStandScreen = ({route}: Props) => {

  const { foodStandId } = route.params;

  const {data: foodStand, isLoading, error} = useQuery({
    queryKey: ['foodStand', foodStandId],
    queryFn: () => getFoodStandById(foodStandId)
  })
  console.log(foodStand)
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

      {error && <ErrorScreen message={error.message}  />}

      {foodStand && (
        
        <DishQuantityController foodStand={foodStand} />

      )}

    </TopNavigationLayout>
  )
}
export default FoodStandScreen

interface Props2 {

  foodStand: FoodStand
}

const DishQuantityController = ({ foodStand }: Props2) => {


  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps='handled'

    >

      <Text style={{ textAlign: 'center' }}>Ingresa la cantidad para agregar </Text>

      
      <DishCardForm foodStand={foodStand} />

    </KeyboardAwareScrollView>
  )
}



