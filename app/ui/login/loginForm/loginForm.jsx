"use client";


import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const router = useRouter()

    const [state, formAction] = useFormState(authenticate, null);

    console.log(">>>check state: ", state)

    useEffect(() => {
        if (state === null) {
            router.push('/dashboard')
        }
        console.log(">>>check state 2: ", state)
    }, [state])

    return (
        <form action={formAction} className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {state && state}
        </form>
    );
};

export default LoginForm;