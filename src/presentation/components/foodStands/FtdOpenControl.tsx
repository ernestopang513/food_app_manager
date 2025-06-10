import { Icon,  Layout, Text, useTheme } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Separator from '../settings/Separator';
import CustomToggle from '../ui/CustomToggle';
import CustomToggle2 from '../ui/CustomToggle2';


interface Props {
    name: string;
    icon?: string;
    isOpen: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    state: boolean;
    onToggle: (newValue: boolean) => void
}

const FtdOpenControl = ({name, icon = 'storefront-outline', isFirst = false , isLast = false, state, isOpen, onToggle} : Props) => {

    const theme = useTheme();
    // const navigator = useNavigation<any>();
  return (
    <>

        <Layout
            style= {{
                ...styles.container,
                ...(isFirst && {borderTopLeftRadius: 10, borderTopRightRadius: 10, }),
                ...(isLast && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}),
                backgroundColor: theme['color-primary-100'],
                // borderRadius: 10
            }}
        >   
            <Icon name={icon as any} style = {{marginRight: 10, height: 30}} />
            <Text category='h6'>{name}</Text>
            <View style={{flex:1, alignItems: 'flex-end'}} >
            <CustomToggle2
                isOn={isOpen}
                disabled= {!state}
                activeColor={theme['color-primary-500']}            
                onToggle={onToggle}
                duration={200}
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