import React from "react"
import styled from "styled-components"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

const Component = styled.section`
  .image-container {
    position: relative;
    /* max-height: 435px; */
    .collection-image {
      margin: 0 -15px;
      height: 435px;
      @media screen and (max-width: 600px) {
        height: 200px;
        filter: unset !important;
      }
    }
    .inner-text {
      h1 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 2rem;
        margin-bottom: 8px;
        text-transform: uppercase;
      }
      p {
        font-family: var(--sub-heading-font);
        margin-bottom: 0;
      }
      position: absolute;
      top: 8px;
      padding: 10px 5px;
      margin-bottom: 0;
      max-width: 490px;
      @media (max-width: 600px) {
        position: static;
        max-width: unset;
        text-align: center;
        top: unset;
        left: unset;
        right: unset;
        color: black !important;
      }
    }
    .overlay-less-inner-text {
      h1 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 2rem;
        margin-bottom: 8px;
        text-transform: uppercase;
      }
      p {
        font-family: var(--sub-heading-font);
        margin-bottom: 0;
      }
      position: static;
      padding: 10px 5px;
      margin-bottom: 0;
      color: black !important;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .collection-description {
        max-width: 490px;
      }
      @media (max-width: 600px) {
        align-items: center;
        max-width: unset;
        justify-content: center;
        flex-direction: column;
        position: static;
        max-width: unset;
        text-align: center;
        top: unset;
        left: unset;
        right: unset;
      }
    }
  }
`

interface Props {
  collectionImage: IGatsbyImageData
  collectionName?: string
  collectionDescription?: string
  textColor?: string
  position?: string
  showOverlay?: boolean
}

const CollectionImage: React.FC<Props> = ({
  collectionImage,
  collectionName,
  collectionDescription,
  textColor = "white",
  position = "right",
  showOverlay = true,
}) => {
  const inlineStyleText = {
    color: textColor,
    right: showOverlay && position === "right" ? "0" : "unset",
    left: showOverlay && position === "left" ? "15px" : "unset",
  }
  const hasText = collectionName || collectionDescription
  const inlineStyleImage = {
    filter:
      textColor === "white" && hasText && showOverlay
        ? "brightness(0.8)"
        : "unset",
  }
  return (
    <Component>
      <div className="image-container">
        <GatsbyImage
          className="collection-image"
          image={collectionImage}
          alt={collectionName ?? "Collection image"}
          style={inlineStyleImage}
        />
        {showOverlay ? (
          <div className="inner-text" style={inlineStyleText}>
            {collectionName && <h1>{collectionName}</h1>}
            {collectionDescription && (
              <p className="collection-description">{collectionDescription}</p>
            )}
          </div>
        ) : (
          <div className="overlay-less-inner-text" style={inlineStyleText}>
            {collectionName && <h1>{collectionName}</h1>}
            {collectionDescription && (
              <p className="collection-description">{collectionDescription}</p>
            )}
          </div>
        )}
      </div>
    </Component>
  )
}

export default CollectionImage
