import { ScrollView, Pressable } from 'react-native'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsFdSSettings } from '../../../routes/settings/foodStandNav/FdSettingsStackNav'
import { FoodStand } from '../../../../domain/entities/foodStand'
import { useRef, useState } from 'react'
import { getFoodStandByIdNoDishes } from '../../../../actions/foodStands/get-foodStand-by-id';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import SkeletonCard from '../../../components/ui/SkeletonCard';
import { Button, Icon, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { Formik } from 'formik'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import { FoodStandSchema } from './validations'
import { updateCreateFoodStand } from '../../../../actions/foodStands/update-create-foodStand'
import { log } from '../../../../config/loggers/logger'
import { deleteFoodStandById } from '../../../../actions/foodStands/delete-foodStand-by-id'
import { useUIStore } from '../../../store/ui/useUIStore'
import ConfirmationModal from '../../../components/ui/ConfirmationModal'
import NativeCustomModal from '../../../components/ui/NativeCustomModal'

const emptyFoodStand: Partial<FoodStand> = {
    name: 'Nuevo Local',
    location: 'En algun lugar de CU',
    latitude: 0,
    longitude: 0,
}

const FoodStandSettingsScreen = ({route, navigation}:StackScreenProps<StackParamsFdSSettings, 'FoodStand'>) => {

  const foodStandIdRef = useRef(route.params.foodStandId)
  const queryClient = useQueryClient();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const mutationError = useUIStore(state => state.mutationError);
  const setMutationError = useUIStore(state => state.setMutationError);

  const isNew = foodStandIdRef.current === 'new'
  
  const {data: foodStand, isLoading, isError, error} = useQuery({
    queryKey: ['foodStand', foodStandIdRef.current, 'settings'],
    queryFn: () => getFoodStandByIdNoDishes(foodStandIdRef.current),
    enabled: !isNew
  })
  
  const finalFoodStand = isNew? emptyFoodStand : (foodStand ?? emptyFoodStand)
  
  log(finalFoodStand.id, 'linea 41')
  const mutation = useMutation({
    mutationFn: (data: Partial<FoodStand>) => updateCreateFoodStand({...data, id: finalFoodStand.id}),
    onSuccess: (data: FoodStand) => {
      foodStandIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['foodStand', foodStandIdRef.current, 'settings']})
      queryClient.invalidateQueries({queryKey: ['foodStandsSettings']})
    },
    onError: (error) => {
      setMutationError(error.message ?? 'Error inesperado')
    }
  })

  const DeleteMutation = useMutation({
    mutationFn: () => {
      if(finalFoodStand.id === undefined) throw new Error('Faltan parametros')
      return deleteFoodStandById(finalFoodStand.id)},
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['foodStandsSettings']})
      log('Success')
      setShowDeleteConfirm(false);
      navigation.goBack();
    },
    onError: (error) => {
      setShowDeleteConfirm(false);
      setMutationError(error.message ?? 'Error inesperado');
    } ,
  })
  
  if(isLoading) {
    return (
      <TopNavigationLayout
        title={isNew? 'Nuevo local' : 'Cargando...'}
      >
        <Layout style = {{marginHorizontal: 20, flex: 1}} >
          <SkeletonCard style={{marginTop: 30}}/>
        </Layout>
      </TopNavigationLayout>
    )
  }

  if(isError) {
    return (
      <TopNavigationLayout
        title={"Error"}
      >
        <ErrorScreen message={error.message}/>
      </TopNavigationLayout>
    )
  }

  return (

    <Formik
      initialValues={finalFoodStand}
      validationSchema={FoodStandSchema}
      enableReinitialize
      onSubmit={(values)=>{
        mutation.mutate(values)
        console.log('formulario válido y enviado', values)
      }}
    >
      {
        ({handleChange, handleSubmit, values, touched, errors}) => (

        <TopNavigationLayout
          // title={finalFoodStand?.name ?? ''}
          title={values.name ?? ''}
          renderRightAction={isNew ? undefined : () => <Delete deleteFunction={setShowDeleteConfirm}/>}
        >
          <Layout
            style={{ marginHorizontal: 20, flex: 1 }}
          >

            
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'
            >

              <Layout>
                <Input
                  label={"Nombre"}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  style={{ marginVertical: 5 }}
                  status={touched.name && errors.name ? 'danger' : 'basic'}
                  caption={touched.name && errors.name}

                />
                <Input
                  label={"Locación"}
                  value={values.location}
                  onChangeText={handleChange('location')}
                  style={{ marginVertical: 5 }}
                  status={touched.location && errors.location ? 'danger' : 'basic'}
                  caption={touched.location && errors.location}
                />
                <Input
                  label={"Latitud"}
                  value={values.latitude?.toString()}
                  onChangeText={handleChange('latitude')}
                  style={{ marginVertical: 5 }}
                  status={touched.latitude && errors.latitude ? 'danger' : 'basic'}
                  caption={touched.latitude && errors.latitude}
                />
                <Input
                  label={"Longitud"}
                  value={values.longitude?.toString()}
                  onChangeText={handleChange('longitude')}
                  style={{ marginVertical: 5 }}
                  status={touched.longitude && errors.longitude ? 'danger' : 'basic'}
                  caption={touched.longitude && errors.longitude}
                />
              </Layout>

              <Button
                accessoryLeft={() => <Icon name='save-outline' color={'white'} size={35} />}
                style={{ marginTop: 20 }}
                disabled = {mutation.isPending}
                onPress={() => handleSubmit()}
              >
                Guardar
              </Button>

              <Text>{JSON.stringify(finalFoodStand, null, 2)}</Text>
            </ScrollView>

          </Layout>

          <NativeCustomModal
            visible = {!!mutationError}
            title='Error'
            message={mutationError}
            loading = {mutation.isPending}
            disabled = {mutation.isPending}
            disabledBackdrop = {false}
            onClose={() => {
              setMutationError(undefined);
            }}
          />

          {
            showDeleteConfirm &&
            <ConfirmationModal
              onAccepted={() => DeleteMutation.mutate()}
              onCancel={() => {setShowDeleteConfirm(false)}}
            />

          }

        </TopNavigationLayout>
        )

      }
    </Formik>
  )
}
export default FoodStandSettingsScreen

const Delete = ({deleteFunction}:{ deleteFunction: (state: boolean) => void}) => {
  const theme = useTheme();
  return(

    <Pressable
      onLongPress={() => deleteFunction?.(true)}
    //   onPress={() => {}}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon
        style={{ height: 24 }}
        name={'trash'}
        color ={theme['color-danger-500']}

      />
      {/* <Text appearance='hint' category="label">Eliminar</Text> */}
    </Pressable>
  )
}