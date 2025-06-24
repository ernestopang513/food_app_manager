import { useIsFocused, useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { ReactElement, ReactNode, useEffect } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';

interface Props {
    title: string;
    subTitle?: string;

    // rightAction?: () => void;
    // rightActionIcon?: string;
    renderRightAction?: () => React.ReactElement;

    children?: React.ReactNode;
}



const TopNavigationLayout = ({
    title,
    subTitle,
    children,
    renderRightAction,
}: Props) => {

    const {goBack}= useNavigation();

    const index = useNavigationState(state => state.index);
    const isRootScreen = index === 0

    const route = useRoute();
    const currentRouteName = route.name;
  
    const InvalidsRoutes = ['SettingsScreen', 'FoodStandsScreen']
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            console.log('Layout activo en:', currentRouteName);
        }
    }, [isFocused, currentRouteName]);

    const renderBackAction = () => (
        <TopNavigationAction
            icon = {<Icon name='arrow-back-outline' />}
            onPress={goBack}
        />
    )


  return (
    <Layout style={{flex: 1}}>
        <TopNavigation
            // title={title}
            title={() => (
                <Text category='h5'>{title}</Text>
            )}
            subtitle={subTitle}
            alignment='center'
            // accessoryLeft={   (currentRouteName !== 'SettingsScreen' && currentRouteName!== 'FoodStandsScreen') ? renderBackAction : undefined}
            accessoryLeft={   (!InvalidsRoutes.includes(currentRouteName)) ? renderBackAction : undefined}
            accessoryRight={renderRightAction}
        />
        <Divider/>

        <Layout style = {{flex: 1}}>
            {children}
        </Layout>
    </Layout>
  )
}
export default TopNavigationLayout