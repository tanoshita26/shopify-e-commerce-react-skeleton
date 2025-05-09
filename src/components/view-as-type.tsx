import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { BsSunglasses, BsEyeglasses } from "react-icons/bs"
enum LensType {
  GLASSES = "glasses",
  SUNGLASSES = "sunglasses",
}

type ViewAsTypeProps = {
  lensType: string
  swapGlassesType: (state: "glasses" | "sunglasses") => void
}

const SwitchWrapper = styled.div`
  display: inline-block;
`

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 34px;
`

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #2196f3;
  }

  &:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + .slider:before {
    transform: translateX(36px);
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  transition: 0.4s;
  border-radius: 34px;

  // switch button
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const OnIcon = styled(BsEyeglasses)`
  color: white;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  font-size: 22px;
`

const OffIcon = styled(BsSunglasses)`
  color: white;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 22px;
`

const ViewAsType = ({ lensType, swapGlassesType }: ViewAsTypeProps) => {
  const [isGlasses, setIsGlasses] = useState(lensType === LensType.GLASSES)

  const handleToggle = (checked: boolean) => {
    swapGlassesType(checked ? LensType.GLASSES : LensType.SUNGLASSES)
  }

  useEffect(() => {
    setIsGlasses(lensType === LensType.GLASSES)
  }, [lensType])

  return (
    <SwitchWrapper>
      <SwitchLabel>
        <SwitchInput
          type="checkbox"
          checked={isGlasses}
          onChange={evt => handleToggle(evt.target.checked)}
        />
        <Slider className="slider">
          <OnIcon />
          <OffIcon />
        </Slider>
      </SwitchLabel>
    </SwitchWrapper>
  )
}

export default ViewAsType
