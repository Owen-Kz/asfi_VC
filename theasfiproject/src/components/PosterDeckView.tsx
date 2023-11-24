import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput} from 'react-native';
import DeckItem from '../subComponents/deckItem';

import {isIOS, isValidReactComponent, isWebInternal} from '../utils/common';
import { useMeetingInfo } from './meeting-info/useMeetingInfo';




const PosterDeckView  = () => {
    const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isSmall = dim[0] < 700;
  const {
    data: {meetingTitle, isHost, channel, encryptionSecret},
  } = useMeetingInfo();

  return (
    <View style={
          isWebInternal()
            ? !isSmall
              ? styles.deckMain
              : styles.deckMainNative
            : styles.deckMainNative
        }>   
  

        <View style={styles.posterDeckContainerHeader}>
        <Text>Poster Decks</Text>
        </View>
      <View style={styles.deckContainer} testID='posterDeckListContainer'>
        <View style={styles.deckContainer}>
        <iframe
          src={`https://asfischolar.com/posterlist/${encryptionSecret}`} // URL of the page to embed
          title="Poster Decks Container"
          width="100%"
          height="500px"
        />
      </View>
        {/* <DeckItem /> */}  

        {/* Repeat the above structure for other posters */}
      </View>
    </View>
 
 
  );
};

const styles = StyleSheet.create({
  deckMain: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: 0.5,
    shadowOffset: {width: -2, height: 1},
    shadowRadius: 3,
  },
  posterDeckContainerHeader:{
    fontWeight:"bold",
    width:"100%",
    display:"flex",
    textAlign:"center",
    alignItems:"center",
    paddding:"10px",
    fontSize: "20px",
    borderBottom: "1px solid grey",
    backgroundColor: '#f1f1f1',
  },
  deckMainNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    right: 0,
    bottom: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
  deckContainer: {
    // backgroundColor: 'rgba(128, 0, 128, 0.151)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    margin: 'auto',
    scrollbarWidth: '5px',
    flex: 1,
    alignItems:"center",
    backgroundColor: '#f1f1f1',
  },
  WebKitScrollBar: {
    backgroundColor:"red",
  },

  

});

export default PosterDeckView;
