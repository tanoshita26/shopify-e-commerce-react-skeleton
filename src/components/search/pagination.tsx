import React from "react"
import { connectPagination } from "react-instantsearch-dom"
import styled from "styled-components"

const Component = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  li {
    list-style: none;
    display: inline;
    flex: 1;
    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #000;
      &:hover {
        color: #808086;
      }
      &.active {
        color: #808086;
      }
      span {
        display: flex;
      }
    }
  }
`

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <Component>
    {currentRefinement !== 1 && (
      <li>
        <a
          href={createURL(currentRefinement - 1)}
          onClick={event => {
            event.preventDefault()
            refine(currentRefinement - 1)
          }}
        >
          &#171;&nbsp;Previous
        </a>
      </li>
    )}

    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1

      return (
        <li key={index}>
          <a
            href={createURL(page)}
            className={currentRefinement === page ? "active" : ""}
            onClick={event => {
              event.preventDefault()
              refine(page)
            }}
          >
            {page}
          </a>
        </li>
      )
    })}

    {currentRefinement !== nbPages && (
      <li>
        <a
          href={createURL(currentRefinement + 1)}
          onClick={event => {
            event.preventDefault()
            refine(currentRefinement + 1)
          }}
        >
          Next&nbsp;&#187;
        </a>
      </li>
    )}
  </Component>
)

export default connectPagination(Pagination)
