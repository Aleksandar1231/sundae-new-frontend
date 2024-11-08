import React, { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';

interface ModalsContext {
  content?: React.ReactNode;
  isOpen?: boolean;
  onPresent: (content: React.ReactNode) => void;
  onDismiss: () => void;
}

export const Context = createContext<ModalsContext>({
  onPresent: () => { },
  onDismiss: () => { },
});

const Modals: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>();

  const handlePresent = useCallback(
    (modalContent: React.ReactNode) => {
      setContent(modalContent);
      setIsOpen(true);
    },
    [setContent, setIsOpen],
  );

  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setIsOpen(false);
  }, [setContent, setIsOpen]);

  console.log(content)
  return (
    <Context.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
            })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  );
};

const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledModalBackdrop = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Modals;
