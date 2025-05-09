import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  StaticImage,
  GatsbyImage,
  IGatsbyImageData,
  getImage,
} from "gatsby-plugin-image"
import { useLensColors } from "../hooks/useLensColors"

const Component = styled.div`
  width: 100%;
  .tr {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    text-transform: uppercase;
    border-bottom: 1px solid grey;
    margin: 1rem 0;
    padding-bottom: 1rem;
    @media only screen and (max-width: 468px) {
      grid-template-columns: 1fr;
    }
    .th {
      font-size: 1.6rem;
      font-weight: bold;
      display: flex;
      // justify-content: center;
      align-items: center;
    }
    .td {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      text-align: center;
      gap: 1rem;
      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        .gatsby-image-wrapper {
          margin: 0 auto;
          @media only screen and (max-width: 468px) {
            grid-template-columns: 1fr;
          }
        }
      }
      p {
        margin: 0;
      }
    }
  }
  .lens-frame-width {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
  }
  .lens-frame-width div {
    flex:1;
  }
`

interface Props {
  frameWidth: number
  fitDimensions: string
  lensColor: string
  lensType: string
}

enum LENSE_COLORS {
  SMOKE = "smoke",
  SMOKE_GRADIENT = "smoke gradient",
  BROWN = "brown",
  BROWN_GRADIENT = "brown gradient",
  GREEN = "green",
  GREEN_GRADIENT = "green gradient",
  G15 = "g15",
  G15_GRADIENT = "g15 gradient",
  CLEAR = "clear",
  YELLOW = "yellow",
  BURNT_ORANGE = "burnt orange",
}

const ProductDetails: React.FC<Props> = ({
  frameWidth,
  fitDimensions,
  lensColor,
  lensType,
}) => {
  const lensColors = useLensColors()
  const frameDimensions = fitDimensions.split("-")

  useEffect(() => {
    setLensData(getLensData())
  }, [lensColor, lensType])

  let imageData: IGatsbyImageData
  const getLensData = () => {
    if (lensType !== "glasses") {
      switch (lensColor) {
        case LENSE_COLORS.SMOKE:
          imageData = lensColors.smoke
          break
        case LENSE_COLORS.SMOKE_GRADIENT:
          imageData = lensColors.smoke_gradient
          break
        case LENSE_COLORS.BROWN:
          imageData = lensColors.brown
          break
        case LENSE_COLORS.BROWN_GRADIENT:
          imageData = lensColors.brown_gradient
          break
        case LENSE_COLORS.GREEN:
        case LENSE_COLORS.G15:
          imageData = lensColors.g15
          break
        case LENSE_COLORS.GREEN_GRADIENT:
        case LENSE_COLORS.G15_GRADIENT:
          imageData = lensColors.g15_gradient
          break
        case LENSE_COLORS.YELLOW:
          imageData = lensColors.yellow
          break
        case LENSE_COLORS.BURNT_ORANGE:
          imageData = lensColors.burnt_orange
          break
        default:
          imageData = lensColors.clear
      }
    } else {
      imageData = lensColors.clear
    }
    return getImage(imageData) as IGatsbyImageData
  }

  const [lensData, setLensData] = useState<IGatsbyImageData>(() =>
    getLensData()
  )

  return (
    <Component>
      <div className="tr">
        <div className="th">
          INCLUDED
          <br />
          ACCESSORIES
        </div>
        <div className="td">
          <div className="image">
            <StaticImage
              src="../images/microfiber-pouch.png"
              alt="Microfiber Pouch"
              height={80}
            />
          </div>
          <div className="image">
            <StaticImage
              src="../images/cleaning-cloth.png"
              alt="Cleaning Cloth"
              layout="fixed"
              height={80}
            />
          </div>
          <div className="image"></div>

          <div className="details">
            <p>MICROFIBER POUCH</p>
          </div>

          <div className="details">
            <p>CLEANING CLOTH</p>
          </div>

          <div className="details"></div>
        </div>
      </div>
      <div className="tr">
        <div className="th">
          PRODUCT
          <br />
          DETAILS
        </div>
        <div className="td">
          <div className="image">
            <StaticImage
              src="../images/lens-material.png"
              alt="Lens Material"
              height={70}
            />
          </div>
          <div className="image">
            <GatsbyImage
              image={lensData}
              alt={`${lensType === "glasses" ? "Clear" : lensColor} lens`}
            />
          </div>
          <div className="image">
            <StaticImage
              src="../images/frame-material.png"
              alt="Frame Material"
              height={50}
            />
          </div>

          <div className="details">
            <p>LENS MATERIAL</p>
            <p>CR-39</p>
          </div>

          <div className="details">
            <p>LENS COLOR</p>
            <p>{lensType === "glasses" ? "Clear" : lensColor}</p>
          </div>

          <div className="details">
            <p>FRAME MATERIAL</p>
            <p>HAND-CUT ACETATE</p>
          </div>
        </div>
      </div>
      <div className="tr">
        <div className="th">
          FRAME
          <br />
          DIMENSIONS
        </div>
        <div className="td">
          <div className="image">
            <StaticImage
              src="../images/lens-frame-width.png"
              alt="Lens & Frame Width"
              height={80}
            />
          </div>
          <div className="image">
            <StaticImage
              src="../images/bridge-width.png"
              alt="Bridge Width"
              height={80}
            />
          </div>
          <div className="image">
            <StaticImage
              src="../images/temple-length.png"
              alt="Temple Width"
              height={30}
            />
          </div>

          <div className="details lens-frame-width">
            <div>
              <p>FRAME WIDTH</p>
              <p>{frameWidth} mm</p>
            </div>
            <div>
              <p>LENS WIDTH</p>
              <p>{frameDimensions[0]} mm</p>
            </div>
          </div>

          <div className="details">
            <p>BRIDGE WIDTH</p>
            <p>{frameDimensions[1]} mm</p>
          </div>

          <div className="details">
            <p>TEMPLE LENGTH</p>
            <p>{frameDimensions[2]} mm</p>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default ProductDetails
