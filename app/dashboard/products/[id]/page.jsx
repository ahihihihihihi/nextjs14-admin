
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = async () => {


    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
                Iphone
            </div>
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Iphone" />
                    <label>Price</label>
                    <input type="number" step={0.01} name="price" placeholder="Price" />
                    <label>Stock</label>
                    <input type="number" name="stock" placeholder="Stock" />
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder={"color"}
                    />
                    <label>Size</label>
                    <input
                        type="text"
                        name="size"
                        placeholder={"size"}
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
                        placeholder="desc"
                    ></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    );
};

export default SingleProductPage;