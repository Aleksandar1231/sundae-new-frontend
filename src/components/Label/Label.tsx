import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

interface LabelProps {
    text?: string;
    variant?: 'primary' | 'secondary' | 'normal';
    color?: string;
}

const Label: React.FC<LabelProps> = ({text}) => {
    return <StyledLabel>{text}</StyledLabel>;
};

interface StyledLabelProps {

}

const StyledLabel = styled.div<StyledLabelProps>`
  margin-left: 10px;
`;

export default Label;
