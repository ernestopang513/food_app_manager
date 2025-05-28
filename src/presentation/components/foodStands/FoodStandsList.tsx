import { List } from '@ui-kitten/components';
import { FoodStandCard } from './FoodStandCard';
import { FoodStand } from '../../../domain/entities/foodStand';
import { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';





interface Props {
    foodStands: FoodStand[]
    onRefresh: () => Promise<void> 
}

const FoodStandsList = ({foodStands, onRefresh}: Props) => {

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await onRefresh()
        } finally {
            setRefreshing(false)
        }
    }, [onRefresh]);

  return (
    <List
        data = {foodStands}
        keyExtractor={(item, index) => `${item.name}-${index}`}

        renderItem={({item}) => <FoodStandCard foodStand = {item}/>}

        refreshControl={
            <RefreshControl  refreshing={refreshing} onRefresh={handleRefresh}    />
        }
    />
  )
}
export default FoodStandsList