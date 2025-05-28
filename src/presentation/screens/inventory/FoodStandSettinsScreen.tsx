import { Layout } from '@ui-kitten/components'
import { View, Text } from 'react-native'
import TopNavigationLayout from '../../layouts/TopNavigationLayout'
const FoodStandSettinsScreen = () => {
  return (

    <TopNavigationLayout
      title='Locales settings'
      subTitle='Control de inventario'
    >

      <Layout>
        <Text>FoodStandSettinsScreen</Text>
      </Layout>
    </TopNavigationLayout>
  )
}
export default FoodStandSettinsScreen