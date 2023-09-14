import React from 'react';
import styles from './admin.module.css';

function Admin() {
  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <p>This is the left column content.</p>
        </div>
        <div className={styles.rightColumn}>
          <p>This is the right column content.</p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
