import React from 'react';

function ReportPage() {
  return (
    // Root: fixed-height page that matches HTMLFlipBook page. Flex column keeps footer pinned.
        <div className="bg-white text-black h-full px-8 pt-8 pb-16 box-border font-serif overflow-hidden flex flex-col relative">
      {/* Header block (article masthead) */}
      <div className="bg-yellow-400 text-black p-6 mb-4 shrink-0">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          TESCO CASHING IN ON PLASTIC BAG PRICE HIKE
        </h1>
        <p className="text-sm md:text-base mt-2">Published on: August 15, 2025</p>
      </div>

      {/* Scrollable article body. This is the only part that scrolls. */}
      <div className="flex-1 overflow-y-auto -mr-3 pr-3">
        <p className="mb-4">
          This is the full report on Tesco's plastic bag price hike.
          Our investigation has uncovered evidence that shareholders are pocketing millions
          as consumers are forced to pay for increased bag fees.
        </p>

        <p className="mb-4">
          Our findings show that the price of plastic bags has increased by 500% since 2015,
          while the cost of production has only increased by 5%. This has led to a
          significant increase in profit for the company, at the expense of its customers.
        </p>

        <p className="mb-4">
          Our data is conclusive, and our findings have been verified by a team of independent
          auditors. We have also received a number of reports from concerned citizens who
          have noticed a significant increase in the price of their shopping.
        </p>
      </div>

      {/* Footer pinned to bottom of page */}
      <footer className="absolute bottom-0 left-0 right-0">
        <div className="bg-black text-white text-center h-16 flex items-center justify-center w-full">
          <h2 className="text-2xl font-bold">EXPOSING GREED AND DEMANDING CHANGE</h2>
        </div>
      </footer>
    </div>
  );
}

export default ReportPage;