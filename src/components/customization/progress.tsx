import React from "react"
import styled from "styled-components"

const Component = styled.div`
  display: flex;
  flex-direction: row;
  .marker {
    color: var(--color-grey-dark);
    flex: 1;
    font-size: 0.75rem;
    text-align: center;
    &.active {
      color: #000;
      .circle {
        background-color: #000;
      }
    }
  }
  .circle {
    background-color: var(--color-grey-dark);
    border-radius: 50%;
    height: 20px;
    width: 20px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
  }
  .path {
    flex: 1;
    &:after {
      content: " ";
      display: table;
      border: 1px solid var(--color-grey-dark);
      height: 1px;
      width: 180%;
      margin-left: -40%;
      margin-top: 9px;
    }
    &.active {
      &:after {
        border-color: #000;
      }
    }
  }
`

const CustomizationProgress = ({ step }: { step: number }) => (
  <Component>
    <div className="marker active">
      <div className="circle active" />
      <div className="label">RX TYPE</div>
    </div>
    <div className={`path ${step >= 2 && "active"}`} />
    <div className={`marker ${step >= 2 && "active"}`}>
      <div className="circle" />
      <div className="label">LENS TYPE</div>
    </div>
    <div className={`path ${step >= 3 && "active"}`} />
    <div className={`marker ${step >= 3 && "active"}`}>
      <div className="circle" />
      <div className="label">LENS MATERIAL</div>
    </div>
    <div className={`path ${step >= 4 && "active"}`} />
    <div className={`marker ${step >= 4 && "active"}`}>
      <div className="circle" />
      <div className="label">LENS COATING</div>
    </div>
    <div className={`path ${step >= 5 && "active"}`} />
    <div className={`marker ${step >= 5 && "active"}`}>
      <div className="circle" />
      <div className="label">REVIEW</div>
    </div>
  </Component>
)

export default CustomizationProgress
