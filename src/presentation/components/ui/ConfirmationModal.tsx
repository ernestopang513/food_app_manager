import { Card, Layout, Spinner, Button, Text } from "@ui-kitten/components";
import { Modal, StyleSheet, useWindowDimensions, View } from "react-native"

interface Props {
    visible?: boolean;
    title?: string;
    loading?: string;
    message?: string;
    disabled?: boolean;
    onAccepted?: () => void;
    onCancel?: () => void;


}

const ConfirmationModal = ({visible = true, loading, title = "Requiere confirmación", message = "Acción irreversible", onAccepted, onCancel, disabled = false}: Props) => {

    const {height, width} = useWindowDimensions();

    return (
        <Modal
            visible = {visible}
            animationType="fade"
            transparent
            statusBarTranslucent
        >
            <Layout style ={{backgroundColor: 'rgba(0,0,0, 0.2)', flex: 1}}>

           <View style = {{ alignSelf: 'center', width: width * 0.7, marginVertical: height * 0.15}} >
                   <Layout style={styles.content}>
                     {loading && <Spinner size="large" style={{ marginBottom: 20 }} />}
           
                     <Text category="h6" style={{ marginBottom: 8, }}>
                       {title}
                     </Text>
           
                     {message && (
                         <Text style={{ marginBottom: 20 }} appearance="hint">
                         {message}
                       </Text>
                     )}
           
                     {/* {children} */}
           
                     {onAccepted && onCancel && (
                         <Layout style = {styles.buttonContent}>
                       <Button onPress={onAccepted} disabled={disabled} >
                         Confirmar
                       </Button>
                       <View style={{height: 20}}/>
                       <Button onPress={onCancel} disabled={disabled} status='danger' >
                         Cancelar
                       </Button>
                       </Layout>
                     )}
                   </Layout>
                 </View>
                     </Layout>
        </Modal>
    )
}

export default ConfirmationModal

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        borderRadius: 10
        
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
        
        
    }
})