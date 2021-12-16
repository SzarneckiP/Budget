import React from 'react';
import styled, { keyframes } from 'styled-components';

const circleAnimation = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`

const Root = styled.div`
  display: flex;
  transform: translateZ(1px);
`

const Content = styled.div`
  justify-content: center;
  display: flex;
  width: 190px;
  height: 190px;
  margin: auto;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.gray.normal};
  animation: ${circleAnimation} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`


function LoadingIndicator() {
    return (
        <Root>
            <Content />
        </Root>
    )
}

export default LoadingIndicator;