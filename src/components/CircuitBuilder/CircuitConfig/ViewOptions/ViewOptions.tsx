import React from 'react';
import styles from './ViewOptions.module.scss';

const ViewOptions : React.FC = () => {


    return <div className={styles.viewOptions}>
        <button>Compress circuit</button>
        <button> +  | - </button>
    </div>
}

export default ViewOptions;
