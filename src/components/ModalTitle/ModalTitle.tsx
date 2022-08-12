import React from 'react';
import styled from 'styled-components';

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => <StyledModalTitle>{text}</StyledModalTitle>;

const StyledModalTitle = styled.div`
  align-items: center;
  color: grey;
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: 20px;
  justify-content: center;
  margin-top: 20px;
`;

export default ModalTitle;
