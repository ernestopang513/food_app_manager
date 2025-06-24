import { View, Text, ScrollView } from 'react-native'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamsFdSSettings } from '../../../routes/settings/foodStandNav/FdSettingsStackNav'
import { FoodStand } from '../../../../domain/entities/foodStand'
import { useRef } from 'react'
import { getFoodStandById, getFoodStandByIdNoDishes } from '../../../../actions/foodStands/get-foodStand-by-id';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import SkeletonCard from '../../../components/ui/SkeletonCard';
import { Button, Input, Layout } from '@ui-kitten/components'
import Icon from '@react-native-vector-icons/ionicons'
import { Formik } from 'formik'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import { FoodStandSchema } from './validations'
import { updateCreateFoodStand } from '../../../../actions/foodStands/update-create-foodStand'
import { log } from '../../../../config/loggers/logger'

const emptyFoodStand: Partial<FoodStand> = {
    name: 'Nuevo Local',
    location: 'En algun lugar de CU',
    latitude: 0,
    longitude: 0,
}

const FoodStandSettingsScreen = ({route}:StackScreenProps<StackParamsFdSSettings, 'FoodStand'>) => {

  const foodStandId = useRef(route.params.foodStandId)
  const queryClient = useQueryClient();

  const isNew = foodStandId.current === 'new'
  
  const {data: foodStand, isLoading, isError, error} = useQuery({
    queryKey: ['foodStand', foodStandId.current, 'settings'],
    queryFn: () => getFoodStandByIdNoDishes(foodStandId.current),
    enabled: !isNew
  })
  
  const finalFoodStand = isNew? emptyFoodStand : (foodStand ?? emptyFoodStand)
  

  const mutation = useMutation({
    mutationFn: (data: Partial<FoodStand>) => updateCreateFoodStand({...data, id: finalFoodStand.id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['foodStand', foodStandId.current, 'settings']})
      queryClient.invalidateQueries({queryKey: ['foodStandsSettings']})
      log('Success')
    }
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
        ({handleChange, handleSubmit, values, setFieldTouched, touched, errors}) => (

        <TopNavigationLayout
          title={finalFoodStand?.name ?? ''}
        >
          <Layout
            style={{ marginHorizontal: 20, flex: 1 }}
          >

            
            <ScrollView
              showsVerticalScrollIndicator={false}
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
                onPress={() => handleSubmit()}
              >
                Guardar
              </Button>

              <Text>{JSON.stringify(finalFoodStand, null, 2)}</Text>
            </ScrollView>

          </Layout>


        </TopNavigationLayout>
        )

      }
    </Formik>
  )
}
export default FoodStandSettingsScreen