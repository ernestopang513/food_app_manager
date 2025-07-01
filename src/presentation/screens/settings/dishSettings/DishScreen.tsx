import { View, Text, Pressable, ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamsDishSettings } from '../../../routes/settings/dishNav/DishSettingsStackNav';
import TopNavigationLayout from '../../../layouts/TopNavigationLayout';
import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '../../../store/ui/useUIStore';
import { getAllDishes } from '../../../../actions/dishes/get-all-dishes';
import { getDishById } from '../../../../actions/dishes/get-dish-by-id';
import { Dish } from '../../../../domain/entities/foodStand';
import SkeletonCard from '../../../components/ui/SkeletonCard';
import ErrorScreen from '../../../components/ui/ErrorScreen';
import { Formik } from 'formik';
import { DishSchema } from '../validations';
import { Button, Icon, Input, useTheme } from '@ui-kitten/components';
import { updateCreateDish } from '../../../../actions/dishes/update-create-dish';
import { deleteDishById } from '../../../../actions/dishes/delete-dish-by-id';
import { error } from '../../../../config/loggers/logger';
import NativeCustomModal from '../../../components/ui/NativeCustomModal';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

// export interface Dish {
//     id:          string;
//     price:       number;
//     name:        string;
//     description: string;
// }

const empyDish: Partial<Dish> = {
  name: 'Nuevo platillo',
  price: 60,
  description: 'Comida muy bien preparada'
}

interface Props extends StackScreenProps<StackParamsDishSettings, 'Dish'> { }

const DishScreen = ({ route, navigation }: Props) => {


  const dishIdRef = useRef(route.params.dishId)

  const queryClient = useQueryClient();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mutationError = useUIStore(state => state.mutationError);
  const setMutationError = useUIStore(state => state.setMutationError);

  const isNew = dishIdRef.current === 'new'

  const { data: dish, isLoading, isError, error } = useQuery({
    queryKey: ['dish', dishIdRef.current],
    queryFn: () => getDishById(dishIdRef.current),
    // queryFn: () => getDishById('A'),
    enabled: !isNew
  });


  const finalDish = isNew ? empyDish : (dish ?? empyDish)

  const updateCreateMutation = useMutation({
    mutationFn: (data: Partial<Dish>) => updateCreateDish({ ...data, id: finalDish.id }),
    onSuccess: (data: Dish) => {
      dishIdRef.current = data.id;
      queryClient.invalidateQueries({ queryKey: ['AllDishesSettings'] })
      queryClient.invalidateQueries({ queryKey: ['dish', dishIdRef.current] })
    },
    onError: (error) => {
      setMutationError(error.message ?? 'Error inesperado');
    }

  });

  const DeleteMutation = useMutation({
    mutationFn: () => {
      if (finalDish.id === undefined) throw new Error('Faltan parametros');
      return deleteDishById(finalDish.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['AllDishesSettings'] })
      setShowDeleteConfirm(false);
      navigation.goBack();
    },
    onError: (error) => {
      setShowDeleteConfirm(false);
      setMutationError(error.message ?? 'Error inesperado');
    }
  })


  if (isLoading) {
    return (
      <TopNavigationLayout
        title={'Cargando...'}

      >
        <View style={{ marginHorizontal: 20, flex: 1 }}>
          <SkeletonCard style={{ marginTop: 30 }} />
        </View>

      </TopNavigationLayout>
    )
  }

  if (isError) {
    return (
      <TopNavigationLayout
        title='Error'
      >
        <ErrorScreen message={error.message} />
      </TopNavigationLayout>
    )
  }




  return (

    <Formik
      initialValues={finalDish}
      enableReinitialize
      validationSchema={DishSchema}
      onSubmit={(values) => {
        updateCreateMutation.mutate(values)
      }}
    >
      {
        ({ handleChange, handleSubmit, values, touched, errors }) => (
          <TopNavigationLayout
            title={values.name ?? 'Algo salio mal'}
            renderRightAction={isNew ? undefined : () => <Delete deleteFunction={setShowDeleteConfirm} />}
          >

            <ScrollView
              keyboardShouldPersistTaps='handled'

              contentContainerStyle={{
                paddingHorizontal: 20,
                // backgroundColor: 'blue'
              }}
            >
              <View>
                <Input
                  label={'Nombre'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  style={{ marginVertical: 10 }}
                  status={touched.name && errors.name ? 'danger' : 'basic'}
                  caption={touched.name && errors.name}
                />
                <Input
                  label={'Precio'}
                  value={values.price?.toString()}
                  onChangeText={handleChange('price')}
                  style={{ marginVertical: 10 }}
                  status={touched.price && errors.price ? 'danger' : 'basic'}
                  caption={touched.price && errors.price}
                />
                <Input
                  label={'Descripción'}
                  value={values.description}
                  multiline
                  onChangeText={handleChange('description')}
                  style={{ marginVertical: 10 }}
                  status={touched.description && errors.description ? 'danger' : 'basic'}
                  caption={touched.description && errors.description}
                  numberOfLines={5}
                />
              </View>

              <Button
                accessoryLeft={() => <Icon name='save-outline' color={'white'} size={35} />}
                style={{ marginTop: 20 }}
                disabled={updateCreateMutation.isPending}
                onPress={() => handleSubmit()}
              >
                Guardar
              </Button>

            </ScrollView>

            <NativeCustomModal
              visible={!!mutationError}
              title='Error'
              message={mutationError}
              loading={updateCreateMutation.isPending}
              disabled={updateCreateMutation.isPending}
              disabledBackdrop={false}
              onClose={() => {
                setMutationError(undefined);
              }}
            />

            {
              showDeleteConfirm &&
              <ConfirmationModal
                onAccepted={() => DeleteMutation.mutate()}
                onCancel={() => { setShowDeleteConfirm(false) }}
              />
            }

          </TopNavigationLayout>

        )

      }
    </Formik>
  )
}
export default DishScreen

export const Delete = ({ deleteFunction }: { deleteFunction: (state: boolean) => void }) => {
  const theme = useTheme();
  return (

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
        color={theme['color-danger-500']}

      />
      {/* <Text appearance='hint' category="label">Eliminar</Text> */}
    </Pressable>
  )
}


