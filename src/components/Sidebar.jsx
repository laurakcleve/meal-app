import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './Sidebar.styles'

const Sidebar = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>
}

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Sidebar
