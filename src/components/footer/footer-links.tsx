import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useFooterNavigation } from "../../hooks/useFooterNavigation"
const Component = styled.nav`
  display: flex;
  align-items: baseline;
  span {
    padding-bottom: 10px;
  }
  ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 0;
    flex: 1;
    li {
      margin-bottom: 3px;
      @media (max-width: 800px) {
        font-size: 0.95rem;
      }
      a {
        white-space: pre;
        @media (max-width: 365px) {
          white-space: normal;
        }
        padding: 3px;
        text-transform: uppercase;
        &:hover,
        &:focus {
          color: #262626;
        }
        .active {
          color: #4f4f4f;
        }
      }
    }
    &:first-child {
      @media (min-width: 100px) {
        margin-right: 3.2vw;
      }
      @media (min-width: 600px) and (max-width: 850px) {
        margin-right: 0;
      }
    }
    &:nth-child(2) {
      margin-left: 22px;
    }
  }
`

interface Item {
  name: string
  subListItems: {
    name: string
    url: string
  }[]
}

const FooterLinks = () => {
  const { items } = useFooterNavigation()
  return (
    <Component>
      {items.map((element: Item) => {
        return (
          <ul key={element.name}>
            <span>{element.name}</span>
            {element.subListItems.map(item => {
              return (
                <li key={item.name}>
                  {item.url && <Link to={item.url}>{item.name}</Link>}
                </li>
              )
            })}
          </ul>
        )
      })}
    </Component>
  )
}

export default FooterLinks
