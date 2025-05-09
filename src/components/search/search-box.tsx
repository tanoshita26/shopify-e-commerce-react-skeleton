import React from "react"
import styled from "styled-components"
import { connectSearchBox } from "react-instantsearch-dom"

const Component = styled.div`
  display: block;
  max-width: 480px;
  margin: 0 auto 2rem auto;
  input {
    border: 1px solid #555;
    border-radius: 5px;
    width: 100%;
    padding: 9px 4px 9px 40px;
    outline-offset: 0;
    background: transparent
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat 13px center;
  }
`

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <Component>
      <input
        type="search"
        value={currentRefinement}
        placeholder="Search..."
        onChange={event => refine(event.currentTarget.value)}
      />
    </Component>
  )
}

export default connectSearchBox(SearchBox)
