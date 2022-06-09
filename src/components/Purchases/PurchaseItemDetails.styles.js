import styled from 'styled-components'

export const Container = styled.div`
  button {
    font-size: 12px;
    margin-right: 10px;

    &.edit {
      background-color: ${({ theme }) => theme.colors.actionButton};
    }

    &.delete {
      background-color: ${({ theme }) => theme.colors.deleteButton};
    }
  }
`
