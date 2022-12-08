import React from 'react';

interface Props {
    children: React.ReactNode;
}
  


const CardContent: React.FC<Props> = ({children}) => <div>{children}</div>;

export default CardContent;