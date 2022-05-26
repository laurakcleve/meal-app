import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
  margin-bottom: 20px;

  span {
    margin-right: 7px;
    font-size: 13px;
    text-transform: uppercase;
  }

  input {
    background-color: #f8f7f7;
    border: 1px solid #c1bfbe;
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
