import { List } from '@ui-kitten/components';
import { FoodStandCard } from './FoodStandCard';
import { FoodStand } from '../../../domain/entities/foodStand';



const sucursales = [
    {
        nombre: 'Principal',
        platillo1: 3,
        platillo2: 3,
        platillo3: 3,
    },
    {
        nombre: 'Anexo',
        platillo1: 3,
        platillo2: 3,
        platillo3: 3,
    },
    {
        nombre: 'Anexo',
        platillo1: 3,
        platillo2: 3,
        platillo3: 3,
    },
    {
        nombre: 'Anexo',
        platillo1: 3,
        platillo2: 3,
        platillo3: 3,
    },
    {
        nombre: 'Anexo',
        platillo1: 3,
        platillo2: 3,
        platillo3: 3,
    },
    
]

interface Props {
    foodStands: FoodStand[]
}

const FoodStandsList = ({foodStands}: Props) => {
  return (
    <List
        data = {foodStands}
        keyExtractor={(item, index) => `${item.name}-${index}`}

        renderItem={({item}) => {
            return (
                <FoodStandCard foodStand = {item}/>
            )
        }}
    />
  )
}
export default FoodStandsList