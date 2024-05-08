import {FC} from 'react';

import styles from './styles.module.sass';

interface Props {
  name: string;
}

const HelloWorld: FC<Props> = ({name}) => {
  return <div className={styles.root}>Hello {name}!</div>;
};

export default HelloWorld;
