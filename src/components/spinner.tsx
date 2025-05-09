import React from "react"
import styled from "styled-components"

const Component = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .icon-spinner {
    -moz-animation: spin 500ms infinite linear;
    -o-animation: spin 500ms infinite linear;
    -webkit-animation: spin 500ms infinite linear;
    animation: spin 500ms infinite linear;
    height: 20px;
    width: auto;
  }
  @-webkit-keyframes spin {
    0% {
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes spin {
    0% {
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-ms-keyframes spin {
    0% {
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`

const Spinner = ({ fill = "#FFFFFF" }: { fill?: "#FFFFFF" | "#000000" }) => {
  return (
    <Component className="tn-spinner">
      <svg
        aria-hidden="true"
        focusable="false"
        role="presentation"
        className="icon icon-spinner"
        viewBox="0 0 20 20"
      >
        <path
          d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z"
          fill={fill}
        />
      </svg>
    </Component>
  )
}

export default Spinner
