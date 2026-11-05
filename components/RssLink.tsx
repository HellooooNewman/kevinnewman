import styles from './RssLink.module.css';

export default function RssLink() {
  return (
    <a className={styles.link} href="/feed.xml" aria-label="Subscribe via RSS" title="Subscribe via RSS">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
        <circle cx="5" cy="19" r="1" fill="currentColor" />
        <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
      </svg>
    </a>
  );
}
