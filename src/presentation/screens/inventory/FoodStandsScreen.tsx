


import { Layout, Text } from '@ui-kitten/components'
import FoodStandsList from '../../components/foodStands/FoodStandsList'
const FoodStandsScreen = () => {
  return (
    <Layout
        style = {{paddingHorizontal: 10, flex: 1}}
    >
      <Text category='h1' >Locales</Text>
      
      <FoodStandsList/>

    </Layout>
  )
}
export default FoodStandsScreen