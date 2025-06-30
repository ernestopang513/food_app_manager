import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Platform, SafeAreaView, StatusBar, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { IonIconsPack } from './config/adapters/IconAdapter';

import './presentation/routes/gesture-handler';
import { AuthProvider } from './presentation/routes/providers/AuthProvider';
import RootStackNavigation from './presentation/routes/RootStackNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient();


const FoodAppManager = () => {
  return (
    <QueryClientProvider client ={queryClient}>
    <IconRegistry icons={IonIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <SafeAreaProvider>
          {/* <SafeAreaView style = {{flex: 1}} > */}
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

          <NavigationContainer>
            <AuthProvider>
              <RootStackNavigation/>
            </AuthProvider>
          </NavigationContainer>
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}
export default FoodAppManager


