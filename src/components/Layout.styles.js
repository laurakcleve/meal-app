import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-width: ${({ theme }) => theme.containerWidth};
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`

export const List = styled.div`
  flex: 1;
  padding: 20px 30px;
`
