import React from 'react';
import styled from 'styled-components';

export interface IconProps {
    color?: string;
    children?: string;
}

interface Props {
    children: React.ReactNode;
  }
  

const Icon: React.FC<Props> = ({children}) => <StyledIcon>{children}</StyledIcon>;

const StyledIcon = styled.div``;

export default Icon;

