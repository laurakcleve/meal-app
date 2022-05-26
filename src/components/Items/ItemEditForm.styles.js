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
    text-transform: uppercase;
    font-size: 12px;
    padding: 10px;
    margin-right: 15px;
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
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
`

export const Name = styled(Input)``

export const Category = styled(Input)``

export const DefaultShelflife = styled(Input)``

export const ItemType = styled.select``

export const CountsAs = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid #ccc;
`
