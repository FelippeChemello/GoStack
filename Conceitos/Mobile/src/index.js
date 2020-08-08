import React, { useEffect, useState } from 'react'
import { 
    View, 
    ScrollView, 
    SafeAreaView, 
    FlatList, 
    Text,
    TouchableOpacity, 
    StyleSheet, 
    StatusBar, 
    Button
} from 'react-native'

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject() {
        console.log('Pressed')
        const response = await api.post("/projects", {
            title: "Novo Projeto " + Math.round(Math.random() * 100),
            owner: "Felippe Chemello",
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#7519c1" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={(project) => project.id}
                    renderItem={({ item }) => {
                        return <Text style={styles.title}>{item.title}</Text>;
                    }}
                />

                <TouchableOpacity 
                    activeOpacity={0.6}
                    style={styles.button} 
                    onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7519c1',
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold'
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        margin: 20,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})