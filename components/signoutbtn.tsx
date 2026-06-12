'use client';
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

function Signoutbtn() {

  const handleSignOut = () => signOut({ callbackUrl: "/login" })

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="paper-btn paper-btn-ghost text-paper-danger"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}

export default Signoutbtn;
