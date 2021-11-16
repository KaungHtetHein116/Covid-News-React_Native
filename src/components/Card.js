import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {sizes} from '../helpers/Constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';

const shareIcon = require('../assets/icons/share.png');

const Card = ({item}) => {
  const navigation = useNavigation();
  const date = moment(item.NewsDate).fromNow();

  const onShare = async () => {
    try {
      await Share.share({
        message: `${item.Title} ${item.Description} read more here -> ${item.URL}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onPress = () => {
    navigation.navigate('Detail', {navHeaderTitle: item.Title, url: item.URL});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <TouchableOpacity style={styles.shareWrapper} onPress={onShare}>
        <Image source={shareIcon} style={styles.shareIcon} />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text
          numberOfLines={3}
          style={{lineHeight: 25, fontSize: sizes.medium}}>
          {item.Title}
        </Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={{alignItems: 'center', flex: 2, alignSelf: 'center'}}>
        <Image
          source={require('../assets/icons/placeholder.png')}
          style={styles.newsImage}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 15,
  },
  shareWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start',
  },
  newsImage: {
    height: 60,
    width: 60,
  },
  textWrapper: {
    flex: 7,
    justifyContent: 'space-between',
  },
  shareIcon: {
    width: 20,
    height: 20,
    tintColor: '#a2a2a2',
    marginTop: 10,
  },
  dateText: {
    color: '#a2a2a2',
    marginTop: 10,
    fontSize: sizes.small,
  },
});
