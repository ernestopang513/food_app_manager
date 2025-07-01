import { StackScreenProps } from '@react-navigation/stack'
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { StackParamsFoodStandDish } from '../../../routes/settings/foodStandDishNav/fdDishSettisgStackNav'
import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUIStore } from '../../../store/ui/useUIStore'
import { getFilterFoodStandById, getFoodStandById } from '../../../../actions/foodStands/get-foodStand-by-id'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import { Button, Icon } from '@ui-kitten/components'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import { useModal } from '../../../hooks/useModal'
import { getAllDishes } from '../../../../actions/dishes/get-all-dishes'
import DishCard from '../../../components/settings/dishSettings/DishCard'
import { createFoodStandDish } from '../../../../actions/fdDish/create-food-stand-dish'
import NativeCustomModal from '../../../components/ui/NativeCustomModal'
import { deleteFoodStandDishById } from '../../../../actions/fdDish/delete-food-stand-dish-by-id'



interface Props extends StackScreenProps<StackParamsFoodStandDish, 'Dishes'> { }

const DishesScreen = ({ route }: Props) => {

    const foodStandIdRef = useRef(route.params.foodStandId);

    const queryClient = useQueryClient();

    const { visible, openModal, closeModal } = useModal();

    const [selectedDish, setSelectedDish] = useState<string>('');

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const mutationError = useUIStore(state => state.mutationError);
    const setMutationError = useUIStore(state => state.setMutationError);

    const { data: foodStand, isLoading, isError, error } = useQuery({
        queryKey: ['foodStandDish', foodStandIdRef.current],
        queryFn: () => getFoodStandById(foodStandIdRef.current)
    })

    const dishes = useQuery({
        queryKey: ['AllDishesSettings'],
        queryFn: getAllDishes
    })

    //* addDishMutation

    const addDishMutation = useMutation({
        mutationFn: () => createFoodStandDish(foodStandIdRef.current, selectedDish),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodStandDish', foodStandIdRef.current] });
            queryClient.invalidateQueries({ queryKey: ['foodStandsSettings'] });
            setSelectedDish('');

        },
        onError: (error) => {
            setMutationError(error.message ?? 'Error inesperado');
            setSelectedDish('');
        }
    })


    const deleteDishMutation = useMutation({
        mutationFn: (fdDishId: string) => deleteFoodStandDishById(fdDishId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['foodStandDish', foodStandIdRef.current] });
            queryClient.invalidateQueries({ queryKey: ['foodStandsSettings'] });
        },
        onError: (error) => {
            setMutationError(error.message ?? 'Error inesperado');
        }
    })

    return (
        <TopNavigationLayout
            title={foodStand?.name ?? 'Error inesperado'}
            subTitle='Platillos'
            renderRightAction={() => <Add openModal={openModal} />}
        >

            {
                isLoading &&
                <View style={{ marginHorizontal: 20, flex: 1, paddingTop: 20 }} >
                    <SkeletonCard />
                </View>
            }



            {
                !foodStand && !isLoading && isError &&
                <ErrorScreen message={error.message ?? 'Error inesperado'} />
            }

            {
                !isLoading && !isError && !!foodStand &&
                <FlatList
                    data={foodStand?.foodStandDishes!}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, gap: 30 }}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.card,
                            item.is_active ? styles.cardOpen : styles.cardClosed,
                        ]}>

                            <View style={styles.header} >
                                <Text style={styles.headerText} >{item.dish.name}</Text>
                                <Pressable
                                    onLongPress={() => deleteDishMutation.mutate(item.id)}
                                    style = {({pressed}) => [
                                        {opacity: pressed? 0.5: 1}
                                    ]}
                                >
                                    <Icon name = 'trash-outline' style = {{height: 30}} />
                                </Pressable>
                                
                            </View>

                            <View style={styles.viewInfo} >
                                <Text>Cantidad: </Text>
                                <Text>{item.quantity}</Text>
                            </View>
                            <View style={styles.viewInfo} >
                                <Text>Estado: </Text>
                                <Text>{item.is_active ? 'Activo' : 'Inactivo'}</Text>
                            </View>

                        </View>
                    )}
                    ListEmptyComponent={
                        <NoticeScreen title={'Sin platillos asociados'} message={'Puedes agregar alguno!'} />
                    }
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle = {{height: 40}}
                />

            }
            {/* <Text>{JSON.stringify(foodStand, null, 2)}</Text> */}

            <Modal
                visible={visible}
                animationType='slide'
                transparent
                statusBarTranslucent
                onRequestClose={() => {
                    setSelectedDish('')
                    closeModal();
                }}
            >
                <Pressable
                    style={styles.backDrop}
                    onPress={() => {
                        setSelectedDish('')
                        closeModal();

                    }}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>

                            <View style={{ justifyContent: 'space-between', flex: 1 }}>

                                <View>

                                    <FlatList
                                        style={{ height: '90%' }}
                                        data={dishes.data}
                                        ListHeaderComponent={
                                            <Text style={styles.modalHeader} >Platillos</Text>

                                        }
                                        // contentContainerStyle = {{ height: '40%'}}
                                        renderItem={({ item }) =>
                                            <DishCard dish={item} styleProp={selectedDish === item.id && styles.dishButtonSelected} onPress={() => setSelectedDish(item.id)} />
                                        }

                                    />



                                </View>


                                <Button
                                    accessoryRight={<Icon name='fast-food' style={{ height: 20 }}
                                        white />}
                                    disabled={selectedDish === ''}
                                    onPress={() => {
                                        closeModal();
                                        addDishMutation.mutate();

                                    }}
                                >
                                    Agregar
                                </Button>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>

            <NativeCustomModal
                visible={!!mutationError}
                title='Error'
                message={mutationError}
                // loading={updateCreateMutation.isPending}
                // disabled={updateCreateMutation.isPending}
                disabledBackdrop={false}
                onClose={() => {
                    setMutationError(undefined);
                }}
            />


        </TopNavigationLayout>
    )
}
export default DishesScreen

interface RightActionProps {
    openModal?: () => void;
}

const Add = ({ openModal }: RightActionProps) => {
    return (

        <Pressable
            onPress={() => openModal?.()}
            //   onPress={() => {}}
            style={({ pressed }) => ({
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                opacity: pressed ? 0.5 : 1,
            })}
        >
            <Icon
                style={{ height: 34 }}
                name={'add'}

            />
            {/* <Text category="label"></Text> */}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        borderWidth: 1,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.1)',
        // borderColor: 'rgba(0,0,0,0.07)'
    },
    cardOpen: {
        // borderLeftColor: '#00E096',
        borderTopColor: '#00E096',
        borderTopWidth: 4,
    },
    cardClosed: {
        borderTopWidth: 4,
        borderTopColor: '#FF3D71',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.07)',
        padding: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
        paddingVertical: 5
    },
    viewInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#F2F6FF',
        backgroundColor: 'white',
        marginTop: '20%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12
    },
    backDrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    dishButtonSelected: {
        backgroundColor: '#d1ffe1',
    },

})