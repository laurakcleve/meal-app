import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './TopBar.styles'

const TopBar = ({ children }) => {
  return <Styled.TopBar>{children}</Styled.TopBar>
}

TopBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
export default TopBar
