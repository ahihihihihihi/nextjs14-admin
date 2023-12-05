import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Admin Portal</div>
            <div className={styles.text}>2022 © All rights reserved.</div>
        </div>
    );
};

export default Footer;