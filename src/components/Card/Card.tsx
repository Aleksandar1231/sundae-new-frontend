import React from 'react';

interface Props {
    children: React.ReactNode;
  }
  
const Card: React.FC<Props> = ({children}) => <div>{children}</div>;

export default Card;

