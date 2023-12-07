'use client'

import { updateProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "@/app/lib/firebase"

const UpdateProduct = ({ product }) => {

    const [media, setMedia] = useState(product.img || "/noproduct.jpg");
    const [file, setFile] = useState(null);

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
                {product.title}
            </div>
            <div className={styles.formContainer}>
                <form action={updateProduct} className={styles.form}>
                    <input type="hidden" name="id" value={product._id} />
                    <input type="hidden" name="img" value={media} />
                    <label>Title</label>
                    <input type="text" name="title" placeholder={product.title} />
                    <label>Price</label>
                    <input type="number" step={0.01} name="price" placeholder={product.price} />
                    <label>Stock</label>
                    <input type="number" name="stock" placeholder={product.stock} />
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder={product.color || "color"}
                    />
                    <label>Size</label>
                    <input
                        type="text"
                        name="size"
                        placeholder={product.size || "size"}
                    />
                    <label>Cat</label>
                    <select name="cat" id="cat">
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label>Description</label>
                    <textarea
                        name="desc"
                        id="desc"
                        rows="10"
                        placeholder={product.desc}
                    ></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;