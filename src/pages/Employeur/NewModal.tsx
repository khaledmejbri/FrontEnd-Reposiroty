import React from "react";
import { Button, Modal } from "antd";

type EmptyModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  content?: React.ReactNode;
};

const NewModal: React.FC<EmptyModalProps> = ({ isVisible, onClose, onConfirm, title, content }) => {
  return (
    <Modal
      title={title || "Default Title"}
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      {content || <p>This is an empty modal. Add your content here.</p>}
    </Modal>
  );
};

export default NewModal;
