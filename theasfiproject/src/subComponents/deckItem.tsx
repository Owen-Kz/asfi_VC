import React, {useContext} from 'react';
// import {PropsContext, ClientRole} from '../../agora-rn-uikit';
// import DeviceContext from '../components/DeviceContext';
// import ColorContext from '../components/ColorContext';
// import {useString} from '../utils/useString';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageStyle, StyleProp } from 'react-native';

interface DeckItemProp {
    render?: (
      link: string,
      image: string,
      title: string,
      owner: string,
      description: string,
    ) => JSX.Element;
  }

  const DeckItem = (props: DeckItemProp) => {
    // const {linkm image, title, owner, description} = props
    return (
    <View>
      <a href="">
        <View style={styles.posterContainer}>
          <View style={styles.posterImg}>
            <View style={styles.posterImage}>
              <Image style={{width: '100%', height: '100%', }}
                resizeMode={'cover'}
                source={{uri:'https://plus.unsplash.com/premium_photo-1679756099079-84d8ab833a3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80' }} />
            </View>
          </View>
          <View style={styles.posterInfo}>
            <Text style={styles.posterTitle}>Testing Deck</Text>
            <Text>Michael Tomi</Text>
            <Text>Lorem ipsum dolor sit amet, consevubhbgg tgtghtgtgt</Text>
          </View>
        </View>
      </a>
      </View>
    ) 
  };
  

  export const DeckItemComponentsArray: ((props: DeckItemProp) => JSX.Element)[] = [DeckItem];
  const styles = StyleSheet.create({
    posterContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        height: 150,
        marginTop: '15px',
        marginLeft:"10px",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: '0px 11px 23px 0px rgba(43,43,43,0.29)',
      },
    
      posterImg: {
        backgroundColor: 'blueviolet',
        width: '40%',
        height: "100%",
      },
      posterImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      posterInfo: {
        backgroundColor: 'rgb(233, 231, 231)',
        padding: 20,
        width: '60%',
      },
      posterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
  });

export default DeckItem