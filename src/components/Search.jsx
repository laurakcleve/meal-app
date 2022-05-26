import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './Search.styles'

const Search = ({ searchText, setSearchText }) => {
  return (
    <Styled.Container>
      <span>Search</span>
      <input
        type="text"
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
      <Styled.Button type="button" onClick={() => setSearchText('')}>
        <FontAwesomeIcon icon={faTimes} />
      </Styled.Button>
    </Styled.Container>
  )
}

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
}

export default Search
