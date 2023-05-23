import styles from './index.less';
// import { SideBar } from './MainComp/sideBar';

const Index = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>header</div> */}
      <div className={styles.main}>
        {/* <div className={styles.side_bar}> */}
        {/* <SideBar /> */}
        {/* </div> */}
        <div className={styles.main_right}>
          <div className={styles.main_top}>
            <div className={styles.asset}>asset</div>
            <div className={styles.pre}>preview</div>
          </div>
          <div className={styles.main_bottom}>track</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
