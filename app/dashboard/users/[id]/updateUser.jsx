'use client'
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { useState, useEffect } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "@/app/lib/firebase"
import { updateUser } from "@/app/lib/actions";
import Image from "next/image";


const UpdateUser = ({ user }) => {

    const [media, setMedia] = useState(user.img || "/noavatar.png");
    const [file, setFile] = useState(null);

    // console.log(">>>check media:", media)

    useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL);
                    });
                }
            );
        };

        file && upload();
    }, [file]);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                />
                <div className={styles.imgContainer}>
                    <label htmlFor="image">
                        <Image src={media} alt="" fill style={{ objectFit: "cover", cursor: "pointer" }} />
                    </label>
                </div>
                {user.username}
            </div>
            <div className={styles.formContainer}>
                <form action={updateUser} className={styles.form}>
                    <input type="hidden" name="id" value={user._id} />
                    <input type="hidden" name="img" value={media} />
                    <label>Username</label>
                    <input type="text" name="username" placeholder={user.username} />
                    <label>Email</label>
                    <input type="email" name="email" placeholder={user.email} />
                    {/* <label>Password</label>
                    <input type="password" name="password" placeholder="" /> */}
                    <label>Phone</label>
                    <input type="text" name="phone" placeholder={user.phone} />
                    <label>Address</label>
                    <textarea type="text" cols={3} name="address" placeholder={user.address} />
                    <label>Is Admin?</label>
                    <select name="isAdmin" id="isAdmin">
                        <option value={true} defaultValue={user.isAdmin}>Yes</option>
                        <option value={false} defaultValue={!user.isAdmin}>No</option>
                    </select>
                    <label>Is Active?</label>
                    <select name="isActive" id="isActive">
                        <option value={true} defaultValue={user.isActive}>Yes</option>
                        <option value={false} defaultValue={!user.isActive}>No</option>
                    </select>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;