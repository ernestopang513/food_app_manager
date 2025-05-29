import { Button, Layout, Text } from '@ui-kitten/components';

interface Props {
    title: string;
    message: string;
    onRetry?: () => void;
}


const NoticeScreen = ({title, message, onRetry}: Props) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16}} >
      <Text  category='h1' status='warning'  >{title}</Text>
      <Text  category='s1'   >{message}</Text>

        {onRetry && (
            <Button onPress={onRetry}>Retry</Button>
        )}

    </Layout>
  )
}
export default NoticeScreen