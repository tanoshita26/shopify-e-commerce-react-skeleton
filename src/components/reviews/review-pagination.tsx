import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  BsChevronLeft as LeftIcon,
  BsChevronRight as RightIcon,
} from "react-icons/bs"
import type { Pagination } from "../../types/yotpo"
import { useReviews } from "../../contexts/reviews"
import { YOTPO_REVIEWS_PER_PAGE } from "../../contexts/reviews/ReviewsProvider"

const Component = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .page-number {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border: 1px solid black;
    cursor: pointer;
  }
  .active {
    background: var(--color-grey-dark);
  }
  .icon {
    margin: 15px;
    color: black;
    fill: black;
  }
  .no-styles {
    background: unset;
    padding: unset !important;
    margin: unset !important;
    display: grid;
    place-items: center;
    border: none;
    cursor: pointer;
    :disabled {
      cursor: default;
      svg {
        fill: var(--color-grey-light) !important;
      }
      span {
        color: var(--color-grey-light) !important;
      }
    }
  }
  button {
    span {
      color: black;
    }
  }
`
type Props = {
  pagination: Pagination
  scrollToTop: () => void
}

const ReviewPagination = ({ pagination, scrollToTop }: Props) => {
  const { refreshToPage } = useReviews()
  const { page } = pagination
  const totalProducts = pagination.total
  const totalPages = Math.ceil(totalProducts / YOTPO_REVIEWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(page)
  const maxPagesToShow = 5
  const initialLimit = Math.min(maxPagesToShow, totalPages)

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start)
  }

  const [pages, setPages] = useState<number[]>(range(1, initialLimit))

  // create a list of pages to display

  const [disableLeft, setDisableLeft] = useState(currentPage === 1)
  const [disableRight, setDisableRight] = useState(currentPage === totalPages)

  // updates the left and right arrows
  useEffect(() => {
    if (currentPage === 1) {
      setDisableLeft(true)
    } else {
      setDisableLeft(false)
    }
    if (currentPage === totalPages) {
      setDisableRight(true)
    } else {
      setDisableRight(false)
    }
  }, [currentPage])

  // updates pages array
  useEffect(() => {
    if (currentPage === 1) {
      setPages(range(1, initialLimit))
      return
    }
    if (currentPage === totalPages) {
      setPages(range(totalPages - initialLimit + 1, totalPages))
      return
    }
    const lowerLimit = Math.min(1, currentPage - 1)
    const upperLimit = Math.max(totalPages, currentPage + 1)
    setPages(range(lowerLimit, upperLimit))
  }, [currentPage])

  const goToPageV2 = (oldPage: number, newPage: number) => {
    if (oldPage === newPage) {
      return
    }
    if (newPage < 1 || newPage > totalPages) {
      return
    }
    scrollToTop()
    setCurrentPage(newPage)
    refreshToPage(newPage)
  }

  return (
    totalProducts > 0 && (
      <Component>
        <button
          onClick={() => goToPageV2(currentPage, currentPage - 1)}
          className="no-styles"
          disabled={disableLeft}
        >
          <LeftIcon className="icon" />
        </button>
        {pages.map(page => {
          return (
            <button
              key={page}
              onClick={() => goToPageV2(currentPage, page)}
              className={`page-number ${page === currentPage ? "active" : ""}`}
            >
              <span>{page}</span>
            </button>
          )
        })}
        <button
          onClick={() => goToPageV2(currentPage, currentPage + 1)}
          className="no-styles"
          disabled={disableRight}
        >
          <RightIcon className="icon" />
        </button>
      </Component>
    )
  )
}

export default ReviewPagination
