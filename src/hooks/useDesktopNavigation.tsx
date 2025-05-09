import { useStaticQuery, graphql } from "gatsby"

export const useDesktopNavigation = () => {
  const { contentfulMenu } = useStaticQuery(graphql`
    query MenuQuery {
      contentfulMenu(name: { eq: "Desktop Main" }) {
        items {
          id
          name
          url
          image {
            gatsbyImageData(quality: 40, width: 600)
            title
          }
          subListItems {
            id
            name
            url
            image {
              gatsbyImageData(quality: 40, width: 600)
              title
            }
          }
        }
      }
    }
  `)
  return contentfulMenu
}
