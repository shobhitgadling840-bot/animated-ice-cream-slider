 import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const DATA = [
  {
    id: '1',
    image: require('./src/images/swabeery.png'),
    title: 'Strawberry Dream',
    subtitle: 'ONLY THIS WEEKEND',
    description:
      'Indulge in our signature blend of fresh orchard strawberries, creamy Tahitian vanilla.',
    bgColor: '#FFE6EC',
    accentColor: '#FF4F8B',
    price : "$15.00 EACH"
  },


  {
    id: '2',
    image: require('./src/images/Chocolate.png'),
    title: 'Chocolate Bliss',
    subtitle: 'LIMITED EDITION',
    description:
      'Rich Belgian chocolate blended with silky cream and deep cocoa flavors.',
    bgColor: '#F5EDE5',
    accentColor: '#6B3E26',
     price : "$10.00 EACH"
  },
  {
    id: '3',
    image: require('./src/images/berry.png'),
    title: 'Blueberry Burst',
    subtitle: 'FRESH & FRUITY',
    description:
      'A refreshing mix of wild blueberries and smooth vanilla cream.',
    bgColor: '#EEF0FF',
    accentColor: '#5A5FFF',
     price : "$150.00 EACH"
  },
  {
    id: '4',
    image: require('./src/images/tk.png'),
    title: 'Mango Tango',
    subtitle: 'SUMMER SPECIAL',
    description:
      'Juicy tropical mangoes blended into a rich and creamy delight.',
    bgColor: '#FFF3D6',
    accentColor: '#FFA800',
     price : "$9.00 EACH"
  },
  {
    id: '5',
    image: require('./src/images/pk.png'),
    title: 'Dragon Fantasy',
    subtitle: 'EXOTIC TASTE',
    description:
      'Exotic dragon fruit combined with velvety cream for a unique flavor.',
    bgColor: '#FFEAF4',
    accentColor: '#FF4FA3',
     price : "$20.00 EACH"
  },
  {
    id: '6',
    image: require('./src/images/oreo.png'),
    title: 'Oreo Crunch',
    subtitle: 'FAN FAVORITE',
    description:
      'Crunchy Oreo cookies mixed with smooth vanilla ice cream.',
    bgColor: '#F2F2F2',
    accentColor: '#2F2F2F',
     price : "$30.00 EACH"
  },
  {
    id: '7',
    image: require('./src/images/ir.png'),
    title: 'Rainbow Mix',
    subtitle: 'COLORFUL DELIGHT',
    description:
      'A joyful blend of multiple flavors swirled into one magical scoop.',
    bgColor: '#F6ECFF',
    accentColor: '#9B5CFF',
     price : "$21.00 EACH"
  },
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width;
const PRICE_HEIGHT = 40;

/* ---------------- PRICE ---------------- */

const AnimatedPrice = ({ scrollX }: any) => {
  const translateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          DATA.map((_, i) => i),
          DATA.map((_, i) => -i * PRICE_HEIGHT),
        ),
      },
    ],
  }));

  const colorStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      scrollX.value,
      DATA.map((_, i) => i),
      DATA.map(item => item.accentColor),
    ),
  }));

  return (
    <View style={styles.priceWindow}>
      <Animated.View style={translateStyle}>
        {DATA.map((item, index) => (
          <View key={index} style={styles.priceItem}>
            <Animated.Text style={[styles.price, colorStyle]}>
              {item.price}
            </Animated.Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};








/* ---------------- CARD ---------------- */

function CarouselItem({ item, index, scrollX }: any) {
  const floatY = useSharedValue(0);

  //  up-down animation
  useEffect(() => {
    floatY.value = withRepeat(
      withTiming(-30, { duration: 1500 }),
      -1,
      true,
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          [index - 1, index, index + 1],
          [40, 0, 40],
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View
        style={[
          styles.topBackground,
          { backgroundColor: item.accentColor },
        ]}
      />

      <View style={styles.headerText}>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/*  FLOATING IMAGE */}
      <Animated.View style={[styles.imageWrapper, floatingStyle]}>
        <Image source={item.image} style={styles.image} />
      </Animated.View>

      <Text style={styles.description}>{item.description}</Text>
    </Animated.View>
  );
}

/* ---------------- MAIN ---------------- */

export default function App () {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x / ITEM_WIDTH;
  });

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollX.value,
      DATA.map((_, i) => i),
      DATA.map(item => item.bgColor),
    ),
  }));

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <CarouselItem item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <AnimatedPrice scrollX={scrollX} />
    </Animated.View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width,
    alignItems: 'center',
  },
  topBackground: {
    position: 'absolute',
    top: 60,
    width: '90%',
    height: 340,
    borderTopLeftRadius: 190,
    borderTopRightRadius: 190,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    marginTop: 150,
    alignItems: 'center',
  },
  subtitle: {
    color: '#fff',
    letterSpacing: 2,
    fontSize: 12,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },
  imageWrapper: {
    marginTop: 40,
    borderRadius: 180,
    overflow: 'hidden',
  },
  image: {
    width: 260,
    height: 360,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 40,
    color: '#555',
  },

  priceWindow: {
    height: PRICE_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 90,
  },
  priceItem: {
    height: PRICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
  },
}); 