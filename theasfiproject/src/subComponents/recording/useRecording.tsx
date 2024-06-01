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
import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {gql, useMutation} from '@apollo/client';
import {useParams} from '../../components/Router';
import {PropsContext} from '../../../agora-rn-uikit';
import Toast from '../../../react-native-toast-message';
import {createHook} from 'customization-implementation';
import {useString} from '../../utils/useString';
import ChatContext from '../../components/ChatContext';
import events, {EventPersistLevel} from '../../rtm-events-api';
import {EventActions, EventNames} from '../../rtm-events';
import useRecordingLayoutQuery from './useRecordingLayoutQuery';
import {useScreenContext} from '../../components/contexts/ScreenShareContext';
import AgoraRTC from 'agora-rtc-sdk-ng';
const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });


export interface RecordingContextInterface {
  startRecording: () => void;
  stopRecording: () => void;
  isRecordingActive: boolean;
}

const RecordingContext = createContext<RecordingContextInterface>({
  startRecording: () => {},
  stopRecording: () => {},
  isRecordingActive: false,
});

const START_RECORDING = gql`
  mutation startRecordingSession($passphrase: String!, $secret: String) {
    startRecordingSession(passphrase: $passphrase, secret: $secret)
  }
`;

const STOP_RECORDING = gql`
  mutation stopRecordingSession($passphrase: String!) {
    stopRecordingSession(passphrase: $passphrase)
  }
`;

/**
 * Component to start / stop Agora cloud recording.
 * Sends a control message to all users in the channel over RTM to indicate that
 * Cloud recording has started/stopped.
 */
function usePrevious<T = any>(value: any) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface RecordingProviderProps {
  children: React.ReactNode;
  value: {
    setRecordingActive: React.Dispatch<SetStateAction<boolean>>;
    isRecordingActive: boolean;
  };
}

/**
 * Component to start / stop Agora cloud recording.
 * Sends a control message to all users in the channel over RTM to indicate that
 * Cloud recording has started/stopped.
 */

const RecordingProvider = (props: RecordingProviderProps) => {
  const {rtcProps} = useContext(PropsContext);
  const {setRecordingActive, isRecordingActive} = props?.value;
  const {phrase} = useParams<{phrase: string}>();
  const [startRecordingQuery] = useMutation(START_RECORDING);
  const [stopRecordingQuery] = useMutation(STOP_RECORDING);
  const prevRecordingState = usePrevious<{isRecordingActive: boolean}>({
    isRecordingActive,
  });
  //commented for v1 release
  //const recordingStartedText = useString<boolean>('recordingNotificationLabel');
  const recordingStartedText = (active: boolean) =>
    active ? 'Recording Started' : 'Recording Stopped';
  const {executePresenterQuery, executeNormalQuery} = useRecordingLayoutQuery();
  const {localUid} = useContext(ChatContext);
  const {screenShareData} = useScreenContext();

  React.useEffect(() => {
    events.on(EventNames.RECORDING_ATTRIBUTE, (data) => {
      const payload = JSON.parse(data.payload);
      const action = payload.action;
      const value = payload.value;

      switch (action) {
        case EventActions.RECORDING_STARTED:
          setRecordingActive(true);
          break;
        case EventActions.RECORDING_STOPPED:
          setRecordingActive(false);
          break;
        default:
          break;
      }
    });
    () => {
      events.off(EventNames.RECORDING_ATTRIBUTE);
    };
  }, []);

  useEffect(() => {
    /**
     * The below check makes sure the notification is triggered
     * only once. In native apps, this componenet is mounted everytime
     * when chat icon is toggle, as Controls component is hidden and
     * shown
     */
    if (prevRecordingState) {
      if (prevRecordingState?.isRecordingActive === isRecordingActive) return;
      Toast.show({
        type: 'success',
        text1: recordingStartedText(isRecordingActive),
        visibilityTime: 1000,
      });
    }
  }, [isRecordingActive]);
  const REC_BOX = []

  const startRecording = async () => {
    console.log("Recording in progress");

    events.send(
      EventNames.RECORDING_ATTRIBUTE,
      JSON.stringify({
        action: EventActions.RECORDING_STARTED,
        value: `${localUid}`,
      }),
      EventPersistLevel.LEVEL3,
    );
    // 2. set the local recording state to true to update the UI
    startRecordingLive()
    setRecordingActive(true);
 
  };
  
  const stopRecording = async () => {

    events.send(
      EventNames.RECORDING_ATTRIBUTE,
      JSON.stringify({
        action: EventActions.RECORDING_STOPPED,
        value: '',
      }),
      EventPersistLevel.LEVEL3,
    );
    // 2. set the local recording state to false to update the UI
    stopRecordingLive()
    setRecordingActive(false);
  };

  return (
    <RecordingContext.Provider
      value={{
        startRecording,
        stopRecording,
        isRecordingActive,
      }}>
      {props.children}
    </RecordingContext.Provider>
  );
};
/**
 * The Recording app state governs the App Builder cloud recording functionality.
 */
const useRecording = createHook(RecordingContext);

export {RecordingProvider, useRecording};
