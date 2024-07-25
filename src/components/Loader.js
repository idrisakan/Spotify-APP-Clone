import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

export default function Loader() {
  return (
    <View style={styles.loaderCantainer}>
      <ActivityIndicator size={'large'} color={'#1db954'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderCantainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
