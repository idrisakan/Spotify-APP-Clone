import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
 const navigation = useNavigation()
  return (
    <LinearGradient colors={['#403306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo
          name="spotify"
          color={'white'}
          size={80}
          style={{textAlign: 'center'}}
        />
        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spotify!
        </Text>
        <View style={{height: 80}} />
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate('Main')}
          >
          <Text>Sig In with Spotify</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={styles.phoneButtonText}>
            Continue with phone number
          </Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <AntDesign name="google" size={24} color={'white'} />
          <Text style={styles.phoneButtonText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={styles.phoneButton}>
          <Entypo name="facebook" size={24} color="white" />
          <Text style={styles.phoneButtonText}>Continue with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 40,
    marginTop: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#1db954',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneButton: {
    backgroundColor: '#131624',
    borderWidth: 0.8,
    borderColor: '#c0c0c0',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
    alignItems: 'center',
    width: 300,
    borderRadius: 25,
    flexDirection: 'row',
  },
  phoneButtonText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
