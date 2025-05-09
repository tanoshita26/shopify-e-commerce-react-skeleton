import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
// search
import "instantsearch.css/themes/satellite.css"
import algoliasearch from "algoliasearch/lite"
import {
  Configure,
  InstantSearch,
  RefinementList,
  connectStateResults,
} from "react-instantsearch-dom"
import SearchBox from "../components/search/search-box"
import Hits from "../components/search/hits"
import CustomPagination from "../components/search/pagination"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID as string,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY as string
)

interface Location {
  location: {
    state: {
      prevPath: string
      key: string
    }
  }
}

const hitsPerPage = 18

const Page = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  input {
    font-family: var(--sub-heading-font);
  }
  @media only screen and (max-width: 468px) {
    min-height: calc(100vh - 152px - 250px);
    &.no-query {
      display: flex;
      flex-direction: column;
      /* h1,
      div {
        flex: 1 0 auto;
      } */
    }
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  .ais-Pagination-link {
    border-radius: 0;
    background-image: unset;
    border-color: #000;
    box-shadow: none;
  }
  .ais-Pagination-item--selected .ais-Pagination-link {
    border-color: #000;
    box-shadow: none;
    background-image: unset;
  }
  .ais-Pagination-item--disabled .ais-Pagination-link {
    border-color: #000;
    box-shadow: none;
    background-image: unset;
  }
`

const Search = ({ location: { state } }: Location) => {
  const Results = connectStateResults(({ searchState, searchResults }) => {
    return searchState && searchState.query ? (
      searchResults && searchResults.nbHits !== 0 ? (
        <Page>
          <h1 className="page-title text-center">SEARCH</h1>
          <div className="text-center search-box">
            <SearchBox />
          </div>
          <RefinementList attribute="product_type" />
          <Hits />
          {searchResults.nbHits > hitsPerPage && (
            <PaginationContainer>
              <CustomPagination />
            </PaginationContainer>
          )}{" "}
        </Page>
      ) : (
        <Page>
          <h1 className="page-title text-center">SEARCH</h1>
          <div className="text-center search-box">
            <SearchBox />
          </div>
          <div className="text-center">No Results</div>
        </Page>
      )
    ) : (
      <Page className="no-query">
        <h1 className="page-title text-center">SEARCH</h1>
        <div className="text-center search-box">
          <SearchBox />
        </div>
      </Page>
    )
  })

  return (
    <Layout>
      <InstantSearch searchClient={searchClient} indexName="Products">
        <Configure hitsPerPage={hitsPerPage} />
        <SEO title="Search" />
        <Results />
      </InstantSearch>
    </Layout>
  )
}

export default Search
