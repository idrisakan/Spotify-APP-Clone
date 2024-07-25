import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SongInfoScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  //homescreenden gönderilen veri useroute ile aldık
  const {album} = route.params || {};
  //gelen verileri parçalayarak aldık
  const {coverArt, name, year, artist} = album;

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.paddingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.imageView}>
            <Image source={{uri: coverArt}} style={{width: 200, height: 200}} />
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <View style={styles.artistView}>
          <Text style={styles.artistText}>{artist}</Text>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.dowloadButton}>
            <AntDesign name="arrowdown" color="white" size={20} />
          </Pressable>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1db954"
            />
            <Pressable
              style={{
                backgroundColor: '#1db954',
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.infoView}>
            <View>
              <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
                Albüm {name}
              </Text>

              <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
                Artist {artist}
              </Text>
              <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
                Year: {year}
              </Text>
            </View>

            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ScrollView: {marginTop: 50},
  paddingView: {padding: 10},
  imageView: {flex: 1, alignItems: 'center'},
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dowloadButton: {
    backgroundColor: '#1db954',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  infoContainer:{
    gap:5
  },
});
