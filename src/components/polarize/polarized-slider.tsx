import React from "react"
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider"
import styled from "styled-components"
import { useWindowSize } from "react-use"

const Component = styled.section`
  margin-bottom: 35px;
  width: 100%;
  object-fit: cover;
  display: flex;
  img {
    object-fit: fill !important;
  }
  .__rcs-handle-button {
    gap: 4px !important;
    div {
      border-top: 3px solid transparent !important;
      border-bottom: 3px solid transparent !important;
      border-right: 5px solid !important;
    }
  }
  @media screen and (max-width: 480px) {
    height: 300px;
    img {
      object-fit: cover !important;
      object-position: left left !important;
    }
  }
`

const PolarizedSlider = () => {
  const screenWidth = useWindowSize().width
  return (
    <Component>
      <ReactCompareSlider
        portrait={screenWidth < 481 ? true : false}
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              width: "25px",
              height: "25px",
            }}
            linesStyle={{ opacity: 0 }}
            portrait={screenWidth < 481 ? true : false}
          />
        }
        itemOne={
          <ReactCompareSliderImage
            src={
              screenWidth < 481
                ? "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/non-polarized_example.jpg?v=1667953118"
                : "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/non-polarized_example_desktop.jpg?v=1667953118"
            }
            alt="Non-Polarized"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={
              screenWidth < 481
                ? "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/polarized_example.jpg?v=1667953118"
                : "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/polarized_example-_desktop.jpg?v=1667953118"
            }
            alt="Polarized"
          />
        }
      />
    </Component>
  )
}

export default PolarizedSlider
