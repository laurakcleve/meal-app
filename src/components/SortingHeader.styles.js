import styled from 'styled-components'

export const ListHeader = styled.div`
  display: flex;

  button {
    padding: 15px 15px 8px;
    border: none;
    background: transparent;
    font-size: 11px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.highlightLight};

    &:focus {
      outline: none;
    }
  }
`
