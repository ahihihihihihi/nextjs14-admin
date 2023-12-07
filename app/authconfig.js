
export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request }) {
            const isLoggedIn = auth?.user;
            // console.log("check auth:", auth)
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) {
                    return true;

                } else {
                    return false;
                }
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }
            return true;
        },
    },
};