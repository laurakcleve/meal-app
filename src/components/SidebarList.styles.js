import styled from 'styled-components'

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    margin: 5px 0;
    border-radius: 3px;

    &.selected,
    &.selected > button {
      color: #fff;
      background-color: ${({ theme }) => theme.colors.highlight};
    }

    button {
      width: 100%;
      height: 100%;
      padding: 5px;
      border: none;
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text};
      font-family: 'Roboto';
      font-size: 13px;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
    }
  }
`

export const temp = styled.div``
