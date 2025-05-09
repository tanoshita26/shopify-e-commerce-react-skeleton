import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  GatsbyImage as Img,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image"

const Component = styled.div`
  .triangle {
    position: absolute;
    top: 0;
    margin-top: 50px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid var(--color-grey-light);
  }
  .sub-nav-container {
    position: absolute;
    display: block;
    z-index: 10;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    .sub-nav-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: var(--color-grey-light);
      color: #000;
      padding: 10px;
      margin-top: 30px;
      a {
        padding: 0;
      }
      .nav-item-img {
        position: relative;
        width: auto;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .name {
          position: absolute;
          color: white;
          padding: 1px 5px;
          background: rgba(0, 0, 0, 0.65);
          font-weight: bold;
          top: 1rem;
          right: 1.5rem;
        }
        &:hover {
          opacity: 0.65;
        }
      }
    }
  }
`

interface Item {
  id: string
  url: string | null
  name: string
  image: {
    gatsbyImageData: IGatsbyImageData
    title: string
  }
  subListItems: [Item] | null
}

const SubNavImage = ({ subListItems }) => {
  const [left, setLeft] = useState<string>("")
  useEffect(() => {
    const nav = document.querySelector("nav")
    if (nav) {
      setLeft(`${nav.offsetLeft}px`)
    }
  }, [])

  return (
    <Component>
      <div className="triangle" />
      <div
        className="sub-nav-container"
        style={{
          width: `calc(100% + ${left})`,
          left: `calc(-${left} / 2)`,
        }}
      >
        <div className="sub-nav-content">
          {subListItems.map((_item: Item) => (
            <Link key={_item.id} to={_item.url ? _item.url : "/"}>
              <div className="nav-item-img">
                {_item.image ? (
                  <Img
                    image={_item.image.gatsbyImageData}
                    alt={_item.image.title}
                  />
                ) : (
                  <StaticImage
                    src="../images/example-menu-item-mens.jpg"
                    alt="Tres Noir"
                    placeholder="dominantColor"
                    layout="constrained"
                  />
                )}
                <span className="name">{_item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Component>
  )
}

export default SubNavImage
