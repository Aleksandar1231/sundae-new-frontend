import React from 'react';
import styled from 'styled-components';

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length;
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <StyledSpacer />}
        </>
      ))}
    </StyledModalActions>
  );
};

const StyledModalActions = styled.div`
  align-items: center;
  display: flex;
  height: 96px;

`;

const StyledModalAction = styled.div`
  flex: 1;
`;

const StyledSpacer = styled.div`
`;

export default ModalActions;
