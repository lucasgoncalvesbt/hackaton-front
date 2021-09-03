import Link from 'next/link'
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
import firebase from './../config/firebase'

const validationSchema = yup.object().shape({
  username: yup.string().required('Prenchimento obrigatório'),
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
    onSubmit: async (values, form) => {
     const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
     console.log(user)
  },
    validationSchema,
    initialValues:{
      username: '',
      email: '',
      password: ''
    }
  })
  return (
    
    <Container p={4} centerContent>
      <Logo />
      
    <Box p={4} mt={8}>
        <Text >
          Cadastre-se aqui!
        </Text>
    </Box>

    <Box width="70%">
      <FormControl id="username" isRequired p={4}>
        <FormLabel>
         Username
        </FormLabel>
        <Input placeholder type="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
        {touched.username && <FormHelperText textColor="#e74c3c">   
        {errors.username}
        </FormHelperText>}
      </FormControl>

      <FormControl id="email" isRequired p={4}>
        <FormLabel>
         Insira seu e-mail
        </FormLabel>
        <Input placeholder='example@gmail.com' type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur}/>
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
    
      <Link href="/">Já tem uma conta? Acesse aqui!</Link>

    </Container>
    
  )
}