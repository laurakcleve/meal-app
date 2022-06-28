import styled from 'styled-components'
import { Form } from '../Form.styles'
import Input from '../Input'

export const EditForm = styled(Form)`
  margin-bottom: 20px;
`

export const Label = styled.div`
  display: block;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`

export const Combo = styled.div`
  .input {
    display: inline-block;
    margin-right: 2px;
  }
`

export const Amount = styled(Input)`
  input {
    width: 60px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -1px;

    ::placeholder {
      color: ${({ theme }) => theme.colors.mutedText};
    }
  }
`

export const Unit = styled(Input)`
  input {
    width: 75px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

export const Price = styled(Input)`
  max-width: 130px;

  label {
    position: relative;
  }

  input {
    padding-left: 27px;
  }

  .label::after {
    content: '$';
    position: absolute;
    top: 22px;
    left: 10px;
    font-size: 16px;
    z-index: 1;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    width: 70px;

    &.cancel {
      background-color: ${({ theme }) => theme.colors.cancelButton};
    }

    &.save {
      background-color: ${({ theme }) => theme.colors.confirmButton};
    }
  }
`
