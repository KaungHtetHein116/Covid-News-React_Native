import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import {sizes} from '../helpers/Constants';

const Header = ({title, onBackPress}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBackPress}>
        <Image
          source={require('../assets/icons/left.png')}
          style={styles.backIcon}
        />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  backIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    tintColor: '#979593',
  },
  title: {
    fontSize: sizes.large,
    color: '#319f8d',
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
