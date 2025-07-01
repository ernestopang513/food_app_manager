import { Icon, Text, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Pressable } from 'react-native'
import Separator from '../settings/Separator';
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

const FoodStandController = ({ name, icon = 'storefront-outline', isFirst = false, isLast = false, disabled = false, isSelected, onChange }: Props) => {

    const theme = useTheme();
    return (
        <>

            <Pressable
                onPress={onChange}
                style={{
                    ...styles.container,
                    ...(isFirst && { borderTopLeftRadius: 10, borderTopRightRadius: 10, }),
                    ...(isLast && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }),
                    backgroundColor: theme['color-primary-100'],
                }}
            >
                <Icon name={icon as any} style={{ marginRight: 10, height: 30 }} />
                <Text category='h6'>{name}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }} >
                    <CustomRadio
                        selected={isSelected}
                        onPress={onChange}
                    />
                </View>
            </Pressable>


            {!isLast && <Separator />}
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