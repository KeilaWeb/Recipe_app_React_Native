import React from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'; // Certifique-se de que ambos os ícones são importados corretamente

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/bolo.png')}
                        style={styles.image}
                    />
                    <BellIcon size={hp(4)} color="gray" />
                </View>

                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hello, Keila</Text>
                    <View>
                        <Text style={styles.subGreetingText}>Make your own food,</Text>
                    </View>
                    <Text style={styles.stayAtHomeText}>
                        stay at <Text style={styles.homeText}>Home</Text>
                    </Text>
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor='gray'
                        style={styles.searchInput}
                    />
                    <View style={styles.searchIconContainer}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
                    </View>
                </View>

                <View>
                    {/* Adicione o conteúdo adicional aqui */}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        paddingBottom: 50,
        paddingTop: 14,
    },
    headerContainer: {
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: hp(5.5),
        height: hp(5),
        borderRadius: 100,
    },
    greetingContainer: {
        marginHorizontal: 16,
        marginBottom: 8,
    },
    greetingText: {
        fontSize: hp(1.7),
        color: '#6B7280',
    },
    subGreetingText: {
        fontWeight: '600',
        color: '#6B7280',
    },
    stayAtHomeText: {
        fontSize: hp(3.8),
        fontWeight: '600',
        color: '#6B7280',
    },
    homeText: {
        color: '#F59E0B',
    },
    searchContainer: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        borderRadius: 50,
        padding: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: hp(1.7),
        marginBottom: 1,
        paddingLeft: 12,
        trackingWider: 'wider',
    },
    searchIconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 3,
    },
});
