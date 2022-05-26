import styled from 'styled-components'

export const Price = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;

  h3 {
    margin: 0;
    font-size: 16px;
  }
`

export const PriceByLocation = styled.div`
  margin-top: 20px;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  table {
    margin-top: 5px;
    border-spacing: 15px;

    .location {
      text-transform: capitalize;
    }
  }
`
