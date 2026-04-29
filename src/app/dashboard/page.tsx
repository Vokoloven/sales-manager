import { recoverUser } from '@/shared/recoverUser/actions/recoverUser.action';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Sales Manager',
  description: 'Dasboard with active sales information'
};

const DashboardPage = async () => {
  const result = await recoverUser();

  console.log(result);

  return <h1>DashboardPage is created</h1>;
};

export default DashboardPage;
