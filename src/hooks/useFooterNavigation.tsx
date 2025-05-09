import { useStaticQuery, graphql } from "gatsby"

export const useFooterNavigation = () => {
  const { contentfulMenu } = useStaticQuery(graphql`
    query FooterMenuQuery {
      contentfulMenu(name: { eq: "Footer" }) {
        items {
          name
          subListItems {
            name
            url
          }
        }
      }
    }
  `)
  return contentfulMenu
}
