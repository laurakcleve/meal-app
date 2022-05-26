import React from 'react'

import * as Styled from './SortingHeader.styles'

const SortingHeader = ({ children }) => {
  return <Styled.ListHeader>{children}</Styled.ListHeader>
}

export default SortingHeader
