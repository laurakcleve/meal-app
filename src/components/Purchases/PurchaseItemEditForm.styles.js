import styled from 'styled-components'
import { Form } from '../Form.styles'
import Input from '../Input'

export const EditForm = styled(Form)`
  margin-bottom: 20px;
`

export const Label = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
`

export const Combo = styled.div`
  .input {
    display: inline-block;
    background-color: #f8f7f7;
    margin-right: 2px;
  }
`

export const Amount = styled(Input)`
  input {
    width: 60px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #ededed;
    margin-right: -1px;

    ::placeholder {
      color: #c3c3c3;
    }
  }
`

export const Unit = styled(Input)`
  input {
    width: 75px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #ededed;

    ::placeholder {
      color: #c3c3c3;
    }
  }
`

export const Price = styled(Input)`
  max-width: 130px;

  label {
    position: relative;
  }

  input {
    padding-left: 27px;
    background-color: #ededed;
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
  }
`
