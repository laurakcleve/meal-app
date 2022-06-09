import styled from 'styled-components'
import Input from './Input'

export const Wrapper = styled.div`
  ul {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
`

export const ListItem = styled.li`
  background-color: ${({ theme }) => theme.colors.tag};
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: normal;
  display: inline;
  margin-right: 10px;
  flex: 0 0 auto;

  // suggested by styled-components docs to override styles
  // with higher specificity (in this case the form
  // component button)
  && button {
    width: auto;
    height: auto;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 15px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.tag};
    color: ${({ theme }) => theme.colors.tagButton};

    &:focus {
      outline: none;
    }
  }
`

export const ItemInput = styled(Input)`
  max-width: 200px;
`
