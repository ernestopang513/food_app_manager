import React from 'react';
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  disabledBackdrop?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const NativeCustomModal= ({
  visible,
  title = 'Procesando',
  message,
  loading = false,
  disabledBackdrop = true,
  disabled = false,
  onClose,
  children,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={styles.backdrop}
        onPress={disabledBackdrop ? undefined : onClose}
      >
        <TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          {loading && <ActivityIndicator size="large" style={styles.spinner} />}
          
          <Text style={styles.title}>{title}</Text>
          
          {message && <Text style={styles.message}>{message}</Text>}

          {children}

          {onClose && (
              <TouchableOpacity
              onPress={onClose}
              disabled={disabled}
              style={[
                  styles.closeButton,
                  disabled && { opacity: 0.5 },
                ]}
                >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          )}
        </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default NativeCustomModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
    maxWidth: '80%',
  },
  spinner: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff3d3d',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
