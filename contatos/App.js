import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import styles from './styles';
import iconTelefone from './img/phone.png';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function App() {


  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [contatos, setContatos] = useState([{ id: 1, nome: "" }]);


  useEffect(
    () => {
      carregaDados();
      console.log('useEffect');
    }, []);


  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }


  async function salvaDados() {

    let novoRegistro = !id;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      nome: nome,
      telefone: telefone,
    };

    try {

      if (novoRegistro)
        contatos.push(obj); // inclusão
      else {
        let index = contatos.findIndex(c => c.id == id);
        if (index >= 0) {
          contatos[index] = obj;  // alteração
          console.log('Encontrei o objeto para alterar. Estava na posição: ' + index);          
        }
      }
      const jsonValue = JSON.stringify(contatos);
      await AsyncStorage.setItem('@contatos', jsonValue);
      Keyboard.dismiss();
      //Alert.alert('Dados salvos com sucesso!!!');
      limparCampos();

    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaDados() {
    try {
      const jsonValue = await AsyncStorage.getItem('@contatos')
      if (jsonValue != null) {
        const obj = JSON.parse(jsonValue);
        setContatos(obj);
      }
      else {
        setContatos([]);
      }

    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  function editar(identificador) {
    const contato = contatos.find(contato => contato.id == identificador);

    if (contato) {
      setId(contato.id);
      setNome(contato.nome);
      setTelefone(contato.telefone);
    }

    console.log(contato);
  }


  async function limparCampos() {
    setNome("");
    setTelefone("");
    setId(undefined);
    Keyboard.dismiss();
  }


  async function efetivaExclusaoTodosRegistros() {
    try {
      await AsyncStorage.removeItem('@contatos');
      Alert.alert('Registros removidos!');
      await carregaDados();
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusaoTodosRegistros();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }


  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      const contatoAux = contatos.filter(contato => contato.id != identificador);
      const jsonValue = JSON.stringify(contatoAux);
      await AsyncStorage.setItem('@contatos', jsonValue);
      Keyboard.dismiss();
      Alert.alert('Contato apagado com sucesso!!!');
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: 'blue', width: '100%', textAlign: 'center' }}>Agenda de Contatos - v1.0</Text>
      <Text /><Text />

      <View style={styles.areaDados}>

        <View style={styles.areaNome}>
          <Text>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome} />
        </View>

        <View style={styles.areaTelefone}>
          <Text>Telefone</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setTelefone(texto)}
            value={telefone}
            keyboardType='phone-pad' />
        </View>

      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {
          contatos.map((contato, index) => (
            <View style={styles.contato} key={index.toString()}>

              <Text style={styles.listaNome}> {contato.nome}</Text>
              <View style={styles.dadosListaTelefone}>

                <Image source={iconTelefone} style={styles.iconTelefone} />
                <Text style={styles.listaTelefone} >{contato.telefone} </Text>
              </View>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                  <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>
                  <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

