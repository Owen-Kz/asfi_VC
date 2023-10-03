/*
********************************************
 Copyright © 2023 [Your Company Name], all rights reserved.
 [Your App Name] and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by [Your Company Name] and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from [Your Company Name].  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to [Your Company Name]’s business) is strictly prohibited.
*********************************************
*/

import React from 'react';
import { BtnTemplate, BtnTemplateInterface } from '../../agora-rn-uikit';
import { useRaiseHand } from './raisehand/useRaiseHand'; // You'll need to define this hook
import {
  ButtonTemplateName,
  useButtonTemplate,
} from '../utils/useButtonTemplate';
import Styles from '../components/styles';

export interface RaiseHandButtonProps {
  buttonTemplateName?: ButtonTemplateName;
  render?: (
    onPress: () => void,
    isHandRaised: boolean,
    buttonTemplateName?: ButtonTemplateName,
  ) => JSX.Element;
}

const RaiseHandButton = (props: RaiseHandButtonProps) => {
  const { raiseHand, lowerHand, isHandRaised, loweredHand } = useRaiseHand(); // You'll need to define this hook
  const defaultTemplateValue = useButtonTemplate().buttonTemplateName;
  const { buttonTemplateName = defaultTemplateValue } = props;

  const onPress = () => {
    if (!isHandRaised) {
      raiseHand && raiseHand();
    } else {
      lowerHand && loweredHand();
    }
  };

  let btnTemplateProps: BtnTemplateInterface = {
    name: isHandRaised ? 'raiseHandActiveIcon' : 'raiseHandIcon',
    onPress,
    color: isHandRaised ? '#00FF00' : $config.PRIMARY_COLOR, // Adjust the color accordingly
  };

  if (buttonTemplateName === ButtonTemplateName.topBar) {
    btnTemplateProps.style = Styles.fullWidthButton as Object;
  } else {
    btnTemplateProps.btnText = isHandRaised ? 'Hand Raised' : 'Raise Hand';
    btnTemplateProps.style = Styles.localButton as Object;
  }

  return props?.render ? (
    props.render(onPress, isHandRaised, buttonTemplateName)
  ) : (
    <BtnTemplate {...btnTemplateProps} />
  );
};

export default RaiseHandButton;
