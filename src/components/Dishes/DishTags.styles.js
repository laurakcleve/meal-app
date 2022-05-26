import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

export const Button = styled.button`
  flex: 1;
  padding: 7px;
  font-family: 'Roboto';
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &[data-match='all'] {
    background-color: ${({ theme, match }) =>
      match === 'all' ? theme.colors.blue : '#fff'};
    color: ${({ theme, match }) =>
      match === 'all' ? '#fff' : theme.colors.grey};
    border: ${({ theme, match }) =>
      match === 'all' ? 'none' : `1px solid ${theme.colors.grey}`};
  }

  &[data-match='any'] {
    background-color: ${({ theme, match }) =>
      match === 'any' ? theme.colors.blue : '#fff'};
    color: ${({ theme, match }) =>
      match === 'any' ? '#fff' : theme.colors.grey};
    border: ${({ theme, match }) =>
      match === 'any' ? 'none' : `1px solid ${theme.colors.grey}`};
  }

  &:first-child {
    margin-right: 10px;
  }
`
