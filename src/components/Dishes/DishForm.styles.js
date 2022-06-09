import styled from 'styled-components'

import Form from '../Form'
import Input from '../Input'

export const DishForm = styled(Form)`
  .label {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.mutedText};
  }

  input {
    background-color: ${({ theme }) => theme.colors.inputBackgroundLight};
  }

  .row {
    display: flex;
    width: 100%;
  }
`

export const Name = styled(Input)`
  width: 100%;
`

export const Tags = styled.div`
  width: 100%;
  flex: 0 0 68%;
`

export const Active = styled.div``

export const Ingredients = styled.div`
  width: 100%;

  button {
    background-color: ${({ theme }) => theme.colors.actionButton};
  }
`

export const IngredientSet = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;

  .inputs {
    flex: 1 1 50%;
  }
`

export const IngredientInputWrapper = styled.div`
  &:first-child input {
    width: 330px;
    display: inline-block;
  }

  &:not(:first-child) {
    margin-left: 40px;
    position: relative;

    :before {
      content: 'or';
      display: inline-block;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 10px;
      left: -25px;
      text-transform: uppercase;
      font-size: 12px;
    }
  }

  button {
    margin-left: 5px;
    width: auto;
    height: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    :focus-visible {
      outline: none;
      border: none;
    }
  }
`

export const IngredientInput = styled.input`
  display: inline-block;
  min-width: 290px;
  margin-bottom: 5px;
`

export const Checkbox = styled.label`
  font-size: 14px;
`

export const AddSubstitute = styled.div`
  align-self: flex-end;
  flex: 1 0 70px;
  padding-bottom: 28px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    font-size: 12px;
    margin-right: 15px;

    &.cancel {
      background-color: ${({ theme }) => theme.colors.cancelButton};
    }

    &.save {
      background-color: ${({ theme }) => theme.colors.confirmButton};
    }
  }
`
