import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

export default function App() {
  const [code, setCode] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");

  async function Save() {
    if (code < 0) {
      Alert.alert("O código deve ser maior que ZERO...");
      return;
    }

    if (!name) {
      Alert.alert("O nome é obrigarório...");
      return;
    }

    if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      Alert.alert("Email inválido...");
      return;
    }

    if (!password || !passConfirmation) {
      Alert.alert("A senha e a confirmação de senha devem ser informadas...");
      return;
    }

    if (!password.match(/(?=.*[A-Z])/)) {
      Alert.alert("A senha deve possuir ao menos um caractere maiúsculo...");
      return;
    }

    if (!password.match(/(?=.*[0-9])/)) {
      Alert.alert("A senha deve conter ao menos um número...");
      return;
    }

    if (!(password === passConfirmation)) {
      Alert.alert("A confirmação de senha e a senha devem ser iguais...");
      return;
    }

    await AsyncStorage.setItem("@user",
      JSON.stringify({
        code,
        name,
        email,
        password}), () => {Alert.alert("testando")});

      Alert.alert("Cadastro efetuado com sucesso!!!");
  }

  async function Load() {
    var json = await AsyncStorage.getItem("@user");
    var user = JSON.parse(json);

    setCode(user.code);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPassConfirmation(user.passConfirmation);
  }

  async function Clean() {
    await AsyncStorage.removeItem("@user");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Código</Text>
      <TextInput
          onChangeText={(code) => setCode(Number.parseInt(code))}
          style={styles.textInput}></TextInput>
        
      <Text style={styles.label}>Nome</Text>
      <TextInput
          onChangeText={(name) => setName(name)}
          style={styles.textInput}></TextInput>
        
      <Text style={styles.label}>Email</Text>
      <TextInput
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}></TextInput>

      <Text style={styles.label}>Senha</Text>
      <TextInput
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}></TextInput>
        
      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
          secureTextEntry={true}
          onChangeText={(password) => setPassConfirmation(password)}
          style={styles.textInput}></TextInput>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={ async () => await Save()}>
          <Text style={styles.buttonLabel}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Load()}>
          <Text style={styles.buttonLabel}>Carregar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Clean()}>
          <Text style={styles.buttonLabel}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  containerRow: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  label: {
    fontSize: 20,
    color: "#4AAFF1",
    marginTop: 5      
  },
  textInput: {
    fontSize: 20,
    color: "#4AAFF1",
    borderRadius: 5,
    borderColor: "#8EC9F0",
    borderWidth: 3,
    padding: 5,
    marginTop: 5,
    minWidth: 150
  },
  button: {
    fontSize: 20,
    borderRadius: 5,
    borderColor: "#0689E0",
    backgroundColor: "#8EC9F0",
    borderWidth: 3,
    marginTop: 8,
    padding: 5,
    minWidth: 180,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonLabel: {
    fontSize: 20,
    color: "#0689E0",
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
