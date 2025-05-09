import React from "react"
import styled from "styled-components"
import { FaUserCircle as UserIcon } from "react-icons/fa"
import { MdVerified } from "react-icons/md"

const Icon = styled.div`
  position: relative;
  .user-icon {
    font-size: 45px;
    margin-right: 10px;
    fill: var(--color-grey-dark);
  }
  .verified-icon {
    fill: #1cc286;
    z-index: 100;
    position: absolute;
    top: 28px;
    right: 5px;
    font-size: 20px;
    stroke: white;
  }
`
type Props = {
  isVerified: boolean
}
const ReviewAuthor = ({ isVerified }: Props) => {
  return (
    <Icon>
      <UserIcon className="user-icon" />
      {isVerified && <MdVerified className="verified-icon" />}
    </Icon>
  )
}

export default ReviewAuthor
