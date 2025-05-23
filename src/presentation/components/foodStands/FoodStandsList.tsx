import { List } from '@ui-kitten/components';
import { FoodStandCard } from './FoodStandCard';



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


const FoodStandsList = () => {
  return (
    <List
        data = {sucursales}
        keyExtractor={(item, index) => `${item.nombre}-${index}`}

        renderItem={({item}) => {
            return (
                <FoodStandCard sucursal = {item}/>
            )
        }}
    />
  )
}
export default FoodStandsList