'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface AccordionState {
  element: HTMLDetailsElement;
  wasOpen: boolean;
}

export default function ReportWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const reportRef = useRef<HTMLDivElement>(null);
  const originalStatesRef = useRef<AccordionState[]>([]);

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: 'MatchIQ Report',
    onBeforePrint: async () => {
      if (reportRef.current) {
        const detailsElements = reportRef.current.querySelectorAll('details');
        originalStatesRef.current = Array.from(detailsElements).map((el) => {
          const wasOpen = el.open;
          el.open = true;
          return { element: el, wasOpen };
        });
      }
    },
    onAfterPrint: () => {
      originalStatesRef.current.forEach(({ element, wasOpen }) => {
        element.open = wasOpen;
      });
      originalStatesRef.current = [];
    },
  });

  return (
    <>
      <div ref={reportRef} className='py-10'>
        <div className='max-w-5xl px-4 sm:px-6 lg:px-8 w-full mx-auto flex items-end justify-end'>
          <button
            onClick={handlePrint}
            className="p-2 rounded-sm bg-paper-secondary text-white print:hidden mb-4 cursor-pointer mono text-sm font-medium hover:bg-paper-secondary/80 transition-colors duration-200 ease-in-out"
          >
            Download PDF
          </button>
        </div>
        {children}
      </div>
    </>
  );
}