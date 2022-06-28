import styled from 'styled-components'

export const Name = styled.div`
  flex: 4;
`

export const Active = styled.div`
  flex: 1;
  text-transform: uppercase;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedText};
`

export const Date = styled.div`
  flex: 1;
  text-align: right;
`

export const CheckboxLabel = styled.label`
  display: block;
  margin: 10px 0 20px;
  line-height: 1.9;
  cursor: pointer;

  .labelText:before {
    top: 4px;
  }

  .labelText:after {
    top: 8px;
  }
`

export const TopBar = styled.div`
  display: flex;
`

export const AddButton = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ theme, open }) =>
    open ? theme.colors.cancelButton : theme.colors.confirmButton};
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  line-height: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  div {
    transform: ${({ open }) => (open ? 'rotate(45deg)' : 'none')};
  }
`
