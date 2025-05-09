import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useClickAway } from "react-use"
import { useDesktopNavigation } from "../hooks/useDesktopNavigation"
import SubNavImage from "./subNavImage"

const Component = styled.nav`
  flex: 4;
  ul {
    border-top: 3px solid #000;
    border-bottom: 3px solid #000;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    margin-left: 0;
    margin-bottom: 0;
    padding: 0 10px;
    position: relative;
  }
  li {
    margin-bottom: 0;
    padding: 10px 5px;
    &.active {
      background-color: #000;
    }
  }
  a {
    padding: 0 5px;
  }
  a {
    &:hover,
    &:focus {
      color: #4f4f4f;
    }
    &:active {
      color: #262626;
    }
    span {
      &:hover,
      &:focus {
        color: #4f4f4f;
      }
      &:active {
        color: #262626;
      }
    }
  }
  a,
  span {
    color: var(--color-grey-dark);
    text-decoration: none;
    text-transform: uppercase;
  }
  .toggle:after {
    content: " +";
  }
  a.active {
    span {
      color: #fff;
    }
    .toggle:after {
      content: " -";
      display: inline-block;
      padding-left: 3px;
      padding-right: 5.5px;
    }
  }
  ul.sub-nav {
    background-color: #000;
    color: #fff;
    flex-direction: column;
    height: auto;
    margin-top: 10px;
    margin-left: -5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    position: absolute;
    z-index: 10;
    li {
      flex: 1;
      width: 100%;
    }
    a {
      color: #fff;
    }
  }
`

interface Item {
  id: string
  url: string | null
  name: string
  subListItems: [Item] | null
}

const DesktopNavigation = () => {
  const { items } = useDesktopNavigation()
  const [visibleSubNav, setVisibleSubNav] = useState("none")
  const [left, setLeft] = useState<string>("")
  const ref = useRef(null)

  const toggleSubNav = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault()
    if (id !== visibleSubNav) {
      setVisibleSubNav(id)
    } else {
      setVisibleSubNav("none")
    }
  }

  useClickAway(ref, () => {
    setVisibleSubNav("none")
  })

  const hasImage = subListItems => {
    let found = false
    subListItems.forEach(element => {
      if (element.image) {
        found = true
      }
    })
    return found
  }
  return (
    <Component ref={ref}>
      <ul>
        {items.map((item: Item) => (
          <li
            key={item.id}
            className={item.id === visibleSubNav ? `active` : ``}
          >
            {item.url && item.name === "Wholesale" && (
              <a href={item.url}>{item.name}</a>
            )}
            {item.url && !item.subListItems && item.name !== "Wholesale" && (
              <Link to={item.url}>{item.name}</Link>
            )}

            {item.subListItems && (
              <>
                <a
                  href="#"
                  role="button"
                  onClick={e => toggleSubNav(e, item.id)}
                  className={item.id === visibleSubNav ? `active` : ``}
                >
                  <span className="toggle">{item.name}</span>
                </a>
                {item.id === visibleSubNav &&
                  (!hasImage(item.subListItems) ? (
                    <ul className="sub-nav">
                      {item.subListItems.map((_item: Item) => (
                        <li key={_item.id}>
                          <Link to={_item.url ? _item.url : "/"}>
                            {_item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <SubNavImage subListItems={item.subListItems} />
                  ))}
              </>
            )}
          </li>
        ))}
      </ul>
    </Component>
  )
}

export default DesktopNavigation
