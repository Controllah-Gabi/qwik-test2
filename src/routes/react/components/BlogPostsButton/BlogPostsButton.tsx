/** @jsxImportSource react */
import { FC } from 'react';
import styles from '../../../styles/Home.module.scss';

export const BlogPostsButton: FC = () => (
  <section>
    <div className={styles['blog-posts']}>
      <a
        href="/blogposts"
        className={styles['blog-posts__link']}
        data-cy="home-desktop__blog-posts"
      >
        ARTICLES
      </a>
    </div>
  </section>
);

export default BlogPostsButton;
