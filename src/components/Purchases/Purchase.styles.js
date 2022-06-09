import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  h2 {
    flex: 1;
  }

  button {
    padding: 10px 15px;
    font-size: 12px;
    background-color: ${({ theme }) => theme.colors.deleteButton};
  }
`

export const Name = styled.div`
  flex: 1.5;
`

export const Weight = styled.div`
  flex: 1;
`

export const Quantity = styled.div`
  flex: 1;
`

export const Price = styled.div`
  flex: 1;
`

export const WeightPrice = styled.div`
  flex: 1;
`

export const QuantityPrice = styled.div`
  flex: 1;
`
