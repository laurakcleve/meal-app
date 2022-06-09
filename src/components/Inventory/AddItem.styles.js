import styled from 'styled-components'

export const AddItem = styled.div`
  margin: 20px 0 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 3px;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    button {
      grid-column: 3;
      grid-row: 3;
      justify-self: right;
      align-self: end;
      padding: 10px 20px;
      background-color: ${({ theme }) => theme.colors.confirmButton};
      border: none;
      color: #fff;
      font-weight: 500;
    }
  }

  .label {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    color: ${({ theme }) => theme.colors.mutedText};
  }

  label {
    margin-bottom: 10px;

    .item {
      grid-column: 1 / span 2;
    }
  }

  input {
    background-color: ${({ theme }) => theme.colors.lighterGrey};
  }
`
