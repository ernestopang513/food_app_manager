import React from 'react';
import { Modal, Card, Text, Button, Layout, Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<Props> = ({
  visible,
  title = 'Procesando',
  message,
  loading = false,
  disabled = false,
  onClose,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={!disabled ? onClose : undefined}
    >
      <Card disabled={true}>
        <Layout style={styles.content}>
          {loading && <Spinner size="large" style={{ marginBottom: 20 }} />}

          <Text category="h6" style={{ marginBottom: 8 }}>
            {title}
          </Text>

          {message && (
            <Text style={{ marginBottom: 20 }} appearance="hint">
              {message}
            </Text>
          )}

          {children}

          {onClose && !children && (
            <Button onPress={onClose} disabled={disabled}>
              Cerrar
            </Button>
          )}
        </Layout>
      </Card>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 35
  },
});
