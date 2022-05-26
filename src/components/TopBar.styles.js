import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
  padding-bottom: 20px;

  button.add {
    position: relative;
    width: 70px;
    padding: 0 25px;
    font-size: 30px;
    line-height: 0;
    color: #fff;
    border: none;
    background-color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;

    span {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 17px;
      right: 26px;

      &.open {
        transition: transform 0.5s ease;
        transform-origin: 50% 10%;
      }

      &.close {
        transform: rotate(225deg);
        transform-origin: 50% 10%;
        transition: transform 0.5s ease;
      }
    }
  }
`
