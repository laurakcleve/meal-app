import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const Tags = styled.div`
  flex: 1;

  h3 {
    margin-top: 0;
  }
`

export const Ingredients = styled.div`
  flex: 1;

  h3 {
    margin-top: 0;
  }
`

export const Dates = styled.div`
  flex: 1;
`

export const DateList = styled.div`
  margin-top: 20px;

  li {
    padding: 3px;

    &:hover button.delete {
      opacity: 1;
    }
  }

  button.delete {
    width: auto;
    height: auto;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 5px;
    cursor: pointer;
    opacity: 0;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .svg-inline--fa.fa-w-16 {
    width: 0.75em;
  }
`

export const DateForm = styled.form`
  label {
    margin-left: 3px;
  }

  input {
    display: block;
    margin: 10px 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.inputBackgroundLight};
  }

  button[type='submit'] {
    background-color: ${({ theme }) => theme.colors.confirmButton};
    color: #fff;
    font-weight: normal;
  }
`

export const Actions = styled.div`
  flex: 0 0;
  display: flex;
  justify-content: flex-end;

  button.edit {
    font-size: 12px;
    background-color: ${({ theme }) => theme.colors.actionButton};
  }
`
