/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import Button from './assets/components/Button'
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#BED5FF' }}>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#BED5FF' }}>
                <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
                    <View style={{alignItems:'center'}}>
                        <Image
                            source={require('./assets/logoSemFundo.png')}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                        <Text style={{
                                fontSize: 40,
                                fontWeight: 800,
                                color: '#2264C7',
                                marginTop:-30
                            }}>ExchangeU</Text>


                    </View>
                </View>
                <View>
                    <Button
                        title="Criar Conta"
                        onPress={() => navigation.navigate('Signup')}
                        style={{

                            width: '80%',
                            marginBottom: 30,
                            margin: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 12,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#2264C7',
                        }}>Já possui uma conta?</Text>
                        <Pressable
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: '#2264C7',
                                fontWeight: 'bold',
                                marginLeft: 4,
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;
