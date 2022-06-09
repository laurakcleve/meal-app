import styled from 'styled-components'

export const Wrapper = styled.div`
  display: block;
`

export const Delete = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;

  button {
    font-size: 12px;
    background-color: ${({ theme }) => theme.colors.deleteButton};
  }
`
