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
