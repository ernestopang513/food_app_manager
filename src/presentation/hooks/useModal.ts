import { useState } from 'react';

type ModalState = {
  visible: boolean;
  disabled: boolean;
};

export const useModal = () => {
  const [state, setState] = useState<ModalState>({
    visible: false,
    disabled: false,
  });

  const openModal = (disable = false) => {
    setState({ visible: true, disabled: disable });
  };

  const closeModal = () => {
    setState({ visible: false, disabled: false });
  };

  const setDisabled = (disabled: boolean) => {
    setState((prev) => ({ ...prev, disabled }));
  };

  return {
    visible: state.visible,
    disabled: state.disabled,
    openModal,
    closeModal,
    setDisabled,
  };
};
