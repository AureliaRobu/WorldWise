import styles from './Sidebar.module.css';
import Logo from './Logo.tsx';
import AppNav from './AppNav';
import Footer from './Footer';
import {Outlet} from "react-router-dom";

function SideBar(props) {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;
