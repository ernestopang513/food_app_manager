import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { StackParamsDPSettings } from '../../../routes/settings/deliveryPointNav/DeliveryPStackNav'
import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUIStore } from '../../../store/ui/useUIStore'
import { getDeliveryPointById } from '../../../../actions/deliveryPoints/get-deliveryPoint-by-id'
import { updateCreateDeliveryPoint } from '../../../../actions/deliveryPoints/update-create-deliveryPoint'
import { deleteDeliveryPointById } from '../../../../actions/deliveryPoints/delete-delivery-point-by-id'
import { DeliveryPoint } from '../../../../domain/entities/deliveryPoint'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { Formik } from 'formik'
import { DeliveryPointSchema } from '../validations'
import { Button, Icon, Input, Layout, useTheme } from '@ui-kitten/components'
import CustomToggle from '../../../components/ui/CustomToggle'
import { Delete } from '../dishSettings/DishScreen'
import NativeCustomModal from '../../../components/ui/NativeCustomModal'
import ConfirmationModal from '../../../components/ui/ConfirmationModal'

const empyDeliveryPoint: Partial<DeliveryPoint> = {
    id: 'new',
    name: 'Punto de entrega',
    latitude: 0,
    longitude: 0,
    is_active: true
}

interface Props extends StackScreenProps<StackParamsDPSettings, 'DeliveryPointScreen'> { }

const DeliveryPointSettingsScreen = ({ route, navigation }: Props) => {

    const deliveryPointIdRef = useRef(route.params.deliveryPId);

    const queryClient = useQueryClient();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const mutationError = useUIStore(state => state.mutationError);
    const setMutationError = useUIStore(state => state.setMutationError);

    const isNew = deliveryPointIdRef.current === 'new'

    const theme = useTheme();

    const { data: deliveryPoint, isLoading, isError, error } = useQuery({
        queryKey: ['deliveryPoint', deliveryPointIdRef.current],
        queryFn: () => getDeliveryPointById(deliveryPointIdRef.current),
        enabled: !isNew
    });

    const finalDeliveryPoint = isNew ? empyDeliveryPoint : (deliveryPoint ?? empyDeliveryPoint)

    const updateCreateMutation = useMutation({
        mutationFn: (data: Partial<DeliveryPoint>) => updateCreateDeliveryPoint({ ...data, id: finalDeliveryPoint.id }),
        onSuccess: (data: DeliveryPoint) => {
            deliveryPointIdRef.current = data.id;
            queryClient.invalidateQueries({ queryKey: ['AllDeliveryPointsSettings'] })
            queryClient.invalidateQueries({ queryKey: ['deliveryPoint', deliveryPointIdRef.current] })
        },
        onError: (error) => {
            setMutationError(error.message ?? 'Error inesperado');
        }
    });

    const DeleteMutation = useMutation({
        mutationFn: () => {
            if (finalDeliveryPoint.id === undefined) throw new Error('Faltan parametros');
            return deleteDeliveryPointById(finalDeliveryPoint.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['AllDeliveryPointsSettings'] })
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
            initialValues={finalDeliveryPoint}
            enableReinitialize
            validationSchema={DeliveryPointSchema}
            onSubmit={(values) => {
                updateCreateMutation.mutate(values);
            }}
        >

            {
                ({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
                    <TopNavigationLayout
                        title={values.name ?? 'Algo salio mal'}
                        renderRightAction={isNew? undefined: () => <Delete deleteFunction={setShowDeleteConfirm} />}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 20
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
                                    label={'Latitud'}
                                    value={values.latitude?.toString()}
                                    onChangeText={handleChange('latitude')}
                                    style={{ marginVertical: 10 }}
                                    status={touched.latitude && errors.latitude ? 'danger' : 'basic'}
                                    caption={touched.latitude && errors.latitude}
                                />
                                <Input
                                    label={'Longitud'}
                                    value={values.longitude?.toString()}
                                    onChangeText={handleChange('longitude')}
                                    style={{ marginVertical: 10 }}
                                    status={touched.longitude && errors.longitude ? 'danger' : 'basic'}
                                    caption={touched.longitude && errors.longitude}
                                />

                                {/* <Layout style={{ alignItems: 'center', justifyContent: 'center' }}> */}
                                <Layout style={{
                                    alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'transparent', marginVertical: 10, borderWidth: 1, padding: 10,
                                    borderColor: 'rgba(51, 102, 255, 0.12)',
                                    borderRadius: 20
                                }}>

                                    <Text >Estado:</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 120 }}>


                                        <CustomToggle
                                            isOn={values.is_active!}
                                            onToggle={(newValue) => setFieldValue('is_active', newValue)}
                                            activeColor={theme['color-primary-500']}
                                        />

                                        <Text >

                                            {
                                                values.is_active
                                                    ? 'Activo'
                                                    : 'Inactivo'
                                            }

                                        </Text>
                                    </View>

                                </Layout>

                                <Button
                                    accessoryLeft={() => <Icon name='save-outline' color={'white'} size={35} />}
                                    style={{ marginTop: 20 }}
                                    disabled={updateCreateMutation.isPending}
                                    onPress={() => handleSubmit()}
                                >Guardar</Button>

                            </View>
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
export default DeliveryPointSettingsScreen
const styles = StyleSheet.create({})