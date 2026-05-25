'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { TMarkdownRendererProps } from './models/markdownRenderer.model';
import styles from './MarkdownRenderer.module.css';

const MarkdownRenderer = ({ content }: TMarkdownRendererProps) => (
  <div className={styles.markdown}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
  </div>
);

export { MarkdownRenderer };
