/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import styles from '../../../styles/Home.module.scss';

export const WhoWeAre = () => (
  <section>
    <div className={styles['who-we-are']}>
      <p>
        We are Bennetts, a sportswear comparison company that prides itself in
        getting you the best deals online for sportswear. We compare prices from
        all the major retailers and bring you the best deals on the market.
      </p>
    </div>
  </section>
);

export const QWhoWeAre = qwikify$(WhoWeAre, { eagerness: 'visible' });
