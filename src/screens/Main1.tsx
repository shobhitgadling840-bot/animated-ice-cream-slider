import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';

import { Animated } from 'react-native';

const { width, height } = Dimensions.get('screen');

class Main1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollAnimation = new Animated.Value(0);
  }

  render() {
    const { scrollAnimation } = this;
    const rotate_1 = scrollAnimation.interpolate({
      inputRange: [0, width],
      outputRange: ['0deg', '20deg'],
      extrapolate: 'clamp',
    });


    const rotate_2 = scrollAnimation.interpolate({
        inputRange : [ 0 , width , width*2],
        outputRange: ['-20deg', '0deg' ,  '20deg'],
        extrapolate: 'clamp',
    })

    const rotate_3 = scrollAnimation.interpolate({
        inputRange : [ width , width*2, width*3],
        outputRange: ['-20deg', '0deg' ,  '20deg'],
        extrapolate: 'clamp',
    })
   







    return (
      <View style={styles.container}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollAnimation } } }],
            {
              useNativeDriver: true,
            },
          )}
        >
          <View style={styles.itemcontainer}>
            <Animated.Image
              source={require('../images/coke_regular_can.png')}
              resizeMode={'contain'}
              style={[styles.item, { transform: [{ rotate: rotate_1 }] }]}
            />
          </View>

          <View style={styles.itemcontainer}>
            <Animated.Image
              source={require('../images/coke_regular_can.png')}
              resizeMode={'contain'}
              style={[styles.item, {transform: [{rotate : rotate_2}]}]}
            />
          </View>

          <View style={styles.itemcontainer}>
            <Animated.Image
              source={require('../images/coke_regular_can.png')}
              resizeMode={'contain'}
              style={[styles.item, {transform : [{rotate : rotate_3}]}]}
            />
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },

  itemcontainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '70%',
    height: '55%',
  },
});

export default Main1;
