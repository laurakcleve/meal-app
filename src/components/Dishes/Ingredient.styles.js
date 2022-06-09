import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Name = styled(Link)`
  display: block;
  margin-left: ${(props) => (props.indented ? '5px' : 'auto')};
  color: ${(props) => (props.isininventory ? 'auto' : props.theme.colors.mutedText)};
`
