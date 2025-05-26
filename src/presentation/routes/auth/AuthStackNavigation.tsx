


import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../../screens/auth/LoginScreen';
import { RegisterScreen } from '../../screens/auth/RegisterScreen';
import { fadeAnimation } from '../shared/fade_animation';
import { LoadingScreen } from '../../screens/loading/LoadingScreen';


export type AuthRootStackParams = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    LoadingScreen: undefined;
}


const AuthStack = createStackNavigator<AuthRootStackParams>();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator
    initialRouteName='LoadingScreen'
    screenOptions={{
        headerShown: false,
    }}
    >

        <AuthStack.Screen 
            options={{cardStyleInterpolator: fadeAnimation}}
            name = 'LoginScreen' 
            component={LoginScreen} 
        />

        <AuthStack.Screen 
            options={{cardStyleInterpolator: fadeAnimation}}
            name = 'RegisterScreen' 
            component={RegisterScreen} 
        />
        
        <AuthStack.Screen 
            options={{cardStyleInterpolator: fadeAnimation}}
            name = 'LoadingScreen' 
            component={LoadingScreen} 
        />

    </AuthStack.Navigator>
)
}
export default AuthStackNavigation;



