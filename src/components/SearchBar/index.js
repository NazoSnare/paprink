import React, { Component } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { ApolloConsumer } from 'react-apollo'
import styled, { keyframes } from 'styled-components'
import Downshift, { resetIdCounter } from 'downshift'
import Router, { withRouter } from 'next/router'

const SEARCH_POSTS_QUERY = gql`
  query SEARCH_POSTS_QUERY($searchString: String) {
    search(searchString: $searchString) {
      id
      slug
      title
      author {
        id
        name
      }
      thumbnail
    }
  }
`

const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => props.posts.length < 5 ? 'auto' : '300px'};
  overflow: scroll;
  background: white;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  ${props => (props.mobile ? 'box-shadow: 0px 0px 5px rgba(0,0,0,.3); border-radius: 6px;' : null)};
  /* padding: 10px; */
`

const DropDownItem = styled.div`
  border-bottom: 1px solid gainsboro;
  background: ${props => props.highlighted ? 'gainsboro' : 'white'};
  padding: 1rem;
  transition: all 0.2s;
  font-weight: bold;
  /* ${props => (props.highlighted ? 'padding-left: 2rem;' : null)}; */
  ${props => props.highlighted ? 'color: black;' : null}
  display: flex;
  align-items: center;
  cursor: pointer;
  /* border-left: ${props => props.mobile ? '6.5px' : '3px'} solid ${props => (props.highlighted ? 'gainsboro' : 'white')}; */
  img {
    margin-right: 10px;
  }
`

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

class SearchBar extends Component {

  state = {
    posts: [],
    loading: false 
  }

  downshiftContext = React.createContext()

  onInputChange = debounce(async (event, client) => {

    this.setState({ posts: [], notFound: false })

    if (event.target.value.length > 2) {

      this.setState({ loading: true })

      const res = await client.query({
        query: SEARCH_POSTS_QUERY,
        variables: { searchString: event.target.value }
      })

      if (res.data.search.length > 0)
        this.setState({ posts: res.data.search, loading: false })
      else
        this.setState({ notFound: true, loading: false })

    }

  }, 400)

  routeToPost = post => {
    this.props.router.push(`/p/${post.slug}-${post.id}`) // TODO: Investigate push vs replace or try using NProgress!
  }

  conditionalRenderByDevice(client) {

    resetIdCounter()

    if (this.props.mobile) {
      return (
        <Downshift onChange={this.routeToPost} itemToString={post => (post === null ? '' : post.title)}>
          {({ getRootProps, getInputProps, getItemProps, getLabelProps, isOpen, inputValue, highlightedIndex }) => (
            <form action="#">
              <input
                { ...getInputProps({

                  type: "search",
                  placeholder: "Type to Search...",
                  required: "required",
                  id: "search",
                  className: `header_search_input menu_mm ${this.state.loading && 'loading'}`,
                  onChange: event => {
                    event.persist()
                    this.onInputChange(event, client)
                  }

                }) }
              />
              { isOpen ? (
                <Dropdown mobile posts={this.state.posts}>
                  { this.state.posts.map((post, index) => (
                    <DropDownItem
                      {...getItemProps({ item: post })}
                      key={post.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={post.thumbnail.smallCardImage} alt={post.title} />
                      {post.title}
                    </DropDownItem>
                  )) }
                  {this.state.notFound && !this.state.loading && (
                    <DropDownItem>
                      <img width="20" src="https://media4.giphy.com/avatars/cabuu/uVaoNVXPobqj.gif" alt="Search Query failed!" />
                      NOTHING FOUND :/
                    </DropDownItem>
                  )}
                </Dropdown>
              ) : null }
              <img className="header_search_icon menu_mm" src="/static/prebuilt/images/search.png" alt="" />
            </form>
          )}
        </Downshift>
      )
    }

    return (
      <Downshift onChange={this.routeToPost} itemToString={post =>  (post === null ? '' : post.title)}>
        { ({ getRootProps, getInputProps, getItemProps, getLabelProps, isOpen, inputValue, highlightedIndex }) => (
          <form action="#">
            <input 
              { ...getInputProps({

                type: "search",
                placeholder: "Type to Search...",
                required: "required",
                id: "search",
                // refKey: "downshiftContext",
                className: `header_search_input ${this.state.loading && 'loading'}`,
                onChange: event => {
                  event.persist()
                  this.onInputChange(event, client)
                }

              }) }
            />
            { isOpen ? (
              <Dropdown posts={this.state.posts}>
                { this.state.posts.map((post, index) => (
                  <DropDownItem
                    {...getItemProps({ item: post })}
                    key={post.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={post.thumbnail.smallCardImage} alt={post.title} />
                    {post.title}
                  </DropDownItem>
                )) }
                {this.state.notFound && !this.state.loading && (
                  <DropDownItem>
                    <img width="20" src="https://media4.giphy.com/avatars/cabuu/uVaoNVXPobqj.gif" alt="Search Query failed!" />
                    NOTHING FOUND :/
                  </DropDownItem>
                )}
              </Dropdown>
            ) : null }
            <img className="header_search_icon" src="/static/prebuilt/images/search.png" alt="Instant Search" />
          </form>
        ) }
      </Downshift>
    )

  }

  render() {
    return (
      // <SearchStyles>
        <ApolloConsumer>
          { client => this.conditionalRenderByDevice(client) }
        </ApolloConsumer>
      // </SearchStyles>
    )
  }

}

export default withRouter(SearchBar)