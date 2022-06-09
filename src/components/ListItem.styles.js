import styled from 'styled-components'

export const ListItem = styled.div`
  margin-bottom: 7px;
  background: ${({ theme }) => theme.colors.listItemBackground};
  border-radius: 3px;
  font-family: 'Roboto';
  font-size: 13px;
  font-weight: 500;
`

export const FlexBar = styled.div`
  display: flex;
  grid-gap: 10px;
  padding: 15px;
  cursor: pointer;

  div:first-letter {
    text-transform: uppercase;
  }
`
