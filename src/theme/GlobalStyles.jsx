import { createGlobalStyle } from 'styled-components'
import 'typeface-mukta'
import 'typeface-roboto'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkGrey};
    font-family: 'Roboto';
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.colors.inputBackground}; 
    color: ${({ theme }) => theme.colors.darkGrey};
    border: none;
    border-radius: 4px;
    font-family: 'Roboto'
  }

  button {
    padding: 5px 7px;
    color: ${({ theme }) => theme.colors.darkGrey};
    font-family: 'Roboto';
    border-radius: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.grey}`};
  }

  .checkbox {
    position: relative;
  
    input[type="checkbox"] {
      position: relative;
      opacity: 0;
      z-index: 2;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    .labelText {
      position: relative;
      display: inline-block;
      top: -3px;
    }

    /* Checkbox outline */
    .labelText:before {
      content: "";
      position: absolute;
      top: -2px;
      left: -24px;
      display: inline-block;
      height: 17px;
      width: 17px;
      border: 1px solid;
      border-radius: 3px;
      box-sizing: border-box;
    }

    /* Checkmark */
    .labelText:after {
      content: none;
      position: absolute;
      top: 2px;
      left: -21px;
      display: inline-block;
      height: 4px;
      width: 8px;
      border-left: 2px solid;
      border-bottom: 2px solid;
      transform: rotate(-46deg);
    }

    input[type="checkbox"]:checked + .labelText:after {
      content: "";
    }

    input[type="checkbox"]:focus + .labelText:before {
      border-width: 2px;
    }
  }

  select {
    background-color: ${({ theme }) => theme.colors.lighterGrey};
    color: ${({ theme }) => theme.colors.darkGrey};
    border: none;
    border-radius: 4px;
    font-family: 'Roboto';
    padding: 9px 10px;
  }
`

export default GlobalStyles
