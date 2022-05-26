import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  p {
    margin: 0;
  }

  .column {
    flex: 1;
  }
`

export const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 30px;

  button {
    text-transform: uppercase;
    font-size: 12px;
    margin-left: 10px;
  }

  .svg-inline--fa.fa-w-16 {
    margin-left: 8px;
  }
`

export const AddDate = styled.div`
  h3 {
    margin-top: 0;
  }
`

export const Amount = styled.div``

export const UsedIn = styled.div`
  h3 {
    margin-top: 0;
  }
`
