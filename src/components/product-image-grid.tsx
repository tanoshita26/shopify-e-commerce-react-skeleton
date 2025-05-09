import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"

const Component = styled.section`
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    div {
      cursor: pointer;
    }
    margin-top: 15px;
  }
`

const ProductImageGrid = (props: { product: any; selectedVariant: any }) => {
  const { product, selectedVariant } = props

  interface ImageSet {
    data: IGatsbyImageData
    title: string
    id: string
  }

  // TODO: see why duplicate images are created in the grid
  const createImageSet = () => {
    let imageSet: ImageSet[] = []
    // single Product with images
    if (product.featuredImage && product.featuredImage.localFile) {
      imageSet.push({
        data: product.featuredImage?.localFile?.childImageSharp
          ?.gatsbyImageData,
        title: product.featuredImage.altText,
        id: product.featuredImage.localFile.id,
      })
    }
    if (product.media) {
      product.media.forEach(element => {
        if (element.image.localFile.id !== product.featuredImage.localFile.id)
          imageSet.push({
            data: element.image.localFile.childImageSharp.gatsbyImageData,
            title: element.image.altText,
            id: element.image.localFile.id,
          })
      })
    }

    return imageSet
  }
  const imageSetArr = createImageSet()
  const [featuredImage, setFeaturedImage] = useState<ImageSet | undefined>(
    imageSetArr[0]
  )

  useEffect(() => {
    if (
      selectedVariant &&
      selectedVariant.selectedOptions.some(e => e.name !== "Size")
    ) {
      if (selectedVariant.image) {
        const toSwap = imageSetArr.find(
          el => el.id === selectedVariant.image.localFile.id
        )
        setFeaturedImage(toSwap)
      }
    }
  }, [selectedVariant])

  return (
    <Component>
      <div className="featured-image">
        {featuredImage && featuredImage.data ? (
          <GatsbyImage image={featuredImage.data} alt={featuredImage.title} />
        ) : (
          <StaticImage
            src="../images/no-image-placeholder.jpg"
            alt="No image available"
          />
        )}
      </div>
      <div className="image-grid">
        {imageSetArr.length !== 0 &&
          imageSetArr.map((image, index) => {
            return (
              <div
                onClick={() => setFeaturedImage(image)}
                key={index}
                className="product-image"
              >
                <GatsbyImage image={image.data} alt={image.title}></GatsbyImage>
              </div>
            )
          })}
      </div>
    </Component>
  )
}

export default ProductImageGrid
