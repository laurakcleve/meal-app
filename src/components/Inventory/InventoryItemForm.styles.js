import styled from 'styled-components'

import Form from '../Form'
import Input from '../Input'

export const InventoryItemForm = styled(Form)``

export const Name = styled(Input)``

export const Location = styled(Input)``

export const Category = styled(Input)``

export const DaysLeft = styled(Input)``

export const AddDate = styled(Input)``

export const Label = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
`

export const Amount = styled(Input)``

export const Multiple = styled(Input)`
  max-width: 50px;
`

export const ItemType = styled.select``

export const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`
