import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";

interface Props {
  message?: string;
  onRetry?: () => void;
}


const ErrorScreen = ({message = 'Error inesperado', onRetry}: Props) => {
  const theme = useTheme()
  return (
    <Layout style = {{flex: 1, justifyContent: 'center', paddingHorizontal: 20, alignItems: 'center', gap: 20 }} >
      <Text numberOfLines={5} category='h3' >Error</Text>
      <Text numberOfLines={5} category='h5' status='danger' >{message}</Text>
      <Icon name='bug-outline' style = {{height: 50, marginTop: 10}} color = {theme['color-danger-500']}  />
      {
        onRetry && (
          <Button size='giant' onPress={onRetry} >Retry</Button>
        )
      }
    </Layout>
  )
}

export default ErrorScreen