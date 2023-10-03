// ... (other imports)
import React, {
    createContext,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
  } from 'react';
  import ChatContext from '../../components/ChatContext';
import {createHook} from 'customization-implementation';

import events, {EventPersistLevel} from '../../rtm-events-api';
import {EventActions, EventNames} from '../../rtm-events';
import {useParams} from '../../components/Router';
import {PropsContext} from '../../../agora-rn-uikit';
import Toast from '../../../react-native-toast-message';
  
  // ... (other imports)
  
  export interface RaiseHandContextInterface {
    raiseHand: () => void;
    lowerHand: boolean;
    isHandRaised: boolean;
    loweredHand: () => void

  }
  
  const RaiseHandContext = createContext<RaiseHandContextInterface>({
    raiseHand: () => {},
    loweredHand: () => {},
    lowerHand:false,
    isHandRaised: false,
  });
  
  interface RaiseHandProviderProps {
    children: React.ReactNode;
    value: {
      setRaiseHandActive: React.Dispatch<SetStateAction<boolean>>;
      isRaiseHandActive: boolean;
    };
  }
  
  const RaiseHandProvider = (props: RaiseHandProviderProps) => {
    const { setRaiseHandActive, isRaiseHandActive } = props?.value;
    const { phrase } = useParams<{ phrase: string }>();
    const { localUid } = useContext(ChatContext);

    const  loweredHand = () => {
           // Send a message to notify others about raising the hand
      events.send(
        EventNames.RAISED_ATTRIBUTE, // Define an event name for hand raised
        JSON.stringify({
          action: EventActions.HAND_RAISED,
          value: `${localUid}`,
        }),
        EventPersistLevel.LEVEL3,
      );
        Toast.show({
            type: 'info', // Adjust the notification type accordingly
            text1: 'Hand Lowered!',
            visibilityTime: 1000,
          });
    }
    const raiseHand = () => {
      // Logic to raise the hand
  
      // Send a message to notify others about raising the hand
      events.send(
        EventNames.RAISED_ATTRIBUTE, // Define an event name for hand raised
        JSON.stringify({
          action: EventActions.HAND_RAISED,
          value: `${localUid}`,
        }),
        EventPersistLevel.LEVEL3,
      );
  
      // Show a notification to the user
      Toast.show({
        type: 'info', // Adjust the notification type accordingly
        text1: 'Hand Raised!',
        visibilityTime: 1000,
      });
    };
  
    return (
      <RaiseHandContext.Provider
        value={{
          raiseHand, // Add the raiseHand function to the context
          isHandRaised : true,
          lowerHand :true,
          loweredHand,
          
        }}>
        {props.children}
      </RaiseHandContext.Provider>
    );
  };
  
  // ... (other code)
const useRaiseHand = createHook(RaiseHandContext);
  
  export { RaiseHandProvider, useRaiseHand };
  