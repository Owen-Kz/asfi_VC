
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import LiveStreamContext, {
  RaiseHandValue,
} from '../../../components/livestream';
import {PropsContext} from '../../../../agora-rn-uikit';
import {BtnTemplate} from '../../../../agora-rn-uikit';
import icons from '../../../assets/icons';
import {useString} from '../../../utils/useString';
import ChatContext from '../../../components/ChatContext';

const LocalPosterDeck = () => {
  const {styleProps} = useContext(PropsContext);
  const {audienceSendsRequest, audienceRecallsRequest, raiseHandList} =
    useContext(LiveStreamContext);
  const {localUid} = useContext(ChatContext);
  const {localBtnStyles} = styleProps || {};
  const {theme} = styleProps || {};
  const {muteLocalAudio} = localBtnStyles || {};
  //commented for v1 release
  //const handStatusText = useString<boolean>('raiseHandButton');
  const handStatusText = (toggle: boolean) =>
    toggle ? 'Poster Deck' : 'Poster Deck Open';
  return (
    <BtnTemplate
      icon={icons['posterdeck']}
      btnText={handStatusText(
        raiseHandList[localUid]?.raised === RaiseHandValue.TRUE,
      )}
      color={
        raiseHandList[localUid]?.raised === RaiseHandValue.TRUE
          ? '#FD0845'
          : theme
      }
      style={{
        ...style.localBtn,
        ...(localBtnStyles as object),
        ...(muteLocalAudio as object),
      }}
      onPress={() => {
        if (raiseHandList[localUid]?.raised === RaiseHandValue.TRUE) {
          audienceRecallsRequest();
        } else {
          audienceSendsRequest();
        }
      }}
    />
  );
};

const style = StyleSheet.create({
  localBtn: {
    borderRadius: 23,
    borderWidth: 4 * StyleSheet.hairlineWidth,
    borderColor: '#007aff',
    backgroundColor: '#007aff',
  },
});

export default LocalPosterDeck;
