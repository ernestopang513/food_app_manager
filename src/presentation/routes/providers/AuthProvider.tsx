
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
// import { RootStackParams } from "../navigation/StackNavigation"
import { PropsWithChildren, useEffect } from "react"
import { RootStackParams } from "../RootStackNavigation";
import { useAuthStore } from "../../store/auth/useAuthStore";
// import { useAuthStore } from "../store/auth/useAuthStore"



export const AuthProvider = ({children}: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const {checkStatus, status} = useAuthStore();
    // const status = 'checking'

    useEffect(()=>{
        checkStatus();
    }, [])

    useEffect(() => {
      if(status !== 'checking') {
        if (status === 'authenticated') {
            navigation.reset({
                index: 0,
                routes: [{name: 'MainApp'}],
            })
        }else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth'}]
            })
        }
      }
    
   
    }, [status])
    

  return (
    <>{ children }</>
  )
}


