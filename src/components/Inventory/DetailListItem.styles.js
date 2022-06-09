import styled from 'styled-components'

export const DetailListItem = styled.div`
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.listItemLightBackground};
  border-radius: 4px;

  &::first-letter {
    text-transform: uppercase;
  }
`

export const temp = styled.div``
