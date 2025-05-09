import React, { useEffect, useState } from "react"
import { useSpring, animated, config } from "react-spring"
import styled from "styled-components"
import { IoCreateOutline as CreateIcon } from "react-icons/io5"
import { useForm } from "react-hook-form"
import ReviewFormStarInput from "./review-form-star-input"
import ReviewFormError from "./review-form-error"
import type { YotpoCreateFormData } from "../../types/yotpo"
import { useReviews } from "../../contexts/reviews"
import Spinner from "../spinner"
import { IoCheckmarkCircle as CheckmarkIcon } from "react-icons/io5"
import ReviewBottomline from "./review-bottomline"
import { Bottomline } from "../../types/yotpo"

const Component = styled.div`
  padding-bottom: 30px;
  h4 {
    margin: 0;
    padding-bottom: 3px;
  }
  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      div {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      svg {
        font-size: 20px;
      }
    }
  }
  form {
    margin: unset;
    padding-top: 20px;
    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      @media screen and (min-width: 768px) {
        margin-bottom: 15px;
      }
    }
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
  }
  textarea {
    resize: vertical;
  }
`
type Props = {
  bottomline: Bottomline
}
const ReviewForm = ({ bottomline }: Props) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<YotpoCreateFormData>()
  register("reviewScore", { required: true })
  const starScore = watch("reviewScore")
  const setStarScore = (_score: number) => setValue("reviewScore", _score)
  const [isVisible, setIsVisible] = useState(false)

  // reverse the animation on exit to hide the component, slowly
  const [isExiting, setIsExiting] = useState(false)
  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        setIsExiting(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [isExiting])

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    // maxHeight: isVisible ? "auto" : 0,
    display: isVisible ? "block" : "none",
    // height: isVisible ? "auto" : 0,
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    config: config.stiff,
    onRest: () => {
      // If the component is not visible, set the exit state
      if (!isVisible) {
        setIsExiting(true)
      }
    },
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const { createReview } = useReviews()
  const onSubmit = async (data: YotpoCreateFormData) => {
    try {
      if (errors.root) clearErrors("root")
      const res = await createReview(data)
      if (!res) throw Error("Error in hook call")
      // show success
      setIsSuccess(true)
    } catch (error) {
      setError("root", { type: "custom", message: "Custom message" })
      console.log("Error while submitting react-hook-form", error)
    }
  }

  const openDrawer = () => {
    setIsVisible(true)
  }

  const closeDrawer = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault()
    setIsVisible(false)
  }

  return (
    <Component>
      <div className="title-row">
        <div>
          <h4>Reviews</h4>

          <ReviewBottomline bottomline={bottomline} />
        </div>
        <button className="btn" onClick={() => openDrawer()}>
          <div>
            <span>WRITE A REVIEW</span>
            <CreateIcon />
          </div>
        </button>
      </div>
      {isSuccess ? (
        <SuccessMessage />
      ) : (
        // @ts-ignore
        <animated.div style={animationProps}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <label htmlFor="reviewScore">Score: </label>
              <ReviewFormStarInput
                rating={starScore}
                setRating={setStarScore}
                clearError={() => clearErrors("reviewScore")}
              />
              {errors.reviewScore && (
                <ReviewFormError error="Please add your review score" />
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="reviewTitle">Title: </label>
              <input
                type="text"
                {...register("reviewTitle", { required: true })}
              />
              {errors.reviewTitle && (
                <ReviewFormError error="Please add your review title" />
              )}
            </div>
            <div>
              <div className="input-wrapper">
                <label htmlFor="reviewContent">Review: </label>
                <textarea {...register("reviewContent", { required: true })} />
                {errors.reviewContent && (
                  <ReviewFormError error="Please add your review" />
                )}
              </div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="reviewerName">Name: </label>
              <input
                type="text"
                {...register("reviewerName", { required: true })}
              />
              {errors.reviewerName && (
                <ReviewFormError error="Please add your name" />
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="reviewerEmail">Email: </label>
              <input
                type="email"
                {...register("reviewerEmail", { required: true })}
              />
              {errors.reviewerEmail && (
                <ReviewFormError error="Please add your email" />
              )}
            </div>
            {errors.root && (
              <ReviewFormError error="There was a problem subitting your review. Please try again." />
            )}
            <div className="button-wrapper">
              <button className="btn">
                {isSubmitting ? <Spinner /> : <span>SUBMIT</span>}
              </button>
              <button className="btn" onClick={evt => closeDrawer(evt)}>
                CLOSE
              </button>
            </div>
          </form>
        </animated.div>
      )}
    </Component>
  )
}

export default ReviewForm

type ReviewDrawerProps = {
  isVisible: boolean
  isExiting: boolean
  setIsVisible: (_state: boolean) => void
  setIsExiting: (_state: boolean) => void
  children: React.ReactNode
}
const ReviewDrawer = ({
  children,
  isVisible,
  isExiting,
  setIsVisible,
  setIsExiting,
}: ReviewDrawerProps) => {
  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    height: isVisible ? "auto" : 0,
    // config: { duration: 300 }, // Adjust the animation duration
    onRest: () => {
      // If the component is not visible, set the exit state
      if (!isVisible) {
        setIsExiting(true)
      }
    },
  })
  // @ts-ignore
  return <animated.div style={animationProps}>{children}</animated.div>
}

// Success Message
type SuccessMessageProps = {}

const SuccessMessageStyled = styled.div`
  margin: 30px 5px;
  .first {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .green {
    color: green;
    fill: green;
  }
  span {
    display: block;
    padding: 5px 0px;
    text-align: center;
  }
  svg {
    font-size: 80px;
  }
  .bold {
    font-family: var(--heading-font);
    color: black;
    font-size: 20px;
  }
`
const SuccessMessage = () => {
  return (
    <SuccessMessageStyled>
      <div className="first">
        <CheckmarkIcon className="green" />
        <span className="bold">Thank you</span>
        <span>Your review has been sent!</span>
        <span>Please check your email to verify your review.</span>
      </div>
    </SuccessMessageStyled>
  )
}
