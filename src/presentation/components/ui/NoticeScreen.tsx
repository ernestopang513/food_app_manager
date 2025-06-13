import { Button, Layout, Text } from '@ui-kitten/components';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    title: string;
    message: string;
    onRetry?: () => void;
}


const NoticeScreen = ({title, message, onRetry, style}: Props) => {
  return (
    <Layout style={[{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16}, style]} >
      <Text  category='h1' status='warning'  >{title}</Text>
      <Text  category='s1'  style ={{marginTop: 20}} >{message}</Text>

        {onRetry && (
            <Button onPress={onRetry}>Retry</Button>
        )}

    </Layout>
  )
}
export default NoticeScreen