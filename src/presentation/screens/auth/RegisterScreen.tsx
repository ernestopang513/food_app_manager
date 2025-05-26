
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../routes/RootStackNavigation";
import { AuthRootStackParams } from "../../routes/auth/AuthStackNavigation";
import { API_URL, STAGE } from "@env";

interface Props extends StackScreenProps<AuthRootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {

  const {height } = useWindowDimensions();

  console.log({apiUrl: API_URL, stage: STAGE})

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30 }}>
          <Text category="h1" >Crear cuenta</Text>
          <Text category="p2" >Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{marginTop: 20}}>
         
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<Icon name="person-outline" />}
            style={{ marginBottom: 20}}
          />
         
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<Icon name="mail-outline" />}
            style={{ marginBottom: 20}}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={<Icon name="lock-closed-outline" />}
            style={{marginBottom: 10}}
          />

          <Layout style={{height: 20}} />

          <Layout>
            <Button
              accessoryRight={<Icon white name="arrow-forward-outline" />}
              onPress={() => console.log('Hola')}
            >
              Crear
            </Button>
          </Layout>

          {/* Información para crear cuenta */}

          <Layout style={{height: 50}} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'

          }}>
            <Text>¿Ya tienes cuenta?</Text>
            <Text 
              status="primary" 
              category="h5"
              onPress={() => navigation.goBack()}            
            >
              {' '}Ingresa{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>
    </Layout>
  )
}