import styled from 'styled-components'

import Form from '../Form'
import Input from '../Input'

export const AddForm = styled(Form)`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: 3fr 2fr;

  input {
    border: 1px solid #c1bfbe;

    &::placeholder {
      color: #bebebe;
    }

    &:focus {
      outline: none;
    }
  }
`

export const PurchaseSection = styled.div`
  flex: 0 0 60%;
  display: flex;
  align-self: start;
  flex-wrap: wrap;
  grid-gap: 15px;
`

export const InventorySection = styled.div`
  flex: 0 0 30%;
  display: flex;
  align-self: start;
  flex-wrap: wrap;
  grid-gap: 15px;
`

export const Item = styled(Input)`
  width: 300px;
  margin-right: 10px;

  input {
    background-color: #f8f7f7;
  }
`

export const Price = styled(Input)`
  max-width: 130px;

  label {
    position: relative;
  }

  input {
    padding-left: 27px;
    background-color: #f8f7f7;
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
  }
`

export const Amount = styled(Input)`
  input {
    width: 60px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #f8f7f7;
    margin-right: -1px;
  }
`

export const Unit = styled(Input)`
  input {
    width: 99px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: #f8f7f7;
  }
`

export const Category = styled(Input)`
  width: 100%;

  input {
    background-color: #f8f7f7;
  }
`

export const Location = styled(Input)`
  width: 100%;

  input {
    background-color: #f8f7f7;
  }
`

export const DaysLeft = styled(Input)`
  max-width: 60px;

  input {
    background-color: #f8f7f7;
  }
`

export const Multiple = styled(Input)`
  max-width: 50px;

  input {
    background-color: #f8f7f7;
  }
`
