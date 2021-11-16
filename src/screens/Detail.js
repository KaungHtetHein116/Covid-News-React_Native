import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';
import Loading from '../components/Loading';

const Detail = ({route}) => {
  console.log(route);
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  const Loading = () => {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" color="#319f8d" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route.params.navHeaderTitle} onBackPress={onBackPress} />
      <WebView
        source={{
          uri: route.params.url,
        }}
        // startInLoadingState={true}
        // renderLoading={() => <Loading />}
      />
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});
