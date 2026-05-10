import { aboutService } from './services/About.service';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About | Sales Manager',
  description: 'Application version'
};

const AboutPage = async () => {
  const { data } = await aboutService.about();

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
                <td>{data?.majorBuildVersion}</td>
                <td>{data?.minorBuildVersion}</td>
                <td>{data?.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
