import * as React from "react";
import {
  Modal as PaperModal,
  Portal,
  Text,
  Button,
  Provider,
} from "react-native-paper";

interface IModal {
  text: string;
  visible: boolean;
  onClose: any;
}
const Modal: React.FC<IModal> = ({ text, visible, onClose }) => {
  const [isVisible, setisVisible] = React.useState<boolean>(visible);

  //   const showModal = () => setisVisible(true);
  //   const hideModal = () => setisVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Provider>
      <Portal>
        <PaperModal
          visible={visible}
          onDismiss={onClose}
          contentContainerStyle={containerStyle}
        >
          <Text>{text}</Text>
        </PaperModal>
      </Portal>
    </Provider>
  );
};

export default Modal;
