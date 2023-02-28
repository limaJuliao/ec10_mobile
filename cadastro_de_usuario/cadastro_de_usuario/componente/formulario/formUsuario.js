import React, { useState } from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

export default function FormUsuario() {

    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    function salvar() {
        console.log("teste")
        AsyncStorage.setItem("usuario", JSON.stringify({
            codigo, nome, email, senha
        }))
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

            <TouchableOpacity onPress={() => salvar()}><Text>Salvar</Text></TouchableOpacity>
            <TouchableOpacity><Text>Carregar</Text></TouchableOpacity>
            <TouchableOpacity><Text>Limpar</Text></TouchableOpacity>
        </>
    )
}