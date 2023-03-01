import { StatusBar } from 'expo-status-bar';
import {
  TextInput, Text, View, TouchableOpacity,
  Image, ScrollView, Alert,
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

import showPwd from './assets/showPwd.png';
import hidePwd from './assets/hidePwd.png';

export default function App() {

  const chaveStorage = '@usuarios';
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [exibeSenha, setExibeSenha] = useState(false);

  async function salvaDados() {
    if (!validaCampos())
      return;

    try {
      let obj = {
        codigo,
        nome,
        email,
        senha
      };
      let objString = JSON.stringify(obj);
      await AsyncStorage.setItem(chaveStorage, objString);
      Alert.alert('Salvo com sucesso!!!');
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function validaCampos() {

    if (codigo.length == 0  || codigo <=0 )
    {
      Alert.alert('Código deve ser maior que zero.');
      return false;
    }

    if (nome.length == 0) {
      Alert.alert('Informe o nome.');
      return false;
    }

    if (!validateEmail(email)) {
      Alert.alert('Informe um e-mail válido!');
      return false;
    }


    //var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})/;
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{5,}$/
    if(!regex.exec(senha))
    {      
      Alert.alert('Senha não atende os requisitos mínimos');
      return false;      
    }

    /*
    if (senha.length < 5 ||
      !testaAoMenosUmaLetraMaiuscula(senha) ||
      !possuiAoMenosUmNumero(senha)
    ) {
      Alert.alert('Senha não atende os requisitos mínimos');
      return false;
    }
    */

    if (senha !== confirmaSenha) {
      Alert.alert('Senha está diferente da confirmação de senha');
      return false;
    }

    return true;
  }


  function testaAoMenosUmaLetraMaiuscula(texto) {
    let n = 0;
    for (n = 0; n < texto.length; n++) {
      if ((texto[n] >= 'a' && texto[n] <= 'z') ||
        (texto[n] >= 'A' && texto[n] <= 'Z')) {
        let element = texto[n].toString();
        if (element === element.toUpperCase())
          return true;
      }
    }
    return false;
  }

  function possuiAoMenosUmNumero(texto) {
    let n = 0;
    for (n = 0; n < texto.length; n++) {
      if (texto[n] >= '0' && texto[n] <= '9')
        return true;
    }
    return false;
  }


  async function carregaDados() {

    try {
      let objString = await AsyncStorage.getItem(chaveStorage);
      if (objString != null) {
        let obj = JSON.parse(objString);
        setCodigo(obj.codigo);
        setNome(obj.nome);
        setEmail(obj.email);
        setSenha(obj.senha);
        setConfirmaSenha(obj.senha);
      }
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  function limparCampos() {

    setCodigo('');
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmaSenha('');
  }



  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}  >
        <View style={styles.areaTitulo}>
          <Text style={styles.titulo} >Cadastro de Usuário</Text>
        </View>

        <Text style={styles.labelCampo}>Código</Text>
        <TextInput style={[styles.campoEdicao, styles.sombra]}
          keyboardType='numeric'
          onChangeText={(texto) => setCodigo(texto)} value={codigo}
        />

        <Text style={styles.labelCampo}>Nome</Text>
        <TextInput style={[styles.campoEdicao, styles.sombra]}
          onChangeText={(texto) => setNome(texto)} value={nome}
        />

        <Text style={styles.labelCampo}>E-mail</Text>
        <TextInput style={[styles.campoEdicao, styles.sombra]}
          keyboardType='email-address'
          onChangeText={(texto) => setEmail(texto)} value={email}
        />

        <Text style={styles.labelCampo}>Senha</Text>
        <View style={styles.areaSenha}>
          <TextInput style={[styles.campoEdicao, styles.sombra, styles.campoSenha]}
            secureTextEntry={!exibeSenha}
            onChangeText={(texto) => setSenha(texto)} value={senha}
          />
          <TouchableOpacity
            onPress={() => setExibeSenha(!exibeSenha)}>
            <Image source={exibeSenha ? hidePwd : showPwd} style={styles.imgExibeSenha} />
          </TouchableOpacity>
        </View>

        <Text style={styles.labelCampo}>Confirmação de senha</Text>
        <TextInput style={[styles.campoEdicao, styles.sombra]}
          secureTextEntry={!exibeSenha}
          onChangeText={(texto) => setConfirmaSenha(texto)} value={confirmaSenha}
        />

        <View style={styles.areaBotao}>
          <TouchableOpacity style={[styles.botao, styles.sombra]}
            onPress={() => salvaDados()}
          >
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.sombra]}
            onPress={() => carregaDados()}
          >
            <Text style={styles.textoBotao}>Carregar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.sombra]}
            onPress={() => limparCampos()}>
            <Text style={styles.textoBotao}>Limpar</Text>
          </TouchableOpacity>

        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>


  );
}

