'use client'

import { Trash } from "lucide-react";

function DeleteBtn({ id }: { id: string }) {

    const handleDelete = async ({ id }: { id: string }) => {
        try {
            await fetch(`/api/scans/${id}`, {
                method: "DELETE",
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="">
            <button
                onClick={() => handleDelete({ id })}
                className="text-ink hover:text-paper-danger z-30 transition-all duration-200 p-2 rounded-sm cursor-pointer"
            >
                <Trash className="h-4 w-4" />
            </button>
        </div>
    )
}

export default DeleteBtn