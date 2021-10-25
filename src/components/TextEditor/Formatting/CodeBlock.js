import React from 'react';

export const CodeBlock = (props) => (
  <pre {...props.attributes}>
    <code> {props.children} </code>
  </pre>
);
