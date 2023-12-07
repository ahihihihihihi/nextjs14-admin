import { fetchProduct } from "@/app/lib/data";
import UpdateProduct from "./updateProduct";

const SingleProductPage = async ({ params }) => {

    const { id } = params;
    const product = await fetchProduct(id);

    return (
        <UpdateProduct
            product={product}
        />
    );
};

export default SingleProductPage;