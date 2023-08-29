import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#fff", blue: "#181619" };

const slides = [
  {
    id: "1",
    image: require("../images/image1.png"),
    title: "Cheap Insole",
    subtitle: "Lorem ipsum dolor sit amet sit amet sit",
  },
  {
    id: "2",
    image: require("../images/image2.png"),
    title: "Instant Notifications",
    subtitle: "Lorem ipsum dolor sit amet sit amet sit",
  },
  {
    id: "3",
    image: require("../images/image3.png"),
    title: "Daily Reports",
    subtitle: "Lorem ipsum dolor sit amet sit amet sit",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center", height: "100%", paddingTop: 40 }}>
      <Image
        source={item?.image}
        style={{ height: "67%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = React.useRef(null);

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const slidePosition = Animated.divide(scrollX, width);

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;

    if (nextSlideIndex < slides.length) {
      scrollViewRef.current.scrollTo({
        x: nextSlideIndex * width,
        animated: true,
      });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace("Registration");
    }
  };

  const skip = () => {
    if (currentSlideIndex === slides.length - 1) {
      navigation.replace("Registration");
    } else {
      const lastSlideIndex = slides.length - 1;
      scrollViewRef.current.scrollTo({
        x: lastSlideIndex * width,
        animated: true,
      });
      setCurrentSlideIndex(lastSlideIndex);
    }
  };

  const enableManualScroll = () => {
    scrollViewRef.current.setNativeProps({ scrollEnabled: true });
  };

  const disableManualScroll = () => {
    scrollViewRef.current.setNativeProps({ scrollEnabled: false });
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingTop: "5%",
        }}
      >
        {currentSlideIndex === slides.length - 1 && (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace("Registration")}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: COLORS.primary,
                }}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentSlideIndex !== slides.length - 1 && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.blue,
                  borderWidth: 1,
                  backgroundColor: "transparent",
                },
              ]}
              onPress={skip}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: COLORS.blue,
                }}
              >
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={goToNextSlide}
              style={styles.btn}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  color: COLORS.primary,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        scrollEnabled={false}
      >
        {slides.map((item, index) => (
          <Slide key={item.id} item={item} />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {slides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              {
                opacity: slidePosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: "clamp",
                }),
              },
            ]}
          />
        ))}
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.blue,
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: COLORS.blue,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  indicator: {
    height: 4.5,
    width: 4.5,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 100,
    marginBottom: 15,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#05668D",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;
