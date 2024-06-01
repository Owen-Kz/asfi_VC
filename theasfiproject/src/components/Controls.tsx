/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useState, useContext} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {PropsContext, RaiseHand} from '../../agora-rn-uikit';
import LocalAudioMute, {
  LocalAudioMuteProps,
} from '../subComponents/LocalAudioMute';
import LocalVideoMute, {
  LocalVideoMuteProps,
} from '../subComponents/LocalVideoMute';
import Recording, {RecordingButtonProps} from '../subComponents/Recording';
import RaiseHandButton, {RaiseHandButtonProps} from '../subComponents/RaiseHandButton';

import LocalSwitchCamera, {
  LocalSwitchCameraProps,
} from '../subComponents/LocalSwitchCamera';
import ScreenshareButton, {
  ScreenshareButtonProps,
} from '../subComponents/screenshare/ScreenshareButton';
import {controlsHolder} from '../../theme.json';
import isMobileOrTablet from '../utils/isMobileOrTablet';
import {ClientRole} from '../../agora-rn-uikit';
import LiveStreamControls, {
  LiveStreamControlsProps,
} from './livestream/views/LiveStreamControls';
import {isWebInternal} from '../utils/common';
import {useMeetingInfo} from './meeting-info/useMeetingInfo';
import LocalEndcall, {LocalEndcallProps} from '../subComponents/LocalEndCall';
import RemoteEndCall, { RemoteEndCallProps } from '../subComponents/RemoteEndCall';

import  LocalRaiseHand  from '../subComponents/raisehand/controls/LocalRaiseHand';
import CopyJoinInfo, {CopyJoinInfoProps} from '../subComponents/CopyJoinInfo';
import CopyAttendeeInfo, {CopyAttendeeInfoProps} from '../subComponents/CopyAttendee';

const Controls = () => {
  const {rtcProps} = useContext(PropsContext);

  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isDesktop = dim[0] > 1224;
  const {
    data: {isHost},
  } = useMeetingInfo();
  return (
    <View
      style={[
        style.controlsHolder,
        {
          paddingHorizontal: isDesktop ? '25%' : '1%',
          backgroundColor: $config.SECONDARY_FONT_COLOR + 80,
        },
      ]}
      onLayout={onLayout}>
      {$config.EVENT_MODE && rtcProps.role == ClientRole.Audience ? (
        <LiveStreamControls showControls={true} />
      ) : (
        <>
          {/**
           * In event mode when raise hand feature is active
           * and audience is promoted to host, the audience can also
           * demote himself
           */}
          {$config.EVENT_MODE && (
            <LiveStreamControls
              showControls={rtcProps?.role == ClientRole.Broadcaster && !isHost}
            />
          )}
          <View style={{alignSelf: 'center'}}>
            <LocalAudioMute />
          </View>
          {!$config.AUDIO_ROOM && (
            <View style={{alignSelf: 'center'}}>
              <LocalVideoMute />
            </View>
          )}
          {!$config.AUDIO_ROOM && isMobileOrTablet() && (
            <View style={{alignSelf: 'center'}}>
              <LocalSwitchCamera />
            </View>
          )}
        
          {$config.SCREEN_SHARING && !isMobileOrTablet() && (
            <View style={{alignSelf: 'center'}}>
              <ScreenshareButton />
            </View>
          )}

            <View style={{alignSelf: 'center'}}>
          <LocalEndcall />
          </View>
          
        {/* {isHost  && (
            <View style={{alignSelf: 'center'}}>
        <RemoteEndCall uid={rtcProps.uid} isHost={isHost} />
        </View>
           )} */}

          {isHost && $config.CLOUD_RECORDING && (
            <View style={{alignSelf: 'center'}}>
              <Recording />
            </View>
          )}
          {isHost ?
           <View style={{alignSelf: 'center'}}><CopyJoinInfo /></View>
            : ''
          }
          <View style={{alignSelf: 'center'}}> <CopyAttendeeInfo /> </View>

            {!isHost && $config.RAISE_HAND && (
            <View style={{alignSelf: 'center'}}>
              <LocalRaiseHand />
            </View>
          )}
        </>
      )}
 
    </View>
  );
};

type ControlsComponentsArrayProps = [
  (props: LocalAudioMuteProps) => JSX.Element,
  (props: LocalVideoMuteProps) => JSX.Element,
  (props: LocalSwitchCameraProps) => JSX.Element,
  (props: ScreenshareButtonProps) => JSX.Element,
  (props: RecordingButtonProps) => JSX.Element,
  (props: RaiseHandButtonProps) => JSX.Element,
  (props: LocalEndcallProps) => JSX.Element,
  (props: LiveStreamControlsProps) => JSX.Element,
  (props: CopyAttendeeInfoProps) => JSX.Element,
  (props: CopyJoinInfoProps) => JSX.Element,
  (props: RemoteEndCallProps) => JSX.Element,




];

export const ControlsComponentsArray: ControlsComponentsArrayProps = [
  LocalAudioMute,
  LocalVideoMute,
  LocalSwitchCamera,
  ScreenshareButton,
  Recording,
  RaiseHandButton,
  LocalEndcall,
  LiveStreamControls,
  CopyAttendeeInfo,
  CopyJoinInfo,
  RemoteEndCall,
];

const style = StyleSheet.create({
  // @ts-ignore
  controlsHolder: {
    flex: isWebInternal() ? 1.3 : 1.6,
    ...controlsHolder,
  },
});

export default Controls;
