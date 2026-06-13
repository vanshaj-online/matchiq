'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import DeleteModal from "./DeleteModal";

function DeleteBtn({ id }: { id: string }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/scans/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-label="Delete scan record"
                className="text-ink hover:text-paper-danger z-30 transition-all duration-200 p-2 rounded-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-paper-ink"
            >
                <Trash className="h-4 w-4" />
            </button>

            <DeleteModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleConfirmDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}

export default DeleteBtn;