import React from "react"
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { GatsbyImage } from "gatsby-plugin-image"
import { BsChevronLeft as Left, BsChevronRight as Right } from "react-icons/bs"
import { IGatsbyImageData } from "gatsby-plugin-image"

const Component = styled.section`
  padding-top: 15px;
  padding-bottom: 40px;
  h3 {
    text-align: center;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 0;
    font-size: 1.5rem;
    margin-bottom: 15px;
    @media only screen and (min-width: 768px) {
      font-size: 2rem;
      margin-bottom: 35px;
    }
  }
  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    a:hover {
      cursor: pointer;
    }
  }
  .nav-prev {
    padding-right: 10px;
  }
  .nav-next {
    padding-left: 10px;
  }
  .swiper-button-disabled {
    svg {
      color: var(--color-grey-light);
    }
  }
`
const StyledSwiper = styled(Swiper)`
  max-width: 100%;
  .swiper-slide {
    max-width: 100%;
  }
`
type FeaturedImage = {
  data: IGatsbyImageData
  title: string
}
type FeaturedStylesProps = {
  images: {
    data: IGatsbyImageData
    title: string
  }[]
}
const FeaturedStyles = ({ images }: FeaturedStylesProps) => {
  return (
    <Component>
      <h3>Featured Styles</h3>
      <div className="navigation">
        <div className="nav-prev">
          <a className="featured-style-carousel-prev" role="button">
            <Left />
          </a>
        </div>
        <StyledSwiper
          slidesPerView="auto"
          spaceBetween={10}
          navigation={{
            nextEl: ".featured-style-carousel-next",
            prevEl: ".featured-style-carousel-prev",
          }}
          className="featured-style-carousel"
          breakpoints={{
            "600": {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            "1024": {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          preventClicksPropagation={false}
          preventInteractionOnTransition={true}
          touchRatio={1}
          touchReleaseOnEdges={true}
          touchStartForcePreventDefault={true}
          watchSlidesProgress
          swipeHandler=".featured-style-carousel"
          threshold={15}
          observer={true}
        >
          {images.map((image, i: number) => (
            <SwiperSlide key={`featured-styles-slide-${i}`}>
              <GatsbyImage
                image={image.data}
                alt={image.title}
                loading="eager"
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
        <div className="nav-next">
          <a className="featured-style-carousel-next" role="button">
            <Right />
          </a>
        </div>
      </div>
    </Component>
  )
}

export default FeaturedStyles
