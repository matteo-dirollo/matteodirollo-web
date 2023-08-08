import React from 'react';
import { useSelector } from 'react-redux';
import SignUp from '@/components/layout/LogModals/SignUp';
import SignIn from '@/components/layout/LogModals/SignIn';


export default function ModalManager() {
    const modalLookup = {
      SignIn,
      SignUp,
      // ShareOnSocials
    };
    const currentModal = useSelector((state) => state.modals);
    let renderedModal;
    if (currentModal) {
      const { modalType, modalProps } = currentModal;
      const ModalComponent = modalLookup[modalType];
      renderedModal = <ModalComponent {...modalProps} />;
    }
  
    return <span>{renderedModal}</span>;
  }