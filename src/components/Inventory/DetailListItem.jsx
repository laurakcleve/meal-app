import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './DetailListItem.styles'

const DetailListItem = ({ name }) => {
  return <Styled.DetailListItem>{name}</Styled.DetailListItem>
}

DetailListItem.propTypes = {
  name: PropTypes.string.isRequired,
}

export default DetailListItem
