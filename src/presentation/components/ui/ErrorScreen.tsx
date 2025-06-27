import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";

interface Props {
  message?: string;
}


const ErrorScreen = ({message = 'Error inesperado'}: Props) => {
  const theme = useTheme()
  return (
    <Layout style = {{flex: 1, justifyContent: 'center', paddingHorizontal: 20, alignItems: 'center' }} >
      <Text numberOfLines={5} category='h4' status='danger' >{message}</Text>
      <Icon name='bug-outline' style = {{height: 50, marginTop: 10}} color = {theme['color-danger-500']}  />
    </Layout>
  )
}

export default ErrorScreen