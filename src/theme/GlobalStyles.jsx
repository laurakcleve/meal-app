import { createGlobalStyle } from 'styled-components'
import '@fontsource/be-vietnam-pro'
import '@fontsource/be-vietnam-pro/300.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Be Vietnam Pro';
    font-size: 14px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.colors.inputBackground}; 
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 4px;
    font-family: 'Be Vietnam Pro';

    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.colors.mutedText};
      border: none;
    }
  }

  button {
    padding: 5px 7px;
    color: ${({ theme }) => theme.colors.buttonText};
    font-weight: 600;
    font-family: 'Be Vietnam Pro';
    text-transform: uppercase;
    border-radius: 4px;
    border: none;
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
      border: 2px solid ${({ theme }) => theme.colors.mutedText};
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
    background-color: ${({ theme }) => theme.colors.inputBackgroundLight};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 4px;
    padding: 9px 10px;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`

export default GlobalStyles
