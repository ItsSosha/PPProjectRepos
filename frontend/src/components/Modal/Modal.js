import styled from "styled-components";
import { Zoom } from "@mui/material";
import { Modal as ModalWrapper } from "@mui/material";
import { forwardRef } from "react";

const ModalContent = styled.div`
  padding: 3em 10em;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1em;
  max-width: 920px;
`;

const Transition = forwardRef((props, ref) => {
  return <Zoom ref={ref} {...props} />;
});

const Modal = ({ open, onModalClose, children }) => {
  return (
    <ModalWrapper
      open={open}
      onClose={onModalClose}
      closeAfterTransition
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Transition in={open}>
        <ModalContent>
          {children}
        </ModalContent>
      </Transition>
    </ModalWrapper>
  );
};

export default Modal;
