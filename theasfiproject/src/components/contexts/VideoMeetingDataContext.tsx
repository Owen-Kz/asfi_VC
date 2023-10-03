import React, {createContext, useState, useEffect, useContext} from 'react';
import {createHook} from 'customization-implementation';
import {UidType, useLocalUid} from '../../../agora-rn-uikit';
import {useMeetingInfo} from '../meeting-info/useMeetingInfo';
import events, {EventPersistLevel} from '../../rtm-events-api';
import {EventNames} from '../../rtm-events';
import ChatContext from '../ChatContext';
import {filterObject} from '../../utils';
import {useRender} from 'customization-api';
import {ClientRole} from '../../../agora-rn-uikit';


import LiveStreamContext, {
  raiseHandListInterface,
} from '../../components/livestream';
export interface VideoMeetingDataInterface {
  hostUids: UidType[];
  attendeeUids: UidType[];
  liveStreamData: raiseHandListInterface;
}
const VideoMeetingData = createContext<VideoMeetingDataInterface>({
  hostUids: [],
  attendeeUids: [],
  liveStreamData:{}

});

interface VideoMeetingDataProviderProps {
  children: React.ReactNode;
}
const VideoMeetingDataProvider = (props: VideoMeetingDataProviderProps) => {
  const {
    data: {isHost},
  } = useMeetingInfo();
  const {renderList} = useRender();

  const {hasUserJoinedRTM} = useContext(ChatContext);
  const localUid = useLocalUid();
  const {raiseHandList} = useContext(LiveStreamContext);
  const [hostUids, setHostUids] = useState<UidType[]>([]);
  const [attendeeUids, setAttendeeUids] = useState<UidType[]>([]);

  useEffect(() => {
    //set local uid
    isHost ? setHostUids([localUid]) : setAttendeeUids([localUid]);

    //listen for remote user role
    //if remote user is host then add it in the hostUids
    events.on(EventNames.VIDEO_MEETING_HOST, (data) => {
      const payload = JSON.parse(data?.payload);
      const hostUid = payload?.uid;
      if (hostUid && hostUids.indexOf(hostUid) === -1) {
        setHostUids((prevState) => [...prevState, hostUid]);
      }
    });

    //if remote user is not host then add it in the attendeeUids
    events.on(EventNames.VIDEO_MEETING_ATTENDEE, (data) => {
      const payload = JSON.parse(data?.payload);
      const attendeeUid = payload?.uid;
      if (attendeeUid && attendeeUids.indexOf(attendeeUid) === -1) {
        setAttendeeUids((prevState) => [...prevState, attendeeUid]);
      }
    });

    return () => {
      events.off(EventNames.VIDEO_MEETING_HOST);
      events.off(EventNames.VIDEO_MEETING_ATTENDEE);
    };
  }, []);

  useEffect(() => {
    //hasUserJoinedRTM ensure that RTM login successful and events can be sent.
    // if (Object.keys(renderList).length !== 0) {
      
    if (hasUserJoinedRTM) {
      const hostList = filterObject(
        renderList,
        ([k, v]) =>
          (v?.type === 'rtc' ||
            v?.type === 'meeting' ||
            (v?.type === 'screenshare' && v?.video == 1)) &&
          (raiseHandList[k]
            ? raiseHandList[k]?.role == ClientRole.Broadcaster
            : true) &&
          !v?.offline,
      );
      const audienceList = filterObject(
        renderList,
        ([k, v]) =>
          (v?.type === 'rtc' || v?.type === 'meeting') &&
          raiseHandList[k]?.role == ClientRole.Attendee &&
          !v.offline,
      );
      //send user role event so newly joining user will get the previous user role details
      events.send(
        isHost
          ? EventNames.VIDEO_MEETING_HOST
          : EventNames.VIDEO_MEETING_ATTENDEE,
        JSON.stringify({uid: localUid}),
        EventPersistLevel.LEVEL2,
      );
    }
  }, [isHost, hasUserJoinedRTM, raiseHandList])

  return (
    <VideoMeetingData.Provider
      value={{
        hostUids,
        attendeeUids,
        liveStreamData: raiseHandList,
      }}>
      {props.children}
    </VideoMeetingData.Provider>
  );
};
const useVideoMeetingData = createHook(VideoMeetingData);

export {useVideoMeetingData, VideoMeetingDataProvider};
