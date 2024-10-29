import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState(''); // Novo estado para o nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Senhas não coincidem', 'Por favor, verifique suas senhas.');
      return;
    }

    await cadastrarUsuario();
  };

  const cadastrarUsuario = async () => {
    try {
      const resposta = await axios.post('http://localhost:3000/usuarios', {
        nome,
        email,
        senha: password,
      });

      Alert.alert('Registro concluído', 'Você pode agora fazer login.');
      setNome('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
    }
  };

  return (
    <Container>
      <Title>Criar Conta</Title>

      <InputContainer>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </InputContainer>

      <InputContainer>
        <Input
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
        />
      </InputContainer>

      <RegisterButton onPress={handleRegister}>
        <ButtonText>Registrar</ButtonText>
      </RegisterButton>
    </Container>
  );
}

// Estilos
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
  background-color: #3A506B;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #F5F5F5;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #FFB6B9;
  border-radius: 8px;
  padding-horizontal: 16px;
  margin-bottom: 20px;
  background-color: #ffffff;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 18px;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: #FFB6B9;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;