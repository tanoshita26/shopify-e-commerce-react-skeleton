import styled from "styled-components"

export const Component = styled.form`
  padding: 10px 0;
  .step-header {
    font-family: var(--heading-font);
    text-transform: uppercase;
  }
  .product-option {
    background-color: var(--color-grey-light);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    padding: 10px;
    position: relative;
    &.with-variants {
      flex-wrap: wrap;
    }
    > div {
      padding: 0 10px;
    }
    p {
      line-height: 1;
      margin-bottom: 0;
    }
    .gatsby-image-wrapper {
      max-width: 40px;
      max-height: 40px;
    }
    img {
      align-self: center;
    }
    .product-description {
      max-width: calc(100% - 65px);
      min-height: 40px;
    }
    h4,
    h6 {
      font-family: var(--sub-heading-font);
      margin-bottom: 0;
      text-transform: uppercase;
    }
    input[type="radio"],
    input[type="checkbox"] {
      height: calc(100% - 10px);
      opacity: 0;
      position: absolute;
      width: calc(100% - 10px);
      z-index: 2;
      &:hover {
        cursor: pointer;
      }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      border: 1px solid #000;
      border-radius: 50%;
      height: 25px;
      position: relative;
      width: 25px;
      align-self: center;
      margin-left: auto;
      padding-left: 0;
      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 7px;
        top: 2px;
        width: 8px;
        height: 16px;
        border: solid #000;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .disabled {
      &:after {
        display: block;
        left: 11px;
        top: 0px;
        border-width: 0 1px 0 0;
        width: 0px;
        height: 24px;
        transform: rotate(135deg);
      }
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
  }
  button,
  .button {
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    font-family: var(--sub-heading-font);
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      background-color: #808080;
      // box-shadow: none;
      border-color: #808080;
    }
    @media only screen and (max-width: 480px) {
      display: inline-block;
    }
  }
  .rx-info {
    font-family: var(--sub-heading-font);
    .rx-box {
      display: flex;
      justify-content: space-between;
      margin: 25px 0;
      .rx-col {
        &:nth-of-type(odd) {
          margin-right: 25px;
          @media only screen and (max-width: 480px) {
            margin-right: 10px;
          }
        }
        flex: 1;
        p {
          text-align: center;
          margin-bottom: 5px;
        }
        .rx-select {
          border-bottom: 1px solid #808080;
          display: flex;
          padding: 1px;
          align-items: center;
          label {
            color: #808080;
          }
          select {
            margin-left: 15px;
            width: 100%;
            border: none;
            color: black;
          }
        }
      }
    }
    .rx-box:nth-of-type(2) {
      .rx-col {
        .rx-select {
          .pd-box {
            display: flex;
            column-gap: 12px;
            align-items: center;
            @media screen and (max-width: 480px) {
              column-gap: 5px;
            }
            div {
              display: flex;
              position: relative;
              .tooltip-text {
                visibility: hidden;
                width: 100px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 3px;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -50px;
                opacity: 0;
                transition: opacity 0.3s;
                a {
                  color: inherit;
                  text-decoration: inherit;
                }
                &:after {
                  content: "";
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  margin-left: -5px;
                  border-width: 5px;
                  border-style: solid;
                  border-color: #555 transparent transparent transparent;
                }
              }
              &:hover .tooltip-text {
                visibility: visible;
                opacity: 1;
              }
            }
          }
          flex-direction: column;
          select {
            margin: 0;
          }
        }
        :nth-child(2) {
          .rx-select {
            .pd-box {
              div {
                .tooltip-text {
                  margin-left: -80px;
                  left: unset;
                  &:after {
                    left: 90%;
                  }
                }
              }
            }
          }
        }
      }
    }
    .rx-prism {
      p {
        color: #808080;
        margin: 0;
        span {
          color: initial;
        }
      }
    }
  }
  ul.variants {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: 100%;
    margin: 0 auto;
    padding: 10px 5%;
    li {
      display: flex;
      flex-direction: row;
      height: 30px;
      margin-bottom: 5px;
      padding-right: 15px;
      position: relative;
      width: 50%;
      @media only screen and (max-width: 768px) {
        width: 100%;
      }
      .variant-image {
        max-height: 30px;
        max-width: 30px;
      }
      .variant-description {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      div {
        padding-left: 5px;
      }
      p {
        line-height: 0.5;
      }
      .checkmark {
        flex-shrink: 0;
        @media only screen and (min-width: 1024px) {
          margin-right: 40px;
        }
        @media only screen and (min-width: 1200px) {
          margin-right: 25%;
        }
      }
    }
  }
  .form-error {
    font-family: var(--sub-heading-font);
    font-size: 0.95rem;
    color: red;
    min-height: 65px;
    margin-bottom: 0;
    margin-top: 10px;
    li {
      margin: 0;
    }
  }
  .select-error {
    outline: 2px solid red;
  }
  .hide {
    display: none;
  }
  .disable {
    pointer-events: none;
    opacity: 0.3;
  }
  .inactive {
    pointer-events: none;
    opacity: 0.5;
  }
  .strikethrough-grey {
    color: var(--color-grey-dark);
    text-decoration: line-through;
  }
  .rx-prism a {
    text-decoration: none;
  }
`
