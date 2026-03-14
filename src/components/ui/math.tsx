import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

export function Math({ math, block }: { math: string; block?: boolean }) {
    const html = katex.renderToString(math, {
        throwOnError: false,
        displayMode: block
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
