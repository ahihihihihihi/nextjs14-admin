import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const LoginPage = () => {

    const cookieStore = cookies()

    const sessionToken = cookieStore.get('next-auth.session-token') ? cookieStore.get('next-auth.session-token') : ''

    // console.log(">>>check sessionToken: ", sessionToken)

    if (sessionToken) {
        redirect("/dashboard")
    }

    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;