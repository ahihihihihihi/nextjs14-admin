
import { fetchUser } from "@/app/lib/data";
import UpdateUser from "./updateUser";



const SingleUserPage = async ({ params }) => {

    const { id } = params;
    const user = await fetchUser(id);
    // console.log(">>>check user:", user)
    // console.log(">>>check user id:", user.id)



    return (

        <UpdateUser
            user={user}
        />

    );
};

export default SingleUserPage;