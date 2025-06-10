import { Icon,  Layout, Radio, Text, useTheme } from '@ui-kitten/components';
import { View,  StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Separator from '../settings/Separator';
import CustomToggle from '../ui/CustomToggle';
import CustomToggle2 from '../ui/CustomToggle2';
import CustomRadio from '../ui/CustomRadio';



interface Props {
    name: string;
    icon?: string;
    isSelected: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    disabled?: boolean;
    onChange: () => void
}

const FoodStandController = ({name, icon = 'storefront-outline', isFirst = false , isLast = false, disabled = false, isSelected, onChange} : Props) => {

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
            {/* <CustomToggle2
                isOn={isOpen}
                disabled= {disabled}
                activeColor={theme['color-primary-500']}            
                onToggle={onToggle}
                duration={200}
                /> */}
                <CustomRadio
                    selected ={isSelected}
                    onPress={onChange}
                />
            </View>
        </Layout>
      

      {!isLast && <Separator/>}
    </>
  )
}
export default FoodStandController


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
    }
})