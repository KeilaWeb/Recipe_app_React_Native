import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView  horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent} >
        {categories.map((category, index) => {
          const isActive = category.strCategory === activeCategory;
          const activeButtonStyle = isActive ? styles.activeButton : styles.inactiveButton;

          return (
            <Pressable  key={index} onPress={() => handleChangeCategory(category.strCategory)} style={styles.touchable} >
              <View style={[styles.imageContainer, activeButtonStyle]}>
                <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
              </View>
              <Text style={styles.categoryText}> {category.strCategory} </Text>
            </Pressable >
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  touchable: {
    alignItems: "center",
    marginRight: 10,
  },
  imageContainer: {
    borderRadius: 110,
    padding: hp(0.51),
  },
  activeButton: {
    backgroundColor: "#f64e32",
  },
  inactiveButton: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(3),
  },
  categoryText: {
    fontSize: hp(1.6),
    color: "#333",
    marginTop: 5,
  },
});
