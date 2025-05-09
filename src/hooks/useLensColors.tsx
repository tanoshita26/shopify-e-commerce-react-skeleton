import { useStaticQuery, graphql } from "gatsby"

export const useLensColors = () => {
  const LensColors = useStaticQuery(
    graphql`
      query {
        smoke: file(relativePath: { eq: "smoke-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        smoke_gradient: file(relativePath: { eq: "smoke-gradient-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        brown: file(relativePath: { eq: "brown-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        brown_gradient: file(relativePath: { eq: "brown-gradient-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        g15: file(relativePath: { eq: "g15-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        g15_gradient: file(relativePath: { eq: "g15-gradient-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        clear: file(relativePath: { eq: "clear-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        yellow: file(relativePath: { eq: "yellow-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
        burnt_orange: file(relativePath: { eq: "burnt-orange-lens.png" }) {
          childImageSharp {
            gatsbyImageData(quality: 40, height: 55)
          }
        }
      }
    `
  )
  return LensColors
}
