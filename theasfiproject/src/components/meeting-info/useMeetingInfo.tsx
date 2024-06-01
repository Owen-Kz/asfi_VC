
import React, {createContext} from 'react';
import {createHook} from 'customization-implementation';
import {UidType} from '../../../agora-rn-uikit';
export interface MeetingInfoContextInterface {
  isJoinDataFetched?: boolean;
  data?: {
    isHost: boolean;
    meetingTitle: string;
    raiseHand:boolean;
    roomId: {
      attendee: string;
      host?: string;
    };
    pstn?: {
      number: string;
      pin: string;
    };
    isSeparateHostLink: boolean;
    channel?: string;
    uid?: UidType;
    token?: string;
    rtmToken?: string;
    encryptionSecret?: string;
    screenShareUid?: string;
    screenShareToken?: string;
  };
}

export const MeetingInfoDefaultValue: MeetingInfoContextInterface = {
  isJoinDataFetched: false,
  data: {
    isHost: false,
    raiseHand: true,
    meetingTitle: '',
    roomId: {
      attendee: '',
    },
    isSeparateHostLink: true,
  },
};

const MeetingInfoContext = createContext(MeetingInfoDefaultValue);

interface MeetingInfoProviderProps {
  children: React.ReactNode;
  value: MeetingInfoContextInterface;
}

const MeetingInfoProvider = (props: MeetingInfoProviderProps) => {
  return (
    <MeetingInfoContext.Provider value={{...props.value}}>
      {props.children}
    </MeetingInfoContext.Provider>
  );
};
/**
 * The MeetingInfo app state contains information about the active meeting.
 */
const useMeetingInfo = createHook(MeetingInfoContext);

export {MeetingInfoProvider, useMeetingInfo};
