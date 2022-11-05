import React from "react";
import classNames from "classnames";

interface Props {
    children: React.ReactNode;
}

const CodeBlock = ({children}: Props) => {
    return <span className={classNames(
        'mb-1',
        'text-base',
        'bg-gray-100 hover:bg-gray-200',
        'dark:bg-gray-600 dark:hover:bg-gray-700',
    )}
                 style={{
                     padding: '2px 5px'
                 }}
    >
        {children}
    </span>
}


export default CodeBlock;