import React from "react";
import classNames from "classnames";

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Container = ({children, className}: Props) => {
    return (
        <div className={classNames(
            "", /* Top padding plus mobile fix */
            "mx-auto max-w-6xl " + (className ? className : ""),
            "px-2"
        )}>
            {children}
        </div>
    )
}

export default Container;

