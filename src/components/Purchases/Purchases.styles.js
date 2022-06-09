import styled from 'styled-components'

import Form from '../Form'

export const Location = styled.div`
  flex: 1;
`

export const Date = styled.div``

export const AddForm = styled(Form)`
  margin: 25px 0 60px;

  input {
    background-color: ${({ theme }) => theme.colors.inputBackgroundDark};
  }

  button {
    margin-top: 14px;
    background-color: ${({ theme }) => theme.colors.confirmButton};
  }
`
