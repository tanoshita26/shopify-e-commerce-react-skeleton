import React, { useContext } from "react"
import styled from "styled-components"
import { RxInfoContext } from "../contexts/rxInfo"

const Component = styled.div`
  margin-top: 20px;
  .grid {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .grid label {
    padding: 1rem;
    border: 1px solid #000;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--sub-heading-font);
  }
  .grid input[type="radio"] {
    display: none;
  }
  .grid input[type="radio"]:checked + label {
    background-color: #000;
    color: #fff;
  }
  .selected {
    background-color: #000 !important;
    color: #fff;
  }
  .title {
    text-align: center;
    display: block;
    margin-bottom: 8px;
    font-family: var(--sub-heading-font);
    font-size: 18px;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  .rx-prism {
    margin-top: 10px;
    font-family: var(--sub-heading-font);
    p {
      color: #808080;
      margin: 0;
      span {
        color: initial;
      }
    }
    a {
      text-decoration: none;
    }
  }
`

const lensPower = [
  "1.00",
  "1.25",
  "1.50",
  "1.75",
  "2.00",
  "2.25",
  "2.50",
  "2.75",
  "3.00",
  "3.25",
  "3.50",
]

type Props = {
  isNowValid: () => void
  clearErrors: (evt: any) => void
}

const ReadersTable: React.FC<Props> = ({ clearErrors, isNowValid }) => {
  const { rxInfo, rxInfoDispatch } = useContext(RxInfoContext)

  const defaultValue = rxInfo.lensPower || undefined

  const handleSelect = (
    evt: React.ChangeEvent<HTMLInputElement>,
    power: string
  ) => {
    clearErrors(evt)
    rxInfoDispatch({ type: "lens-power", payload: power })
    isNowValid()
  }

  return (
    <Component>
      <span className="title">Lens Power</span>
      <div className="grid">
        {lensPower.map((power, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`power-${index}`}
              name="lens-power"
              onChange={evt => handleSelect(evt, power)}
              defaultValue={defaultValue}
            />
            <label
              htmlFor={`power-${index}`}
              className={defaultValue === power ? "selected" : "unselected"}
            >
              + {power}
            </label>
          </div>
        ))}
      </div>
      <div className="rx-prism">
        <p>
          Need prism correction OR further assistance inputting your Rx? Email{" "}
          <a href="mailto:info@tresnoir.com">
            <span>info@tresnoir.com</span>{" "}
          </a>
          or call{" "}
          <a href="tel:+17146564796">
            <span>714-656-4796</span>
          </a>
        </p>
      </div>
    </Component>
  )
}

export default ReadersTable
