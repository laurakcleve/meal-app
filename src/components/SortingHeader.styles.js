import styled from 'styled-components'

export const ListHeader = styled.div`
  display: flex;

  button {
    padding: 15px;
    border: none;
    background: transparent;
    font-size: 12px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};

    &:focus {
      outline: none;
    }
  }
`
