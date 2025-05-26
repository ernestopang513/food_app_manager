
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
// import { RootStackParams } from "../../navigation/StackNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { AuthRootStackParams } from "../../routes/auth/AuthStackNavigation";
import { useAuthStore } from "../../store/auth/useAuthStore";
// import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<AuthRootStackParams, 'LoginScreen'> {}
// type Props = StackScreenProps<AuthRootStackParams, 'LoginScreen'>

export const LoginScreen = ({navigation}: Props) => {

  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const {height } = useWindowDimensions();

  const onLogin = async() => {
    if (form.email.length == 0 || form.password.length == 0) {
      return;
    }

    setIsPosting(true)

    const wasScuccessful = await login(form.email, form.password);

    setIsPosting(false)

    if (wasScuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos');

  }


  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35 }}>
          <Text category="h1" >Ingresar</Text>
          <Text category="p2" >Por favor, ingreese para continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={ form.email }
            onChangeText={email => setForm({...form, email})}
            accessoryLeft={<Icon name="mail-outline" />}
            style={{ marginBottom: 20}}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={ form.password }
            onChangeText={password => setForm({...form, password})}
            accessoryLeft={<Icon name="lock-closed-outline" />}
            style={{marginBottom: 10}}
          />

          <Layout style={{height: 20}} />

          <Layout>
            <Button
              disabled = {isPosting}
              accessoryRight={<Icon white name="arrow-forward-outline" />}
              onPress={onLogin}
            >
              Ingresar
            </Button>
          </Layout>

          <Text>{JSON.stringify(form, null, 2)}</Text>

          {/* Información para crear cuenta */}
          <Layout style={{height: 50}} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'

          }}>
            <Text>¿No tienes cuenta?</Text>
            <Text 
              status="primary" 
              category="h5"
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {' '}Crea una{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>
    </Layout>
  )
}