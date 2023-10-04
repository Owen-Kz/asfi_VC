import {controlMessageEnum} from '../components/ChatContext';
import {useMeetingInfo} from '../components/meeting-info/useMeetingInfo';
import useIsPSTN from './useIsPSTN';
import {UidType} from '../../agora-rn-uikit';
import events, {EventPersistLevel} from '../rtm-events-api';
import {useRender} from 'customization-api';

/**
 * Returns a function to end the call for a remote user with the given uid.
 */
const useRemoteEndCall = () => {
  const {
    data: {isHost},
  } = useMeetingInfo();
  const isPSTN = useIsPSTN();

  return (uid: UidType) => {
    if (isHost && uid) {
      const { renderList, activeUids } = useRender();

        const renderListArray = renderList as any[];
       

      if (!isPSTN(uid)) {
        // events.send(
        //   controlMessageEnum.kickUser,
        //   '',
        //   EventPersistLevel.LEVEL1,
        //   uid,
        // );
        renderListArray.forEach((user) => {
          if (!user.isHost) {
          events.send(controlMessageEnum.kickUser, '', EventPersistLevel.LEVEL1, user.uid);
          }
        });
      }
    } else {
      console.error('A host can only remove the audience from the call.');
    }
  };
};
export default useRemoteEndCall;
