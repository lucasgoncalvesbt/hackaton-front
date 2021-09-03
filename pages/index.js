import {useFormik} from 'formik'
import * as yup from 'yup'

import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl, 
  FormLabel, 
  FormErrorMessage, 
  FormHelperText 
} from '@chakra-ui/react'


import { Logo } from './../components'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Prenchimento obrigatório'),
  password: yup.string().required('Prenchimento obrigatório')
})
 
export default function Home() {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: (values, form) => {
     
    },
    validationSchema,
    initialValues:{
      email: '',
      password: ''
    }
  })
  return (
    
    <Container p={4} centerContent>
      <Logo />
      
    <Box p={4} mt={8}>
        <Text >
          Agende sua data e horário
        </Text>
    </Box>

    <Box width="70%">
      <FormControl id="email" isRequired p={4}>
        <FormLabel>
         Insira seu e-mail
        </FormLabel>
        <Input placeholder type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur}/>
        {touched.email && <FormHelperText textColor="#e74c3c">
          {errors.email}   
        </FormHelperText>}
      </FormControl>

      <FormControl id="password" isRequired p={4}>
        <FormLabel>
         Insira sua senha
        </FormLabel>
        <Input placeholder type="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
        {touched.password && <FormHelperText textColor="#e74c3c">   
        {errors.password}
        </FormHelperText>}
      </FormControl>
    </Box>
     
      <Button colorScheme="blue" width="64%" mt={8} alignItems="center" onClick={handleSubmit} isLoading={isSubmitting}>
        Entrar
      </Button>
    
    </Container>
    
  )
}