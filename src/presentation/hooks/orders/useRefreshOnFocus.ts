import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { View, Text } from 'react-native'


const useRefreshOnFocus = (refetch: () => Promise<any>) => {

    const [refreshing, setRefreshing] = useState(false);

     useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch()
        } finally {
            setRefreshing(false)
        }
    }, [refetch]);

    return {refreshing, handleRefresh}
    

}
export default useRefreshOnFocus