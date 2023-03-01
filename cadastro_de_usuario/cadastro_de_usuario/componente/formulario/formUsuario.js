import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

export default function FormUsuario() {

    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    async function salvar() {
        AsyncStorage.setItem("usuario", JSON.stringify({
            codigo, nome, email, senha
        }))
        console.log(await AsyncStorage.getItem("usuario"));
    }

    return (
        <>
            <Text>Código</Text>
            <TextInput onChangeText={codigo => setCodigo(codigo)}></TextInput>

            <Text>Nome</Text>
            <TextInput onChangeText={nome => setNome(nome)}></TextInput>

            <Text>E-mail</Text>
            <TextInput onChangeText={email => setEmail(email)}></TextInput>

            <Text>Senha</Text>
            <TextInput onChangeText={senha => setSenha(senha)}></TextInput>

            <Text>Confirmar senha</Text>
            <TextInput onChangeText={confirmSenha => setConfirmSenha(confirmSenha)}></TextInput>

            <Button style={{backgroundColor: "yellow"}} onPress={() => salvar()}><Text>Salvar</Text></Button>
            <Button><Text>Carregar</Text></Button>
            <Button style={{backgroundColor: "red"}}><Text>Limpar</Text></Button>
        </>
    )
}

