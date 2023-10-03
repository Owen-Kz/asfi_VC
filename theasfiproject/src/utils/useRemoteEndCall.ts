import { controlMessageEnum } from '../components/ChatContext';
import { useMeetingInfo } from '../components/meeting-info/useMeetingInfo';
import useIsPSTN from './useIsPSTN';
import { UidType } from '../../agora-rn-uikit';
import events, { EventPersistLevel } from '../rtm-events-api';

const useRemoteEndCall = () => {
  const {
    data: { isHost },
  } = useMeetingInfo();
  const isPSTN = useIsPSTN();

  // Function to end the call for a specific user
  const endCallForUser = (uid: UidType) => {
    if (!isPSTN(uid)) {
      events.send(controlMessageEnum.kickUser, '', EventPersistLevel.LEVEL1, uid);
    }
  };

  return {
    endCallForAllUsers: () => {
      if (isHost) {
        // End the call for all users
        // You may iterate through a list of uids and call endCallForUser for each uid
        // For demonstration, we're assuming uidList is an array of UidType
        const uidList: UidType[] = []; // Replace with actual list of uids
        uidList.forEach((uid) => endCallForUser(uid));
      } else {
        console.error('Only the host can end the call for all users.');
      }
    },
    endCallForUser, // Function to end the call for a specific user
  };
};

export default useRemoteEndCall;
