import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from "react-native-responsive-screen";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  const ring1AnimatedStyle = useAnimatedStyle(() => {
    return { padding: ring1padding.value, }; });

  const ring2AnimatedStyle = useAnimatedStyle(() => {
    return { padding: ring2padding.value, }; });

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout( () => (
      ring1padding.value = withSpring(ring1padding.value + hp(5))), 100
    );

    setTimeout( () => (
      ring2padding.value = withSpring(ring2padding.value + hp(5.5))), 300
    );

    setTimeout(() => 
      navigation.navigate("Home"), 4500
    );
    
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center",  alignItems: "center", backgroundColor: "#FFBF00", }} >
      <StatusBar style="light" />

      {/* Animação dos Anéis */}
      <Animated.View style={[ { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 300 },  ring2AnimatedStyle, ]} >
        <Animated.View  style={[ { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 300 }, ring1AnimatedStyle, ]} >
          {/* Imagem arredondada */}
          <Image source={require("../../assets/images/logo.png")} style={{ width: 200, height: 200, borderRadius: 100 }} />          
        </Animated.View>
      </Animated.View>

      {/* Texto Centralizado */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={{ fontSize: hp(7), fontWeight: "bold", color: "white", letterSpacing: 2, }} >
          Foody
        </Text>
        <Text style={{ fontSize: hp(2), fontWeight: "500", color: "white",  letterSpacing: 2, }} >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
