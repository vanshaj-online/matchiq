'use client';

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  title?: string;
  description?: string;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  title = "Discard Scan Record",
  description = "Are you sure you want to permanently delete this report? \n This action is irreversible."
}: DeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle focus trapping and Escape key
  useEffect(() => {
    if (isOpen) {
      // Record the element that had focus before opening the modal
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Put focus on the safe "Cancel" action first to prevent accidental confirmation
      const timer = setTimeout(() => {
        cancelRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }

        if (e.key === "Tab" && containerRef.current) {
          const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            // Shift + Tab: loop back to end if focus is on the first element
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab: loop back to beginning if focus is on the last element
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
        // Restore focus to the original trigger element when the modal is closed
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  // Lock scrolling on the body while the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-all duration-200"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="paper-card w-full max-w-md p-6 space-y-6 mx-auto animate-fadeIn relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content wrapper to ensure content is stacked above the card's grain texture */}
        <div className="relative z-20 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2
                id="delete-modal-title"
                className="paper-display text-xl font-semibold text-paper-ink leading-tight pt-1"
              >
                {title}
              </h2>
            </div>
          </div>

          <p
            id="delete-modal-description"
            className="paper-body text-sm text-paper-muted leading-relaxed"
          >
            {description}
          </p>

          <hr className="paper-divider" />

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              ref={cancelRef}
              onClick={onClose}
              disabled={isDeleting}
              className="hover:bg-neutral-200/60 transition-all duration-200 cursor-pointer rounded-sm text-sm py-2 px-4 disabled:opacity-50 focus-visible:outline-1 focus-visible:outline-neutral-300 focus-visible:bg-neutral-200/60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="rounded-sm border border-paper-danger/80 cursor-pointer text-paper-danger/80 hover:text-white hover:bg-paper-danger/80 transition-colors duration-150 text-sm py-2 px-4 focus-visible:outline-2 focus-visible:bg-paper-danger/80 focus-visible:text-white focus-visible:outline-paper-danger disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Discarding..." : "Discard Record"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;