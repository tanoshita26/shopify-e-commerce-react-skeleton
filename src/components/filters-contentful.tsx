import React, { Dispatch, useState, useEffect } from "react"
import styled from "styled-components"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { useSpring, animated, config } from "react-spring"
import { ContentfulCollection, ContentfulProduct } from "../types/contentful"
import { useHeight } from "../hooks/useHeight"
import { useFrameColors } from "../hooks/useFrameColors"
import { getFilters } from "../utils/getContentfulCollectionFilters"
import { BiPlus as IconPlus, BiMinus as IconMinus } from "react-icons/bi"

const DisplayFilters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-family: var(--heading-font);
  button.filter {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 1.25rem;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
    border: none;
    background-color: transparent;
    color: #000;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      color: var(--color-grey-dark);
    }
  }
`

const Triangle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .triangle {
    width: 0px;
    height: 0px;
    background: black;
    border: 20px solid;
    border-top-color: #fff;
    border-left-color: #fff;
    border-right-color: #fff;
    border-bottom-color: rgb(239, 239, 239);
    margin-top: -20px;
  }
`

const Filters = styled.div`
  font-family: var(--heading-font);
  font-size: 0.98rem;
  p,
  span {
    font-size: 0.9rem;
  }
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(239, 239, 239);
  padding: 25px;
  margin-bottom: 25px;
  .frame-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    .reset {
      margin-top: 10px;
      background-color: transparent;
    }
  }
  .color-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
  a {
    text-decoration: none;
    color: var(--color-grey-dark);
    text-transform: uppercase;
  }
  button {
    margin: 3px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    color: var(--color-grey-dark);
    background-color: transparent;
    &:hover {
      border-radius: 15px;
      color: #000;
    }
    &.filter-type {
      background-color: transparent;
      /* font-size: 1.2em; */
      &[data-active="true"] {
        color: #000;
      }
    }
    &.filter {
      padding: 8px 12px;
      background-color: transparent;
      border-radius: 15px;
      color: #000;
      &[data-active="true"] {
        background-color: #fff;
      }
      img {
        border-radius: 15px;
      }
    }
    &.filter:hover {
      background-color: #fff;
    }
    &.frame-filter {
      .fit-type {
        margin-top: 8px;
        font-family: var(--sub-heading-font);
        position: relative;
        span {
          vertical-align: middle;
        }
        .text {
          font-size: 1.05rem;
        }
      }
    }
    &.color-filter {
      line-height: 50px;
      font-family: var(--sub-heading-font);
    }
  }
  ul {
    /* border-top: 3px solid #000;
    border-bottom: 3px solid #000; */
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    margin-left: 0;
    margin-bottom: 15px;
    padding: 0 10px;
    li {
      font-size: 1.2rem;
      margin-bottom: 0;
      padding: 10px 25px;
      white-space: nowrap;
      flex: 1;
      [data-active="true"] {
        text-decoration: underline;
      }
      @media (max-width: 600px) {
        padding: 10px 5px;
        font-size: 0.97rem;
      }
    }
  }
`

interface Props {
  collection: ContentfulCollection
  filters: {
    frameWidth: string
    colorName: string
  }
  setFilters: Dispatch<{
    frameWidth: string
    colorName: string
  }>
  setProducts: Dispatch<ContentfulProduct[]>
}

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-shadow
enum FilterTypes {
  FrameWidth = "frameWidth",
  ColorName = "colorName",
}

