import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  margin-bottom: 20px;

  span {
    margin-right: 7px;
    text-transform: uppercase;
    font-size: 11px;
  }

  input {
    background-color: ${({ theme }) => theme.colors.inputBackgroundDark};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};

    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.colors.mutedText};
    }
  }
`

export const Button = styled.button`
  height: 35px;
  width: 35px;
  color: ${({ theme }) => theme.colors.darkGrey};
  border: none;
  background-color: transparent;
  cursor: pointer;
`
