
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../routes/RootStackNavigation";
import { AuthRootStackParams } from "../../routes/auth/AuthStackNavigation";
import { API_URL, STAGE } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "../../store/ui/useUIStore";
import { createAdmin } from "../../../actions/settings/create-admin";
import { SuperUser } from "../settings/adminSettings/CreateAdminScreen";
import { Formik } from "formik";
import { SuperUserSchema } from "../settings/validations";
import NativeCustomModal from "../../components/ui/NativeCustomModal";

interface Props extends StackScreenProps<AuthRootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  const queryClient = useQueryClient();

  const mutationError = useUIStore(state => state.mutationError);
  const setMutationError = useUIStore(state => state.setMutationError);

  const createAdminMutation = useMutation({
    mutationFn: (data: SuperUser) => createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      navigation.goBack();
    },
    onError: (error) => {
      setMutationError(error.message ?? 'Error inesperado');
    }

  })


  console.log({ apiUrl: API_URL, stage: STAGE })

  return (

    <Formik
      initialValues={{
        fullName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        adminKey: ''
      }}
      validationSchema={SuperUserSchema}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values)
        createAdminMutation.mutate(values)
      }}
    >
      {

        ({ values, handleChange, handleSubmit, touched, errors }) => (


          <Layout style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 20, gap: 20, paddingTop: 30 }}
              keyboardShouldPersistTaps= 'handled'
            >
              {/* <Layout style={{ paddingTop: height * 0.30 }}> */}
              <Layout >
                <Text category="h1" >Crear cuenta</Text>
                <Text category="p2" >Por favor, crea una cuenta para continuar</Text>
              </Layout>

              {/* <Layout style={{ marginTop: 20 }}> */}

              <Input
                placeholder="Nombre completo"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                accessoryLeft={<Icon name="person-outline" />}
                status={touched.fullName && errors.fullName ? 'danger' : 'basic'}
                caption={touched.fullName && errors.fullName}
              />

              <Input
                placeholder="UserName"
                value={values.userName}
                onChangeText={handleChange('userName')}
                accessoryLeft={<Icon name="person-outline" />}
                status={touched.userName && errors.userName ? 'danger' : 'basic'}
                caption={touched.userName && errors.userName}
              />

              <Input
                placeholder="Correo electrónico"
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                accessoryLeft={<Icon name="mail-outline" />}
                onChangeText={handleChange('email')}
                status={touched.email && errors.email ? 'danger' : 'basic'}
                caption={touched.email && errors.email}
              />

              <Input
                placeholder="Contraseña"
                autoCapitalize="none"
                secureTextEntry
                accessoryLeft={<Icon name="lock-closed-outline" />}
                value={values.password}
                onChangeText={handleChange('password')}
                status={touched.password && errors.password ? 'danger' : 'basic'}
                caption={touched.password && errors.password}
              />
              <Input
                placeholder="Contraseña"
                autoCapitalize="none"
                secureTextEntry
                accessoryLeft={<Icon name="lock-closed-outline" />}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                status={touched.confirmPassword && errors.confirmPassword ? 'danger' : 'basic'}
                caption={touched.confirmPassword && errors.confirmPassword}
              />

              <Input
                placeholder="Contraseña especial"
                autoCapitalize="none"
                secureTextEntry
                accessoryLeft={<Icon name="lock-closed-outline" />}
                value={values.adminKey}
                onChangeText={handleChange('adminKey')}
                status={touched.adminKey && errors.adminKey ? 'danger' : 'basic'}
                caption={touched.adminKey && errors.adminKey}
              />

              <Layout style={{ height: 20 }} />

              <Layout>
                <Button
                  accessoryLeft={() => <Icon white name="save-outline" style={{ height: 25 }} />}
                  onPress={() => {
                    // console.log('da crear')
                    // console.log(values)
                    handleSubmit()
                  }}
                >
                  Crear
                </Button>
              </Layout>

              {/* Información para crear cuenta */}

              <Layout style={{ height: 50 }} />

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

              {/* </Layout> */}

              <NativeCustomModal
              visible={!!mutationError}
              title='Error'
              message={mutationError}
              disabledBackdrop={false}
              onClose={() => {
                setMutationError(undefined);
              }}
                  />

            </ScrollView>
          </Layout>
        )
      }
    </Formik>
  )
}