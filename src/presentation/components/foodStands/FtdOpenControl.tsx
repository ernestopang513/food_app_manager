
import { Icon,  Layout, useTheme } from '@ui-kitten/components';
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Separator from '../settings/Separator';
import CustomToggle from '../ui/CustomToggle';
import CustomToggle2 from '../ui/CustomToggle2';


interface Props {
    name: string;
    icon: string;
    component: string;
    isFirst?: boolean;
    isLast?: boolean;
    state: boolean;
}

const FtdOpenControl = ({name, icon, component, isFirst = false , isLast = false, state} : Props) => {

    const theme = useTheme();
    const navigator = useNavigation<any>();

  return (
    <>

        <Layout
            style= {{
                ...styles.container,
                // ...(isFirst && {borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10}),
                // ...(isLast && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBlock: 10}),
                backgroundColor: theme['color-primary-100'],
            }}
        >   
            <Icon name={icon as any} style = {{marginRight: 10, height: 30}} />
            <Text>{name}</Text>
            <View style={{flex:1, alignItems: 'flex-end'}} >
            <CustomToggle2
                isOn={true}
                disabled= {!state}
            />
            </View>
        </Layout>
      

      {!isLast && <Separator/>}
    </>
  )
}
export default FtdOpenControl


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 50,
    }
})