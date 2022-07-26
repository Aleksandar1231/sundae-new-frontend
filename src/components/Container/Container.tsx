import React from 'react';

interface ContainerProps {
    children?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ children}) => {

    return <div>{children}</div>;
};

export default Container;
