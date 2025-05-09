import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, Navigation } from "swiper"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { BsChevronLeft as Left, BsChevronRight as Right } from "react-icons/bs"
import styled from "styled-components"

import "swiper/css"

const Component = styled.div`
  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    a:hover {
      cursor: pointer;
    }
  }
  .prev {
    padding-right: 10px;
  }
`

const StyledSwiper = styled(Swiper)`
  max-width: 100%;
  .swiper-slide {
    max-width: 100%;
  }
`
const StyledThumbs = styled(Swiper)`
  .swiper-slide {
    line-height: 0;
    margin-left: 5px;
    max-width: calc(33.333% - 15px);
    &:hover {
      cursor: pointer;
    }
  }
  .swiper-slide-thumb-active {
    border: 1px solid #000;
  }
`

interface ImageSet {
  data: IGatsbyImageData
  title: string
}

const ProductCarousel = ({ imageSet }: { imageSet: ImageSet[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <Component>
      <StyledSwiper
        spaceBetween={50}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        loop
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        modules={[Thumbs, Navigation]}
        grabCursor
        onSlideChange={swiper => thumbsSwiper?.slideTo(swiper.realIndex)}
      >
        {imageSet.map((image: ImageSet, i: number) => (
          <SwiperSlide key={`product-carousel-slide-${i}`}>
            <GatsbyImage image={image.data} alt={image.title} loading="eager" />
          </SwiperSlide>
        ))}
      </StyledSwiper>
      {imageSet.length > 1 && (
        <div className="navigation">
          <a className="prev" role="button">
            <Left />
          </a>
          <StyledThumbs
            spaceBetween={10}
            slidesPerView={3}
            onSwiper={swiper => setThumbsSwiper(swiper)}
            watchSlidesProgress
            threshold={15}
          >
            {imageSet.map((image: ImageSet, i: number) => (
              <SwiperSlide key={`product-carousel-thumb-${i}`}>
                <GatsbyImage
                  image={image.data}
                  alt={image.title}
                  loading="eager"
                />
              </SwiperSlide>
            ))}
          </StyledThumbs>
          <a className="next" role="button">
            <Right />
          </a>
        </div>
      )}
    </Component>
  )
}

export default ProductCarousel
