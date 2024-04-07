import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  username: yup.string().required("Informe seu username"),
  email: yup.string().email("Email invalido").required("Informe seu email"),
  password: yup.string().min(6,"A senha deve ter pelo menos 6 digitos").required("Informe sua senha")
});

export default function App() {
  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema) // Corrigido: agora passa o schema do yup para o resolver.
  });

  function handleSignIn(data : any) {
    console.log(data);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Bem-Vinde</Text>

      <Controller
        control={control}
        name="username"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Seu Username"
          />
        )}
      />
      {errors.username && <Text style={styles.labelError}>{errors.username?.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Seu Email"
          />
        )}
      />
      {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

      <Controller
        control={control}
        name="password" // Corrigido: garante que a propriedade name corresponda exatamente ao definido no schema
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder="Sua Senha"
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignIn)}>
        <Text style={styles.buttonText}>Entrar</Text> {/* Corrigido: React Native usa 'Text' ao invés de 'text' */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  title:{
    fontSize: 34,
    marginBottom: 34,
    color: '#121212',
    fontWeight: 'bold'
  },
  input:{
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4,
    color: '#121212'
  },
  button:{
    width: '100%',
    height: 40,
    backgroundColor: '#45D800',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16 // Ajustado para melhorar a legibilidade
  },
  labelError:{
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,
  }
});