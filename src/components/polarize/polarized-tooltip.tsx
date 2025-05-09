import React from "react"
import styled from "styled-components"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import PolarizedModal from "./polarized-modal"

const Component = styled.div`
  cursor: pointer;
  svg {
    fill: #b2b2b2;
    height: 22px;
    width: 22px;
  }
  button {
    display: grid;
    place-items: center;
    background-color: unset !important;
    color: unset !important;
    border-radius: unset !important;
    font-size: unset;
    font-weight: normal;
    line-height: unset !important;
    padding: unset !important;
    text-align: center;
    vertical-align: middle !important;
    appearance: initial;
    -webkit-appearance: button-bevel;
  }
`

const PolarizedTooltip = ({
  showPolarizedModal,
  setShowPolarizedModal,
}: {
  showPolarizedModal: boolean
  setShowPolarizedModal: (value: boolean) => void
}) => {
  const openModal = evt => {
    evt.preventDefault()
    setShowPolarizedModal(!showPolarizedModal)
  }
  return (
    <>
      <PolarizedModal
        showPolarizedModal={showPolarizedModal}
        setShowPolarizedModal={setShowPolarizedModal}
      />
      <Component>
        <button
          className="polarized-tooltip"
          title="What's this?"
          onClick={evt => openModal(evt)}
        >
          <AiOutlineQuestionCircle />
        </button>
      </Component>
    </>
  )
}

export default PolarizedTooltip
