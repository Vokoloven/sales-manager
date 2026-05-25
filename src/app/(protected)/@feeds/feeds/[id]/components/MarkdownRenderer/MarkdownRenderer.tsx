'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { MarkdownRendererProps } from './models/markdownRenderer.model';
import styles from './MarkdownRenderer.module.css';

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => (
  <div className={styles.markdown}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);

export { MarkdownRenderer };
