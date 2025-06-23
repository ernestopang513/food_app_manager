import { List } from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { FoodStand } from '../../../../domain/entities/foodStand';
import { FoodStandCard } from '../../foodStands/FoodStandCard';
import { StackParamsSettings } from '../../../routes/settings/SettingsStackNavigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamsFdSSettings } from '../../../routes/settings/foodStandNav/FdSettingsStackNav';


interface Props {
    foodStands: FoodStand[]
    onRefresh: () => Promise<void> 
}

const FoodStandsList = ({foodStands, onRefresh}: Props) => {

    const [refreshing, setRefreshing] = useState(false);

      const {navigate} = useNavigation<NavigationProp<StackParamsFdSSettings>>();
    

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

        renderItem={({item}) => 
                    <FoodStandCard
                        foodStand = {item}
                        onPress={(foodStandId) => navigate('FoodStand', {foodStandId})}
                    />}

        refreshControl={
            <RefreshControl  refreshing={refreshing} onRefresh={handleRefresh}    />
        }
    />
  )
}
export default FoodStandsList