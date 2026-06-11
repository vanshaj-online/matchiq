'use client'
import { signOut } from "next-auth/react";

function signoutbtn() {
    return (
        <button style={{ border: '1px solid black', cursor: 'pointer' }}
            onClick={() =>
                signOut({
                    callbackUrl: "/login",
                })
            }>signout</button>
    )
}

export default signoutbtn