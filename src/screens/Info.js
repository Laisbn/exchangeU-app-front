/* eslint-disable prettier/prettier */
import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const Info = ({ navigation }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{
                backgroundColor: '#BED5FF',
                width: '100%',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <View style={{ height: 70 + getStatusBarHeight(), width: '100%', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable
                            onPress={() => navigation.navigate('Home')}>
                            <Image
                                source={require('./assets/arrow.png')}
                                style={{
                                    height: 31,
                                    width: 24,
                                    margin: 15
                                }}
                            />
                        </Pressable>

                        <Text style={{
                            fontSize: 25,
                            fontWeight: 800,
                            color: '#2264C7',
                            marginHorizontal: '28%'

                        }}>
                            Sobre
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'justify', fontSize: 18, fontWeight: 'medium', margin: 30, color: 'black' }}>Este aplicativo foi desenvolvido como proposta de trabalho de conclusão de curso Bacharelado em Ciência da Computação por Laís Barros Nogueira sob orientação da Profa. Dra. Fernanda Carla de Oliveira pelo IFSP - São João da Boa Vista em 2023.</Text>
                <Text style={{ textAlign: 'justify', fontSize: 18, fontWeight: 'medium', margin: 20, color: 'black' }}>Com o objetivo de contribuir com o planejamento e vivência de estudantes universitários em inter-câmbio acadêmico, por meio do desenvolvimento de um aplicativo híbrido colaborativoque permitirá a troca de informações de interesse deste público.</Text>
            </View>

            <View style={{
                alignItems: 'center', marginTop: 30, justifyContent: 'center', flexDirection: 'column'
            }}>
                <Pressable
                    onPress={() => navigation.navigate('Home')}>
                    <Image
                        source={require('./assets/logoSemFundo.png')}
                        style={{
                            height: 60,
                            width: 60,
                        }}
                    />
                </Pressable>
            </View>
        </View>
    );
};

export default Info;