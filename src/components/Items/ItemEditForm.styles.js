import styled from 'styled-components'

import Input from '../Input'

export const EditForm = styled.form`
  display: flex;
  gap: 40px;
  margin-bottom: 50px;

  input,
  select {
    margin-bottom: 15px;
  }

  button {
    font-size: 12px;
    padding: 10px;
    margin-right: 15px;

    &.delete {
      background-color: ${({ theme }) => theme.colors.deleteButton};
    }

    &.save {
      background-color: ${({ theme }) => theme.colors.confirmButton};
    }

    &.cancel {
      background-color: ${({ theme }) => theme.colors.cancelButton};
    }
  }
`

export const FormContainer = styled.div`
  flex: 0 1 250px;
`

export const ButtonContainer = styled.div`
  flex: 1;
  padding-top: 14px;
`

export const Label = styled.div`
  display: block;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`

export const Name = styled(Input)``

export const Category = styled(Input)``

export const DefaultShelflife = styled(Input)``

export const ItemType = styled.select``

export const CountsAs = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.detailsDivider};
`
