import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { CachedImage } from "../../utils/index";
import Loading from "../components/Loading";

export default function RecipeDetailsScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const getMealData = async (id) => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (response && response.data) {
          setMeal(response.data.meals[0]);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMealData(item.idMeal);
  }, [item.idMeal]);

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    return Array.from({ length: 20 }, (_, i) => i + 1).filter(i => meal["strIngredient" + i]);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* Recipe Image */}
      <View style={{ alignItems: "center" }}>
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{ width: wp(100), height: hp(45) }}
        />
      </View>

      {/* Back Button and Favorite Icon */}
      <View style={styles.buttonContainer}>
        <View style={styles.iconButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={hp(3.5)} color={"#f64e32"} strokeWidth={4.5} />
          </Pressable>
        </View>

        <View style={styles.iconButton}>
          <Pressable onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon size={hp(3.5)} color={isFavourite ? "#f64e32" : "gray"} strokeWidth={4.5} />
          </Pressable>
        </View>
      </View>

      {/* Meal Description */}
      {isLoading ? (
        <Loading size="large" style={{ marginTop: 16 }} />
      ) : (
        <View style={styles.descriptionContainer}>
          {/* Meal Name */}
          <Animated.View
            style={styles.mealNameContainer}
            entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
          >
            <Text style={styles.mealName}>
              {meal?.strMeal}
            </Text>
            <Text style={styles.mealArea}>
              {meal?.strArea}
            </Text>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View
            style={styles.ingredientsContainer}
            entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          >
            <Text style={styles.sectionTitle}>
              Ingredients
            </Text>
            <View style={styles.ingredientsList}>
              {ingredientsIndexes(meal).map((i) => (
                <View style={styles.ingredientItem} key={i}>
                  <View style={styles.ingredientBullet} />
                  <View style={styles.ingredientTextContainer}>
                    <Text style={styles.ingredientName}>
                      {meal["strIngredient" + i]}
                    </Text>
                    <Text style={styles.ingredientMeasure}>
                      {meal["strMeasure" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View
            style={styles.instructionsContainer}
            entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
          >
            <Text style={styles.sectionTitle}>
              Instructions
            </Text>
            <Text style={styles.instructionsText}>
              {meal?.strInstructions}
            </Text>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = {
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: hp(10),
    width: "100%",
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    marginHorizontal: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: hp(3),
  },
  mealNameContainer: {
    paddingVertical: 8,
  },
  mealName: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  mealArea: {
    fontSize: hp(2),
    color: "#A0A0A0",
  },
  ingredientsContainer: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  ingredientsList: {
    marginLeft: 16,
    marginTop: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientBullet: {
    backgroundColor: "#f64e32",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: 10,
  },
  ingredientTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientName: {
    fontSize: hp(1.7),
    fontWeight: "medium",
    color: "#4A4A4A",
  },
  ingredientMeasure: {
    fontSize: hp(1.7),
    fontWeight: "bold",
    color: "#4A4A4A",
    marginLeft: 4,
  },
  instructionsContainer: {
    paddingVertical: 16,
  },
  instructionsText: {
    fontSize: hp(1.7),
    color: "#4A4A4A",
    lineHeight: hp(2.5),
  },
};
