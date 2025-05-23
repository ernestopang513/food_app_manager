


import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { View, Text, StatusBar } from 'react-native'
import BottomTabNavigator from './presentation/routes/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IonIconsPack } from './config/adapters/IconAdapter';








const FoodAppManager = () => {
  return (
    <>
    <IconRegistry icons={IonIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <SafeAreaProvider>
          <StatusBar backgroundColor={'white'} barStyle={'light-content'} />
          <NavigationContainer>
            <BottomTabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  )
}
export default FoodAppManager


