/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from 'react-native';

import {TEXT} from './constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const IMAGES = [
  {
    image: require('./assets/montains4.png'),
    height: 450,
  },
  {
    image: require('./assets/montains3.png'),
    height: 350,
  },
  {
    image: require('./assets/montains2.png'),
    height: 250,
  },
  {
    image: require('./assets/montains1.png'),
    height: 150,
  },
];

interface IAnimatedImages {
  data: {
    image: any;
    height: number;
  };
  index: number;
  scrollY: Animated.Value;
}

const AnimatedImage = ({data, index, scrollY}: IAnimatedImages) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, data.height],
  });

  return (
    <Animated.Image
      key={index.toString()}
      style={[
        styles.image,
        {
          height: data.height,
          transform: [{translateY: index === 3 ? 0 : translateY}],
        },
      ]}
      resizeMode="contain"
      source={data.image}
    />
  );
};

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [1, 0],
  });

  const translateY = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, 1000],
  });

  const translateX = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, 500],
  });

  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 150, 300],
    outputRange: ['orange', '#F95742', '#181669'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="orange" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        bounces={true}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <Animated.View style={[styles.header, {backgroundColor}]}>
          <Animated.Image
            style={[
              styles.sun,
              {opacity, transform: [{translateY}, {translateX}]},
            ]}
            resizeMode="contain"
            source={require('./assets/sun.png')}
          />
          {IMAGES.map((image, index) => (
            <AnimatedImage
              key={index.toString()}
              data={image}
              index={index}
              scrollY={scrollY}
            />
          ))}
        </Animated.View>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Mountains</Text>
          </View>
          <View>
            <Text style={styles.text}>{TEXT}</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    width: '100%',
    height: HEIGHT,
    backgroundColor: 'orange',
    justifyContent: 'flex-end',
  },
  image: {
    width: WIDTH,
    position: 'absolute',
    bottom: -2,
  },
  sun: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 50,
    left: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'orange',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#141926',
    height: HEIGHT - 200,
  },
});

export default App;
