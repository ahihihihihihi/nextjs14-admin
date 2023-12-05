import NavBar from "../ui/dashboard/navbar/navBar";
import SideBar from "../ui/dashboard/sidebar/sideBar";
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer";

const DashBoardLayout = ({ children }) => {

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <SideBar />
            </div>
            <div className={styles.content}>
                <div>
                    <NavBar />
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default DashBoardLayout;