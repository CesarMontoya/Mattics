"use client"

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function Math({ math, block }: { math: string; block?: boolean }) {
    if (typeof math !== 'string') return null;

    try {
        const html = katex.renderToString(math, {
            throwOnError: false,
            displayMode: block,
        });

        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (error) {
        console.error("KaTeX rendering error:", error);
        return <span>{math}</span>;
    }
}
