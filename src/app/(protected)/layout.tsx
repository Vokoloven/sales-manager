import type { TProtectedLayout } from './models/layout.model';
import styles from './layout.module.css';

const ProtectedLayout = ({ aside, feeds }: TProtectedLayout) => {
  return (
    <div className={styles.root}>
      {aside}
      <main>{feeds}</main>
    </div>
  );
};

export default ProtectedLayout;
