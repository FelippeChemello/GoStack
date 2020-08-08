import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native'

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        api.get('/projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
    }, [])

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
            </SafeAreaView>

            {/* <ScrollView style={styles.container}>
                {projects.map((project) => {
                    return (
                        <Text style={styles.title} key={project.id}>
                            {project.title}
                        </Text>
                    );
                })}
            </ScrollView> */}
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
    }
})