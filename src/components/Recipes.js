import React from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Loading from "./Loading";
import RecipesCard from "./RecipesCard";

export default function Recipes({ meals = [], categories = [] }) {
  const navigation = useNavigation();

  return (
    <Animated.View style={styles.container} entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>

      <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
        {meals.length === 0 ? (
          <Loading size="large" style={styles.loading} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipesCard item={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    spaceVertical: 16,
  },
  recipeCountText: {
    fontWeight: "600",
    color: "#4B5563", // Neutral-600 color
  },
  loading: {
    marginTop: hp(20),
  },
});
