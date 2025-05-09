import React, { useContext } from "react"
import Modal from "react-modal"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { ErrorModalContext } from "../contexts/error"

Modal.setAppElement(`#___gatsby`)
Modal.defaultStyles.overlay.zIndex = 9999

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  z-index: 100;
  box-sizing: border-box;
  background-color: #d9d9d9;
  color: #000;
  width: 750px;
  max-width: 100%;
  padding: 2rem 1rem;
  position: relative;
  @media only screen and (max-width: 1024px) {
    width: 768px;
    padding: 2rem 4rem;
  }
  @media only screen and (max-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 468px) {
    width: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 51px;
      margin-top: 2rem;
      text-transform: uppercase;
    }
    .error-message {
      font-size: 26px;
      text-transform: uppercase;
      text-align: center;
    }
    .btn {
      font-size: 32px;
      padding: 15px 30px;
    }
  }
  .error-icon {
    transform: translateX(15%);
  }
`

Container.displayName = "Container"

const ErrorModal: React.FC = () => {
  const {
    errorModalIsOpen,
    closeErrorModal,
    onAfterOpen,
    onAfterClose,
    errorMsg,
  } = useContext(ErrorModalContext)

  const handleClose = () => {
    closeErrorModal()
  }

  return (
    <StyledModal
      isOpen={errorModalIsOpen}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={closeErrorModal}
      contentLabel="Error"
    >
      <Container>
        <div className="content">
          <StaticImage
            className="error-icon"
            placeholder="blurred"
            src="../images/error-ghost.png"
            alt="Error"
          />
          <h3>ERROR!</h3>
          <p className="error-message">{errorMsg}</p>
          <button type="button" className="btn" onClick={handleClose}>
            OKAY
          </button>
        </div>
      </Container>
    </StyledModal>
  )
}

export default ErrorModal
