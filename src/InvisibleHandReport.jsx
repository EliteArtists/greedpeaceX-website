import React from 'react';

function InvisibleHandReport() {
  return (
    <div className="bg-white text-black p-8 font-serif max-w-4xl mx-auto">
      
      {/* Article Title Header (Red Box) - CENTRALIZED */}
      <div className="bg-red-600 text-white p-6 mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          THE INVISIBLE HAND
        </h1>
        <h3 className="text-xl md:text-2xl font-bold mt-2">
          The Seven Companies Controlling Your Food, Energy & Rent
        </h3>
        <p className="text-sm md:text-base mt-2 border-t border-white pt-2 mx-auto inline-block">
          By GreedPeaceX Investigations Team | Published: Coming Soon
        </p>
      </div>
      
      {/* EXECUTIVE SUMMARY */}
      <div className="mb-8 pb-4">
        <h2 className="text-3xl font-extrabold mb-4">Executive Summary</h2>
        <p className="mb-4">
          Across the UK economy—from grocery shelves to your heating bill—power has quietly consolidated into the hands of a few global monopolies. This report investigates the seven primary entities whose control over essential goods and infrastructure directly drives inflation and systemic inequality.
        </p>
        <p className="mb-2">
          These firms do not just compete; they collaborate, setting prices and wages that maximize shareholder profit while communities struggle. This investigation reveals how deep the control runs.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Systemic market failures disguised as "inflation."</li>
          <li>The regulatory vacuum that allows price-fixing to flourish.</li>
          <li>How monopoly power converts into political power.</li>
        </ul>
      </div>

      {/* SECTION: The Illusion of Choice */}
      <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2">The Illusion of Choice</h2>
      <p className="mb-4">
        The typical British household interacts with dozens of brands daily. However, the corporate ownership behind these brands is often tightly clustered, giving consumers the illusion of a free market where none exists. When inflation hits, the narrow corporate layer ensures the price hike is uniform, protecting margins across the entire sector.
      </p>
      <p className="mb-8">
        This investigation will explore how essential sectors, from food distribution to housing finance, are controlled by a tiny handful of interlocked financial and corporate giants.
      </p>
      
      {/* SECTION: Monopoly Checkpoints */}
      <h2 className="text-2xl font-bold mb-3 border-b pb-2">Monopoly Checkpoints</h2>
      <h3 className="text-xl font-bold mb-3">Key Economic Bottlenecks</h3>
      <p className="mb-4">
        The firms exert pressure not through a single point of failure, but by controlling critical bottlenecks in the supply chain:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li>**Energy:** Control over transmission infrastructure and wholesale commodity markets.</li>
        <li>**Food:** Ownership of critical seed and fertiliser production, and major distribution centers.</li>
        <li>**Housing:** Vertical integration of construction, lending, and property management.</li>
      </ul>
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 italic">
        <strong className="font-bold">Fact:</strong> A 10% increase in wholesale gas prices can translate to a 30% increase in household energy costs due to unchecked vertical market power.
      </div>

      {/* SECTION: The Seven Hands of Greed */}
      <h2 className="text-2xl font-bold mb-3 border-b pb-2">The Seven Hands of Greed</h2>
      <p className="mb-4">
        This cartel operates outside public scrutiny, using market volatility as cover for coordinated profiteering. Our full report will detail the specific legal and financial mechanisms used by each company to suppress competition and inflate costs.
      </p>
      
      {/* SECTION: Final Demands */}
      <h2 className="text-2xl font-bold mb-3 border-b pb-2">GPX Demands</h2>
      <p className="mb-4">
        We call for a complete structural overhaul of these industries to break the monopolies:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6">
        <li>Nationalization of energy transmission and distribution infrastructure.</li>
        <li>Mandatory breakup of vertically integrated food distribution conglomerates.</li>
        <li>Implementation of a nationwide, non-commercial social housing program.</li>
      </ul>

      <div className="text-3xl font-extrabold mt-6 text-center italic">
        Monopoly is the engine of greed.
      </div>
    </div>
  );
}

export default InvisibleHandReport;
