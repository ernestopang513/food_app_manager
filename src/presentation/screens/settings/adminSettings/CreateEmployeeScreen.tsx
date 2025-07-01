import { Button, Icon, Input, Layout } from '@ui-kitten/components'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { ScrollView, Text } from 'react-native'
import { Formik } from 'formik'
import { SuperUserSchema } from '../validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAdmin } from '../../../../actions/settings/create-admin'
import { useUIStore } from '../../../store/ui/useUIStore'
import NativeCustomModal from '../../../components/ui/NativeCustomModal'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsSettings } from '../../../routes/settings/SettingsStackNavigation'
import { SuperUser } from './CreateAdminScreen'
import { createEmployee } from '../../../../actions/settings/create-employee'



const empySuperUser: SuperUser = {
  fullName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  adminKey: ''
}

interface Props extends StackScreenProps<StackParamsSettings, 'CreateEmployeeScreen'> { }

const CreateEmployeeScreen = ({ navigation }: Props) => {

  const queryClient = useQueryClient();

  const mutationError = useUIStore(state => state.mutationError);
  const setMutationError = useUIStore(state => state.setMutationError);

  const createAdminMutation = useMutation({
    mutationFn: (data: SuperUser) => createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      navigation.goBack();
    },
    onError: (error) => {
      setMutationError(error.message ?? 'Error inesperado');
    }

  })


  return (
    // <Text>hola</Text>
    <Formik
      initialValues={empySuperUser}
      validationSchema={SuperUserSchema}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values)
        createAdminMutation.mutate(values)
      }}
    >
      {

        ({ values, handleChange, handleSubmit, touched, errors }) => {

          return (

            <TopNavigationLayout
              title='Creación de trabajador'
            >

              <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, gap: 30, paddingTop: 30 }}
                keyboardShouldPersistTaps='handled'

              >



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
              </ScrollView>

              <NativeCustomModal
                visible={!!mutationError}
                title='Error'
                message={mutationError}
                disabledBackdrop={false}
                onClose={() => {
                  setMutationError(undefined);
                }}
              />

            </TopNavigationLayout>

          )
        }
      }
    </Formik>


  )
}
export default CreateEmployeeScreen