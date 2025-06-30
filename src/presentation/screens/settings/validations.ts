import * as Yup from 'yup';

const passwordRegex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

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



export const SuperUserSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('El nombre completo es obligatorio')
    .min(5, 'Debe tener al menos 3 caracteres'),

  userName: Yup.string()
    .required('El nombre de usuario es obligatorio')
    .min(5, 'Debe tener al menos 3 caracteres'),

  email: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Correo electrónico inválido'),

  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(
      passwordRegex,
      'La contraseña debe tener al menos una mayúscula, una minúscula y un número o símbolo'
    ),
    
    confirmPassword: Yup.string()
    .required('Confirma tu contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    
    adminKey: Yup.string()
      .required('La contraseña es obligatoria')
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});