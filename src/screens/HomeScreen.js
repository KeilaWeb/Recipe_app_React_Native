import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { View, Text, ScrollView, SafeAreaView, Image, TextInput, StyleSheet } from "react-native";
import { getCategories, getRecipes } from "../Helpers/api"; 
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState("Beef");
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
    
            if (categoriesData.length > 0) {
                const initialCategory = categoriesData[0].strCategory || "Beef";
                setActiveCategory(initialCategory);
    
                const recipesData = await getRecipes(initialCategory);
                setMeals(recipesData);  
            } else {
                setMeals([]); 
            }
        };
    
        fetchData();
    }, []);

    const handleChangeCategory = async (category) => {
        setActiveCategory(category);
        const recipesData = await getRecipes(category);
        setMeals(recipesData || []);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.header}>
                    <AdjustmentsHorizontalIcon size={hp(4)} color={"gray"} />
                    <Image source={require("../../assets/images/avatar.png")} style={styles.avatar} />
                </View>
                <View style={styles.headlines}>
                    <Text style={styles.title}>Fast & Delicious</Text>
                    <Text style={styles.subtitle}>Food You <Text style={styles.loveText}>Love</Text></Text>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.iconContainer}>
                        <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={3} />
                    </View>
                    <TextInput
                        placeholder="Search Your Favorite Food"
                        placeholderTextColor={"gray"}
                        style={styles.searchInput}
                    />
                </View>
                {categories.length > 0 && (
                    <Categories 
                        categories={categories} 
                        activeCategory={activeCategory} 
                        handleChangeCategory={handleChangeCategory} 
                    />
                )}
                <Recipes meals={meals} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContainer: {
        paddingBottom: 50,
        paddingTop: 14,
    },
    header: {
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: {
        width: hp(5),
        height: hp(5),
        borderRadius: hp(5.5),
    },
    headlines: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: hp(3.5),
        fontWeight: "bold",
        color: "#4A4A4A",
    },
    subtitle: {
        fontSize: hp(3.5),
        fontWeight: "900",
        color: "#4A4A4A",
    },
    loveText: {
        color: "#f64e32",
    },
    searchContainer: {
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "brown",
        borderWidth: 1,
        borderRadius: 12,
        padding: 8,
    },
    iconContainer: {
        backgroundColor: "white",
        borderRadius: 50,
        padding: 4,
    },
    searchInput: {
        flex: 1,
        fontSize: hp(1.7),
        paddingLeft: 8,
        color: "black",
    },
});
