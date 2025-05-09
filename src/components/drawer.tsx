import { Link } from "gatsby"
import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { useDesktopNavigation } from "../hooks/useDesktopNavigation"
import Accordion from "./accordion"

const Component = styled.nav<StyledProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #000;
  height: 100vh;
  max-height: 100vh;
  text-align: left;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isDrawerOpen }) =>
    $isDrawerOpen ? "translateX(0)" : "translateX(-100%)"};
  width: 400px;
  z-index: 10000;
  a {
    display: block;
  }
  @media (max-width: 399px) {
    width: 100%;
  }
  a {
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 1.45rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: var(--color-grey-light);
    text-decoration: none;
    transition: color 0.3s linear;
    white-space: initial;
    &[role="button"] {
      align-self: flex-end;
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`

interface DrawerProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}

interface StyledProps {
  $isDrawerOpen: boolean
}

interface Item {
  id: string
  url: string | null
  name: string
  subListItems: [Item] | null
}

const Drawer = ({ isDrawerOpen, setIsDrawerOpen }: DrawerProps) => {
  const { items } = useDesktopNavigation()
  return (
    <Component $isDrawerOpen={isDrawerOpen}>
      <a href="#" role="button" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        &times;
      </a>
      {items.map((item: Item) => {
        if (item.url && !item.subListItems) {
          if (item.name === "Wholesale") {
            return (
              <a key={item.id} href={item.url}>
                {item.name}
              </a>
            )
          } else {
            return (
              <Link key={item.id} to={item.url}>
                {item.name}
              </Link>
            )
          }
        }
        if (item.subListItems) {
          return (
            <Accordion key={item.id} name={`${item.name}+`}>
              {item.subListItems.map((_item: Item) => (
                <Link key={_item.id} to={_item.url ? _item.url : "/"}>
                  {_item.name}
                </Link>
              ))}
            </Accordion>
          )
        }
      })}
    </Component>
  )
}

export default Drawer
