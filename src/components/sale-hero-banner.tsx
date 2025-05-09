import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Link } from "gatsby"

const Component = styled.div`
  .sale-hero {
    @media screen and (max-width: 600px) {
      min-height: 210px;
    }
    object-fit: cover;
    object-position: center;
  }
`

type Props = {
  data: {
    gatsbyImageData: IGatsbyImageData
  }
  enableSaleHero: boolean
  saleHeroUrl: string
  enableSaleHeroUrl: boolean
}

const SaleHeroBanner: React.FC<Props> = ({
  data,
  enableSaleHero,
  saleHeroUrl,
  enableSaleHeroUrl,
}) => {
  return (
    <Component className="container">
      {enableSaleHero &&
        (enableSaleHeroUrl ? (
          <Link to={saleHeroUrl}>
            <GatsbyImage
              image={data.gatsbyImageData}
              alt="Sale Hero"
              className="sale-hero"
            />
          </Link>
        ) : (
          <div>
            <GatsbyImage
              image={data.gatsbyImageData}
              alt="Sale Hero"
              className="sale-hero"
            />
          </div>
        ))}
    </Component>
  )
}

export default SaleHeroBanner
