import styled from 'styled-components'

export const ListHeader = styled.div`
  display: flex;

  button {
    padding: 15px;
    border: none;
    background: transparent;
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`
