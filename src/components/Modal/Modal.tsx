'use client';

import { memo, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type { TModal } from './models/modal.model';
import styles from './Modal.module.css';

const Modal = ({ ref, title, buttons, children }: TModal) => {
  const body = useSyncExternalStore(
    () => () => undefined,
    () => document.body,
    () => null
  );

  if (!body) return body;

  return createPortal(
    <dialog ref={ref} className={styles.dialog}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </header>

      {children && <div className={styles.body}>{children}</div>}

      {buttons && (
        <div className={styles.footer}>
          {buttons[0]}
          {buttons[1]}
        </div>
      )}
    </dialog>,
    body
  );
};

export default memo(Modal);
