import {View, Text, ScrollView, Image, Pressable} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ArtistCard from '../components/ArtistCard';
import {AlbumsContext} from '../context/AlbumsContext';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { ArtistsContext } from '../context/ArtistContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumsContext);

  const {artists, loading, error}  = useContext(ArtistsContext)


  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Error error={albumsError}/>
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYl1RTnSto_TThTvCdf1xnq-x_TKwushJIkQ&s',
                }}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                message
              </Text>
            </View>
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              color="white"
              size={24}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 12,
              marginVertical: 5,
              gap: 10,
            }}>
            <Pressable
              style={{
                backgroundColor: '#282828',
                borderRadius: 30,
                padding: 10,
              }}>
              <Text style={{color: 'white', fontSize: 15}}>Music</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#282828',
                borderRadius: 30,
                padding: 10,
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                Podcast & Shows
              </Text>
            </Pressable>
          </View>

          <View>
            <Pressable
              onPress={() => navigation.navigate('Liked')}
              style={{
                backgroundColor: '#202020',
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                gap: 10,
                borderRadius: 4,
              }}>
              <LinearGradient colors={['#33006f', '#ffffff']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 13}}>
                Liked Songs
              </Text>
            </Pressable>
            <View
              style={{
                backgroundColor: '#202020',
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                gap: 10,
                borderRadius: 4,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/100/100'}}
                style={{width: 55, height: 55}}
              />
              <View>
                <Text
                  style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                  Hipop
                </Text>
              </View>
            </View>
            {/* flatlist renderitems */}
            <Pressable
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 8,
                borderRadius: 4,
                backgroundColor: '#282828',
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={{width: 55, height: 55}}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                  name
                </Text>
              </View>
            </Pressable>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 19,
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              Your Top Artist
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
             {artists.map((artist,index) => <ArtistCard key={index} artist={artist}/>)}
            </ScrollView>

            <View style={{height: 10}} />
            <Text
              style={{
                color: 'white',
                fontSize: 19,
                fontWeight: 'bold',
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              Populer Albums
            </Text>
            {/* flatliste çevrilecek */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums?.map((album, index) => (
                <AlbumCard album={album} key={index} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}
