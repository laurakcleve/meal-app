import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

export const Button = styled.button`
  flex: 1;
  padding: 7px;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;

  &[data-match='all'] {
    background-color: ${({ theme, match }) =>
      match === 'all'
        ? theme.colors.highlightDark
        : theme.colors.inputBackgroundLight};
    color: ${({ theme, match }) => (match === 'all' ? '#fff' : theme.colors.grey)};
  }

  &[data-match='any'] {
    background-color: ${({ theme, match }) =>
      match === 'any'
        ? theme.colors.highlightDark
        : theme.colors.inputBackgroundLight};
    color: ${({ theme, match }) => (match === 'any' ? '#fff' : theme.colors.grey)};
  }

  &:first-child {
    margin-right: 10px;
  }
`
