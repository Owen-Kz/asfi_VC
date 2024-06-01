
import React from 'react';
import {createHook} from 'customization-implementation';

export enum ButtonTemplateName {
  topBar,
  bottomBar,
}

export interface ButtonTemplateInferface {
  buttonTemplateName?: ButtonTemplateName;
}

const ButtonTemplateContext = React.createContext<ButtonTemplateInferface>({
  buttonTemplateName: undefined,
});

interface ButtonTemplateProviderProps {
  value: ButtonTemplateInferface;
  children: React.ReactNode;
}
const ButtonTemplateProvider = (props: ButtonTemplateProviderProps) => {
  return (
    <ButtonTemplateContext.Provider value={{...props.value}}>
      {props.children}
    </ButtonTemplateContext.Provider>
  );
};

const useButtonTemplate = createHook(ButtonTemplateContext);

export {ButtonTemplateProvider, useButtonTemplate};
