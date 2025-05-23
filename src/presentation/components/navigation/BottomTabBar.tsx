import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon, useTheme } from '@ui-kitten/components'




const BottomTabBar = ({navigation, state}: BottomTabBarProps) => {

  const theme =useTheme();

  return (

    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title={'Inventario'}
        icon={() => <Icon name='storefront-outline' style={{ height: 25 }} color={state.index === 0 ? theme['color-primary-500'] : theme['text-hint-color']} />}
      />
      <BottomNavigationTab
        title={'Pedidos'}
        icon={() => <Icon name='bicycle-outline' style={{ height: 25 }} color={state.index === 1 ? theme['color-primary-500'] : theme['text-hint-color']} />}
      />
      <BottomNavigationTab
        title={'Ajustes'}
        icon={() => <Icon name='cog-outline' style={{ height: 25 }} color={state.index === 2 ? theme['color-primary-500'] : theme['text-hint-color']} />}
      />
    </BottomNavigation>
  )
}

export default BottomTabBar

