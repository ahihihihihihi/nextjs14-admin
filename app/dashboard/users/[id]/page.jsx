

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {



    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src={"/noavatar.png"} alt="" fill style={{ objectFit: "cover" }} />
                </div>
                John Doe
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="John Doe" />
                    <label>Email</label>
                    <input type="email" name="email" placeholder="john@gmail.com" />
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" />
                    <label>Phone</label>
                    <input type="text" name="phone" placeholder="123456789" />
                    <label>Address</label>
                    <textarea type="text" cols={3} name="address" placeholder="address" />
                    <label>Is Admin?</label>
                    <select name="isAdmin" id="isAdmin">
                        <option value={true}>Yes</option>
                        <option value={false} selected>No</option>
                    </select>
                    <label>Is Active?</label>
                    <select name="isActive" id="isActive">
                        <option value={true} selected>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default SingleUserPage;