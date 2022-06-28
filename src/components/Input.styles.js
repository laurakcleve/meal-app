import styled from 'styled-components'

export const Label = styled.label`
  margin-bottom: 10px;

  .label {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.mutedText};
  }
`
export const InputEl = styled.input`
  background-color: ${({ theme }) => theme.colors.inputBackgroundLight};
  width: 100%;
  box-sizing: border-box;

  &[type='date'] {
    text-transform: uppercase;
  }

  &:disabled {
    color: #b4b4b4;
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.mutedText};
    border: none;
  }
`
