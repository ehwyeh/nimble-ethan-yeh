import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const portalRoot = document.getElementById('portal-root');

const BaseModal = ({ children }) => {
  const modalRoot = React.useRef(null);
  const modalRef = React.useRef(null);

  if (modalRoot.current === null) {
    modalRoot.current = document.createElement('div');
    modalRoot.current.style.display = 'contents';
  }

  useEffect(() => {
    const modalEl = modalRef.current;

    portalRoot.appendChild(modalRoot.current);
    disableBodyScroll(modalEl);

    return () => {
      enableBodyScroll(modalEl);
      modalRoot.current.remove();
    };
  }, []);

  return (
    modalRoot.current &&
    ReactDOM.createPortal(
      <>
        <Overlay />
        <Container ref={modalRef}>{children}</Container>
      </>,
      modalRoot.current
    )
  );
};

const Overlay = styled.div`
  z-index: 100;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  z-index: 101;

  position: fixed;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);

  background-color: #ffffff;

  width: 850px;
  border-radius: 3px;

  @media screen and (max-width: 850px) {
    top: 40%;
    transform: translate(-50%, -40%);
    max-width: 95vw;
  }

  animation: ${fadeIn} 300ms ease-in-out;
`;

export default BaseModal;