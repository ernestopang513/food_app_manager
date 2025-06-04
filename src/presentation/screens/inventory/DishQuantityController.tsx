import { View, Text, ScrollView, RefreshControl, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DishCardForm from '../../components/foodStands/DishCardForm'
import { FoodStand } from '../../../domain/entities/foodStand'
import { useCallback, useState } from 'react'
import { QueryClient, useQueryClient } from '@tanstack/react-query';

interface Props {
  foodStand: FoodStand;
  onRefresh: () => Promise<void>;
}

const DishQuantityController = ({foodStand, onRefresh}: Props) => {

  const [refreshing, setRefreshing] = useState(false)
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(async() => {
    setRefreshing(true)
    try {
      await onRefresh()
      foodStand.foodStandDishes.forEach(dish => {
        queryClient.invalidateQueries({ queryKey: [`foodStandDish-${dish.id}`]})
      })
    } finally {
      setRefreshing(false)
    }
  }, [onRefresh])

  const sortedDishes = [...foodStand.foodStandDishes]
    .sort((a,b) => a.dish.name.localeCompare(b.dish.name));
 
    return (
    <ScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      keyboardShouldPersistTaps = 'handled'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >

      {
        sortedDishes.map((item) => (
          <DishCardForm foodStandDishId={item.id} key={item.id} />
        ))
      }

      <View style = {{height: 120}} />
    </ScrollView>
  )
  
}
export default DishQuantityController