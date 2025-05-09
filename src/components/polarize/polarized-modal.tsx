import React, { useRef } from "react"
import { useClickAway } from "react-use"
import Modal from "react-modal"
import styled from "styled-components"
import PolarizedSlider from "./polarized-slider"
import { VscClose } from "react-icons/vsc"

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
  background-color: #e5e5e5;
  color: #000;
  width: 900px;
  max-width: 100%;
  position: relative;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  @media only screen and (max-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 395px;
  }
  @media only screen and (max-width: 325px) {
    width: 280px;
  }
  @media only screen and (max-width: 350px) {
    width: 325px;
  }
  @media only screen and (max-width: 468px) {
    width: 350px;
  }
  p {
    font-family: var(--sub-heading-font);
    margin-bottom: 0;
    font-weight: normal;
    letter-spacing: normal;
  }
  .heading {
    font-size: 1.5rem;
    margin-bottom: 18px;
  }
  .description {
    margin-bottom: 20px;
  }

  .close-btn {
    position: absolute;
    right: 5px;
    top: 8px;
    cursor: pointer;
    text-align: right;
    padding: 0px 3px 3px 3px;
    svg {
      text-align: right;
      font-size: 1.65rem;
    }
  }
`

const PolarizedModal = ({
  showPolarizedModal,
  setShowPolarizedModal,
}: {
  showPolarizedModal: boolean
  setShowPolarizedModal: (value: boolean) => void
}) => {
  const closeModal = () => {
    setShowPolarizedModal(false)
  }

  const clickRef = useRef(null)

  useClickAway(clickRef, () => {
    closeModal()
  })

  return (
    <>
      <StyledModal isOpen={showPolarizedModal} onRequestClose={closeModal}>
        <Container ref={clickRef}>
          <div className="close-btn" onClick={() => closeModal()}>
            <VscClose className="text-btn" />
          </div>
          <p className="heading">Polarized Lenses</p>
          <p className="description">
            Polarized lenses reduce flare across surfaces deflecting the sun's
            rays. They can help reduce eyestrain, especially for those who spend
            a lot of time outdoors, around water, or in snow.
          </p>
          <PolarizedSlider />
        </Container>
      </StyledModal>
    </>
  )
}

export default PolarizedModal
