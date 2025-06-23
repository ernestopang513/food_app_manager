
import { Icon,  Layout, useTheme } from '@ui-kitten/components';
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Separator from './Separator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackParamsSettings } from '../../routes/settings/SettingsStackNavigation';


interface Props {
    name: string;
    icon: string;
    component: keyof StackParamsSettings;
    isFirst?: boolean;
    isLast?: boolean;
}

const MenuItem = ({name, icon, component, isFirst = false , isLast = false} : Props) => {

    const theme = useTheme();
    const navigator = useNavigation<NavigationProp<StackParamsSettings>>();

  return (
    <>
      <Pressable
        onPress={() => navigator.navigate(component)}
        style = {({pressed}) => [
          {
            opacity: pressed ? 0.6 : 1,
          }
        ]}
      >
        <Layout
            style= {{
                ...styles.container,
                ...(isFirst && {borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10}),
                ...(isLast && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBlock: 10}),
                backgroundColor: theme['color-primary-100'],
            }}
        >   
            <Icon name={icon as any} style = {{marginRight: 10, height: 30}} />
            <Text>{name}</Text>
            <View style={{flex:1, alignItems: 'flex-end'}} >
            <Icon name={'chevron-forward-outline'} color = {theme['color-primary-500']} style={{marginLeft: 'auto', height: 25}} /> 
            </View>
        </Layout>
      </Pressable>

      {!isLast && <Separator/>}
    </>
  )
}
export default MenuItem


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})