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


//     const RenderRightAction = () => {
//         const showOnRoutes = ['FoodStandsScreen', 'SettingsScreen'];
//         const shouldShow = showOnRoutes.includes(currentRouteName) && isFocused;

//         if (!shouldShow || !rightAction || !rightActionIcon) return null;
//         if(currentRouteName === 'FoodStandsScreen'){

//             return (
//                 <Pressable
//                 onPress={rightAction}
//                 style={({ pressed }) => ({
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     paddingHorizontal: 10,
//                     opacity: pressed ? 0.5 : 1,
//                 })}
//                 >
//                 <Icon
//                     style={{ width: 24, height: 24 }}
//                     name={rightActionIcon}
                    
//                     />
//                 <Text category="label">Abrir/Cerrar</Text>
//             </Pressable>
//         );

//     };
// };


  return (
    <Layout style={{flex: 1}}>
        <TopNavigation
            // title={title}
            title={() => (
                <Text category='h4'>{title}</Text>
            )}
            subtitle={subTitle}
            alignment='center'
            accessoryLeft={   !isRootScreen ? renderBackAction: undefined}
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