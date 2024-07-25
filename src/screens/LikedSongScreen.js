import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SongItem from '../components/SongItem';
import {ModalContent} from 'react-native-modals';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function LikedSongScreen() {
  const navigation = useNavigation();

  const progress = useProgress();

  const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler');
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': 'aa71a3486emsh76f2ce83cd8a069p112dedjsnf21196b27da4',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setupPlayer = async () => {
    try {
      /*
       * `TrackPlayer` kütüphanesinin oynatıcıyı kurmasını sağlar.Bu işlem, oynatıcıyı başlatmak için
       * gerekli olan yapılandırmayı sağlar.
       */
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        //* Oynatıcının sahip olacağı özellikleri belirler
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY, // Oynatma işlemi yapabilmesi için kullanırız
          TrackPlayer.CAPABILITY_PAUSE, // Oynatıcıda duraklatma işlemi için kullanırız
          TrackPlayer.CAPABILITY_STOP, // Oynatıcıda durdurma işlemi için kullanırız
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT, // Oynatıcıda bir sonraki müziği geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS, // Oynatıcıda bir önceki müziğe geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SEEK_TO, // Belirli bir zamana atlama
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri, //ses dosyanının urisi
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {}
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesaplar
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const tooglePlayback = async () => {
    if (isPlaying) {
      //* Müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      //* Müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //* isPlaying değerini oynatma ve durdurma butonuna basıldığında tam tersi değerine çevir

    setIsPlaying(!isPlaying);
  };

  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };

  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  }

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <Ionicons name="arrow-back" size={24} color={'white'} />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 9,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#42275a',
                  alignItems: 'center',
                  padding: 9,

                  height: 38,
                  borderRadius: 8,
                  gap: 10,
                }}>
                <AntDesign name="search1" size={20} color="white" />
                <TextInput
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                  placeholderTextColor={'white'}
                  placeholder="Find in Liked song"
                  style={{fontWeight: '500', width: '85%', color: 'white'}}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{height: 10}} />
          <View style={{marginHorizontal: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
              Liked Songs
            </Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>
              {searchedTracks.length} songs
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator color={'gray'} size={'large'} />
          ) : (
            <FlatList
              style={{marginTop: 10, marginHorizontal: 10}}
              data={searchedTracks}
              keyExtractor={item => item.track.key}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.trackAlbüm}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Entypo name="controller-play" color="white" size={24} />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" // modalin hangi yöne doğru kaydırılacağını belirler
        onSwipeComlete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 60,
            width: '100%',
            height: '100%',
            backgroundColor: '#5072a7',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>

            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              song name
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{uri: selectedTrack?.images.coverart}}
              style={{width: '100%', height: 330, borderRadius: 4}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text style={{color: '#d3d3d3', marginTop: 4}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>

              <AntDesign name="heart" color="#1db954" size={24} />
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressbar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 12,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 17,
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo
                    name="controller-fast-backward"
                    size={30}
                    color="white"
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable onPress={tooglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Entypo name="controller-play" size={60} color="white" />
                  )}
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable onPress={seekForward}>
                  <Entypo
                    name="controller-fast-forward"
                    size={30}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },

  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  trackInfo: {flex: 1, marginLeft: 10},
  trackName: {
    fontSize: 16,
    fontWeight: 'black',
    color: 'white',
  },
  trackAlbüm: {
    fontSize: 14,
    color: 'gray',
  },
});
