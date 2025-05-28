import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { View, Text } from 'react-native'

interface Props {
    title: string;
    subTitle: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children?: React.ReactNode;
}



const TopNavigationLayout = ({
    title,
    subTitle,
    children,
    rightAction,
    rightActionIcon
}: Props) => {

    const {goBack}= useNavigation();

    const index = useNavigationState(state => state.index);
    const isRootScreen = index === 0

    const renderBackAction = () => (
        <TopNavigationAction
            icon = {<Icon name='arrow-back-outline' />}
            onPress={goBack}
        />
    )

    const RenderRightAction = () => {
        if (rightAction === undefined || rightActionIcon === undefined) return null;

        return (
            <TopNavigationAction
                onPress={ rightAction }
                icon={<Icon name={rightActionIcon}/>}
            />
        )
    }



  return (
    <Layout>
        <TopNavigation
            title={title}
            subtitle={subTitle}
            alignment='center'
            accessoryLeft={   !isRootScreen ? renderBackAction: undefined}
        />
        <Divider/>

        <Layout style = {{flex: 1}}>
            {children}
        </Layout>
    </Layout>
  )
}
export default TopNavigationLayout