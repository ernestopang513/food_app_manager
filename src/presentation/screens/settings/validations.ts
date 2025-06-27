import * as Yup from 'yup';

export const FoodStandSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  location: Yup.string().required('La locación es requerida'),
  latitude: Yup.number()
    .required('La latitud es requerida')
    .typeError('La latitud debe ser un número'),
  longitude: Yup.number()
    .required('La longitud es requerida')
    .typeError('La longitud debe ser un número'),
});


export const DishSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(5, 'Minimo 5 caracteres'),
    
  price: Yup.number()
    .required('El precio es requerido')
    .typeError('El precio debe de ser un número')
    .positive('Debe ser un número positivo'),
  
  description: Yup.string()
    .required('La descripcion es requerida')
    .min(5, 'Minimo 5 caracteres.')
})

export const DeliveryPointSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(5, 'Minimo 5 caracteres'),
  latitude: Yup.number()
    .required('La latitud es requerida')
    .typeError('La latitud debe ser un numero'),
  longitude: Yup.number()
    .required('La latitud es requerida')
    .typeError('La latitud debe ser un numero'),
})