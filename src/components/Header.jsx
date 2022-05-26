import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as Styled from './Header.styles'

const Header = ({ location }) => (
  <Styled.Header>
    <Styled.Container>
      <Styled.CustomLink to="/items" pathname={location.pathname}>
        Items
      </Styled.CustomLink>
      <Styled.CustomLink to="/dishes" pathname={location.pathname}>
        Dishes
      </Styled.CustomLink>
      <Styled.CustomLink to="/inventory" pathname={location.pathname}>
        Inventory
      </Styled.CustomLink>
      <Styled.CustomLink to="/purchases" pathname={location.pathname}>
        Purchases
      </Styled.CustomLink>
    </Styled.Container>
  </Styled.Header>
)

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(Header)
