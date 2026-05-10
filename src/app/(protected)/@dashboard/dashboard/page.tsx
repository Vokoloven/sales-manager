import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dashboard | Sales Manager',
  description: 'Dasboard with active sales information'
};

const DashboardPage = () => {
  return (
    <div className={styles.root}>
      <h1>DashboardPage is created</h1>
    </div>
  );
};

export default DashboardPage;
