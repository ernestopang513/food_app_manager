import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { getAllAdmins } from '../../../../actions/settings/get-all-admins'
import TopNavigationLayout from '../../../layouts/TopNavigationLayout'
import SkeletonCard from '../../../components/ui/SkeletonCard'
import ErrorScreen from '../../../components/ui/ErrorScreen'
import NoticeScreen from '../../../components/ui/NoticeScreen'
import { Icon } from '@ui-kitten/components'
import { deleteSuperUserById } from '../../../../actions/settings/delete-admin-by-id'
import { useUIStore } from '../../../store/ui/useUIStore'
import NativeCustomModal from '../../../components/ui/NativeCustomModal'
import { useState } from 'react'
import ConfirmationModal from '../../../components/ui/ConfirmationModal'
import { StackParamsSettings } from '../../../routes/settings/SettingsStackNavigation'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../../store/auth/useAuthStore'
const AllAdminScreen = () => {

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [adminId, setAdminId] = useState('');
    const mutationError = useUIStore(state => state.mutationError);
    const setMutationError = useUIStore(state => state.setMutationError);
    const userId = useAuthStore(state => state.user?.id);
    const queryClient = useQueryClient();

    const { data: admins, isLoading, isError, error } = useQuery({
        queryKey: ['admins'],
        queryFn: getAllAdmins,
    })

    const deleteAdminMutation = useMutation({
        mutationFn: (adminId: string) => deleteSuperUserById(adminId === userId ? '' : adminId ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
            setShowDeleteConfirm(false);

        },
        onError: (error) => {
            setShowDeleteConfirm(false);
            setMutationError(error.message ?? 'Error inesperado');
        }
    })


    return (
        <TopNavigationLayout
            title='Administradores'
            renderRightAction={Add}
        >
            {
                isLoading &&
                <View style={{ marginHorizontal: 20, flex: 1, paddingTop: 20 }} >
                    <SkeletonCard />
                </View>
            }



            {
                !admins && !isLoading && isError &&
                <ErrorScreen message={error.message ?? 'Error inesperado'} />
            }

            {
                !isLoading && !isError && !!admins &&
                <FlatList
                    data={admins}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, gap: 30, paddingBottom: 120 }}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.card,

                        ]}>

                            <View style={styles.header} >
                                <Text style={styles.headerText} >{item.fullName}</Text>
                                <Pressable
                                    onLongPress={() => { 
                                        setAdminId(item.id);
                                        setShowDeleteConfirm(true);
                                    }}
                                    // onLongPress={() => { console.log('first')}}
                                    style={({ pressed }) => [
                                        { opacity: pressed ? 0.5 : 1 }
                                    ]}
                                >
                                    <Icon color={'red'} name='trash-outline' style={{ height: 30 }} />
                                </Pressable>

                            </View>

                            <View style={styles.viewInfo} >
                                <Text>Email: </Text>
                                <Text>{item?.email}</Text>
                            </View>
                            <View style={styles.viewInfo} >
                                <Text>Rol: </Text>
                                <Text>{item?.role}</Text>
                            </View>

                        </View>
                    )}
                    ListEmptyComponent={
                        <NoticeScreen title={'Sin platillos asociados'} message={'Puedes agregar alguno!'} />
                    }
                />

            }
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



             {
                    showDeleteConfirm &&
                    <ConfirmationModal
                      onAccepted={() => deleteAdminMutation.mutate(adminId)}
                      onCancel={() => { 
                        setShowDeleteConfirm(false) ;
                        setAdminId('');
                    }}
                    />
                  }
        </TopNavigationLayout>
    )
}
export default AllAdminScreen


const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        borderWidth: 1,
        borderLeftColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderRightColor: 'rgba(0,0,0,0.1)',
        borderTopColor: 'rgba(0,0,0,0.1)',
        // borderColor: 'rgba(0,0,0,0.07)'
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

const Add = () => {
  const navigation = useNavigation<NavigationProp<StackParamsSettings>>();
  return(

    <Pressable
      onPress={() => navigation.navigate('CreateAdminScreen')}
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