const FiltersContentful = ({
  collection,
  filters,
  setFilters,
  setProducts,
}: Props) => {
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [panel, setPanel] = useState<string>(FilterTypes.FrameWidth)
  const [frameWidths, setFrameWidths] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  const frameColors = useFrameColors()

  const generateFilters = (products: ContentfulProduct[]) => {
    const { frameWidthList, colorsList } = getFilters(products)
    // set values
    setFrameWidths(frameWidthList)
    setColors(colorsList)
  }

  useEffect(() => {
    generateFilters(collection.products)
  }, [])

  const filter = (type: string, value: string): void => {
    let filteredProducts: ContentfulProduct[] = collection.products
    if (filters[type] === value) {
      filters[type] = ""
    } else {
      filters[type] = value
    }

    const keys = Object.keys(filters)
    // eslint-disable-next-line no-shadow
    keys.forEach(filter => {
      // frame width
      if (filters[filter]) {
        if (filter === FilterTypes.FrameWidth) {
          filteredProducts = filteredProducts.filter(product =>
            product.frameWidth.includes(filters[filter])
          )
        }
        // frame color
        if (filter === FilterTypes.ColorName) {
          filteredProducts = filteredProducts.filter(product => {
            let found = false
            product.variants.forEach(variant => {
              if (variant.frameColor.includes(filters[filter])) {
                found = true
              }
            })
            return found
          })
        }
      }
    })

    setProducts(filteredProducts)
    setFilters(filters)
    generateFilters(filteredProducts)
  }

  const reset = (): void => {
    setFilters({ frameWidth: "", colorName: "" })
    setProducts(collection.products)
    generateFilters(collection.products)
  }

  const handleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  const handlePanel = (p: string): void => {
    setPanel(p)
  }

  // React Spring
  const isBrowser = typeof window !== "undefined"
  if (!isBrowser) return null
  const [heightRef, height] = useHeight()
  const slideInStyles = useSpring({
    config: { ...config.default },
    from: { opacity: 0, height: 0, margin: 0 },
    to: {
      opacity: showFilters ? 1 : 0,
      height: showFilters ? height : 0,
      marginBottom: 25,
    },
  })

  return (
    <>
      <DisplayFilters>
        <button className="filter" type="button" onClick={handleShowFilters}>
          <span>Filter</span>
          {showFilters ? <IconMinus size={20} /> : <IconPlus size={20} />}
        </button>
      </DisplayFilters>

      <animated.div
        style={{ ...slideInStyles, overflow: "hidden" }}
        className="animated"
      >
        <div className="filters-ref" ref={heightRef}>
          <Triangle>
            <div className="triangle" />
          </Triangle>
          <Filters>
            <div className="filter-header">
              <ul>
                <li>
                  <button
                    className="filter-type"
                    type="button"
                    onClick={() => handlePanel(FilterTypes.FrameWidth)}
                    data-active={panel === FilterTypes.FrameWidth}
                    aria-pressed={
                      panel === FilterTypes.FrameWidth ? "true" : "false"
                    }
                  >
                    FRAME WIDTH
                  </button>
                </li>
                <li>
                  <button
                    className="filter-type"
                    type="button"
                    onClick={() => handlePanel(FilterTypes.ColorName)}
                    data-active={panel === FilterTypes.ColorName}
                    aria-pressed={
                      panel === FilterTypes.ColorName ? "true" : "false"
                    }
                  >
                    COLOR
                  </button>
                </li>
              </ul>
            </div>
            {panel === FilterTypes.FrameWidth && (
              <div className="frame-options">
                {frameWidths.length &&
                  frameWidths.map((frameWidth: string) => (
                    <button
                      className="filter frame-filter"
                      key={frameWidth}
                      type="button"
                      data-active={filters.frameWidth === frameWidth}
                      onClick={() => filter(FilterTypes.FrameWidth, frameWidth)}
                      aria-pressed={
                        filters.frameWidth === frameWidth ? "true" : "false"
                      }
                    >
                      <StaticImage
                        src="../images/glasses-icon.png"
                        alt={frameWidth}
                        placeholder="dominantColor"
                        style={{ marginBottom: 0 }}
                        width={150}
                      />
                      <div className="fit-type">
                        <span className="text">
                          &#8866; {frameWidth} &#8867;
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            )}
            {panel === FilterTypes.ColorName && (
              <div className="color-options">
                {colors.length &&
                  colors.map((colorName: string) => {
                    const image = frameColors[colorName.replace("-", "_")]
                    return (
                      <button
                        className="filter color-filter"
                        key={colorName}
                        type="button"
                        data-active={filters.colorName === colorName}
                        onClick={() => filter(FilterTypes.ColorName, colorName)}
                        aria-pressed={
                          filters.colorName === colorName ? "true" : "false"
                        }
                      >
                        {image && (
                          <GatsbyImage
                            image={image.childImageSharp.gatsbyImageData}
                            alt={colorName}
                            style={{ marginBottom: 0, marginRight: 10 }}
                          />
                        )}

                        <span>{colorName}</span>
                      </button>
                    )
                  })}
              </div>
            )}
            <button className="reset" type="button" onClick={reset}>
              RESET
            </button>
          </Filters>
        </div>
      </animated.div>
    </>
  )
}

export default FiltersContentful
