import React from 'react'

const CodeBlock = props => (
    <pre { ...props.attributes }>
        <code> { props.children } </code>
    </pre>
);

export default CodeBlock;