import { aboutAction } from './actions/about.action';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About | Sales Manager',
  description: 'Application version'
};

const About = async () => {
  const { data } = await aboutAction();

  return (
    <main className={styles.root}>
      <section>
        <h1>About</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>majorBuildVersion</th>
                <th>minorBuildVersion</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.data?.majorBuildVersion}</td>
                <td>{data?.data?.minorBuildVersion}</td>
                <td>{data?.data?.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default About;
