import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
`

export const AddButton = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ theme, open }) =>
    open ? theme.colors.grey : theme.colors.green};
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

export const Name = styled.div`
  flex: 3;
`

export const Location = styled.div`
  flex: 2;
`

export const Expiration = styled.div`
  flex: 1;
  text-align: right;
`
