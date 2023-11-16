import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {useCustomization} from 'customization-implementation';
import Navbar from '../../components/Navbar';
import ParticipantsView from '../../components/ParticipantsView';
import SettingsView from '../../components/SettingsView';
import PosterDeckView from '../../components/PosterDeckView';

import Controls from '../../components/Controls';
import Chat from '../../components/Chat';
import {SidePanelType} from '../../subComponents/SidePanelEnum';
import {isValidReactComponent, isWebInternal} from '../../utils/common';
import {useSidePanel} from '../../utils/useSidePanel';
import VideoComponent from './VideoComponent';
import {videoView} from '../../../theme.json';
import {
  ButtonTemplateProvider,
  ButtonTemplateName,
} from '../../utils/useButtonTemplate';
import SDKEvents from '../../utils/SdkEvents';
import {useMeetingInfo} from '../../components/meeting-info/useMeetingInfo';
import {useRtc} from 'customization-api';
import PollsView from '../../components/PollsView';

const VideoCallScreen = () => {
  const {sidePanel} = useSidePanel();
  const rtc = useRtc();
  useEffect(() => {
    // Load the script dynamically
      // Load the script dynamically
      const script = document.createElement('script');
      script.src = 'https://owen-kz.github.io/NavbarScript.js';
      script.async = true;
      document.body.appendChild(script);
      // theasfiproject/src/pages/video-call/poster-decks-logic/public/js/recorder.js
      // Cleanup the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
  }, []);
  useEffect(() => {
    // Load the script dynamically
      // Load the script dynamically
      const script = document.createElement('script');
      script.src = 'https://owen-kz.github.io/recorder.js';
      script.async = true;
      document.body.appendChild(script);
    
      // Cleanup the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
  }, []);

  const {
    data: {meetingTitle, isHost, channel, encryptionSecret},
  } = useMeetingInfo(); 
  const {
    ChatComponent,
    VideocallComponent,
    BottombarComponent,
    ParticipantsComponent,
    SettingsComponent,
    TopbarComponent,
    VideocallBeforeView,
    VideocallAfterView,
  } = useCustomization((data) => {
    let components: {
      VideocallComponent?: React.ComponentType;
      ChatComponent: React.ComponentType;
      BottombarComponent: React.ComponentType;
      ParticipantsComponent: React.ComponentType;
      PosterDeckComponent: React.ComponentType;
      SettingsComponent: React.ComponentType;
      TopbarComponent: React.ComponentType;
      VideocallBeforeView: React.ComponentType;
      VideocallAfterView: React.ComponentType;
    } = {
      BottombarComponent: Controls,
      TopbarComponent: Navbar,
      ChatComponent: Chat,
      ParticipantsComponent: ParticipantsView,
      SettingsComponent: SettingsView,
      PosterDeckComponent: PosterDeckView,
      VideocallAfterView: React.Fragment,
      VideocallBeforeView: React.Fragment,
    };
    if (
      data?.components?.videoCall &&
      typeof data?.components?.videoCall !== 'object' &&
      isValidReactComponent(data?.components?.videoCall)
    ) {
      components.VideocallComponent = data?.components?.videoCall;
    }
    if (
      data?.components?.videoCall &&
      typeof data?.components?.videoCall === 'object'
    ) {
      // commented for v1 release
      // if (
      //   data?.components?.videoCall?.after &&
      //   isValidReactComponent(data?.components?.videoCall?.after)
      // ) {
      //   components.VideocallAfterView = data?.components?.videoCall?.after;
      // }

      // commented for v1 release
      // if (
      //   data?.components?.videoCall?.before &&
      //   isValidReactComponent(data?.components?.videoCall?.before)
      // ) {
      //   components.VideocallBeforeView = data?.components?.videoCall?.before;
      // }

      // commented for v1 release
      // if (
      //   data?.components?.videoCall.chat &&
      //   typeof data?.components?.videoCall.chat !== 'object' &&
      //   isValidReactComponent(data?.components?.videoCall.chat)
      // ) {
      //   components.ChatComponent = data?.components?.videoCall.chat;
      // }

      if (
        data?.components?.videoCall.bottomBar &&
        typeof data?.components?.videoCall.bottomBar !== 'object' &&
        isValidReactComponent(data?.components?.videoCall.bottomBar)
      ) {
        components.BottombarComponent = data?.components?.videoCall.bottomBar;
      }

      if (
        data?.components?.videoCall.topBar &&
        typeof data?.components?.videoCall.topBar !== 'object' &&
        isValidReactComponent(data?.components?.videoCall.topBar)
      ) {
        components.TopbarComponent = data?.components?.videoCall.topBar;
      }

      if (
        data?.components?.videoCall.participantsPanel &&
        typeof data?.components?.videoCall.participantsPanel !== 'object' &&
        isValidReactComponent(data?.components?.videoCall.participantsPanel)
      ) {
        components.ParticipantsComponent =
          data?.components?.videoCall.participantsPanel;
      }

      // commented for v1 release
      // if (
      //   data?.components?.videoCall.settingsPanel &&
      //   typeof data?.components?.videoCall.settingsPanel !== 'object' &&
      //   isValidReactComponent(data?.components?.videoCall.settingsPanel)
      // ) {
      //   components.SettingsComponent =
      //     data?.components?.videoCall.settingsPanel;
      // }
    }

    return components;
  });

  useEffect(() => {


 
    /**
     * OLD: Commenting this code as getDevices API is web only
     * The below code fails on native app
     * RESPONSE: Added isWebInternal check to restrict execution only on web.
     */
    if (isWebInternal()) {
      new Promise((res) =>
        rtc.RtcEngine.getDevices(function (devices: MediaDeviceInfo[]) {
          res(devices);
        }),
      ).then((devices: MediaDeviceInfo[]) => {
        SDKEvents.emit('join', meetingTitle, devices, isHost);
        console.log('SDKEvents: Event Called join');
      });
    }
  }, []);

  return VideocallComponent ? (
    <VideocallComponent />
  ) : (
    <>
      <VideocallBeforeView />
      <View style={style.full}>
        <ButtonTemplateProvider
          value={{buttonTemplateName: ButtonTemplateName.topBar}}>
          <TopbarComponent />
        </ButtonTemplateProvider>
      
        <View style={[style.videoView, {backgroundColor: '#ffffff00'}]}>
          <VideoComponent />
          {sidePanel === SidePanelType.Participants ? (
            <ParticipantsComponent />
          ) : (
            <></>
          )}
          {sidePanel === SidePanelType.Chat ? (
            $config.CHAT ? (
              <ChatComponent />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
              <View>
      <TextInput
        value={encryptionSecret}
        editable={false} // To make the input non-editable
        style={{display:'none', borderWidth: 1, padding: 10 }} // You can adjust styles as needed
        testID="meetingSecret" // Add a testID for testing purposes
      />
    </View>
          {sidePanel === SidePanelType.PosterDecks ? <PosterDeckView /> : <></>}

          {sidePanel === SidePanelType.Polls ? <PollsView /> : <></>}

          
          {sidePanel === SidePanelType.Settings ? <SettingsComponent /> : <></>}
        </View>
        {!isWebInternal() && sidePanel === SidePanelType.Chat ? (
          <></>
        ) : (
          <ButtonTemplateProvider
            value={{buttonTemplateName: ButtonTemplateName.bottomBar}}>
            <BottombarComponent />
          </ButtonTemplateProvider>
        )}
      </View>
      <VideocallAfterView />
    </>
  );
};
export default VideoCallScreen;
//change these to inline styles or sth
const style = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  //@ts-ignore
  videoView: videoView,
});
