import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import ShareModal from './ShareModal';

// Assuming you still define MAndSReportContent locally as you provided before
// If you move MAndSReportContent to its own file later, this import line will change.
// For now, let's keep it here for simplicity and focus on fixing the Invisible Hand integration.

// Component containing the M&S report content (KEPT HERE FOR NOW)
const MAndSReportContent = () => (
  <>
    {/* EXECUTIVE SUMMARY */}
    <div className="mb-8 pb-4">
      <h2 className="text-3xl font-extrabold mb-4">Executive Summary</h2>
      <p className="mb-4">
        Marks & Spencer (M&S) has long positioned itself as a pioneer of retail sustainability. But beneath the “Plan A” branding lies a deeper truth: the supermarket’s plastic and packaging programmes generate significant financial benefits — often hidden from public view.
      </p>
      <p className="mb-2">
        Through a combination of opaque bag revenues, cost-avoidance via packaging reduction, and strategic ESG branding, M&S has transformed environmentalism into a profitable engine of corporate growth.
      </p>
      <p className="mb-2">
        This investigation reveals:
      </p>
      <ul className="list-disc list-inside ml-4">
        <li>A hidden profit pool around reusable bag sales</li>
        <li>Lack of transparency around packaging cost savings</li>
        <li>A pattern of selective disclosure designed to avoid regulatory risk while monetizing green goodwill</li>
      </ul>
    </div>

    {/* SECTION: Context & Hypothesis */}
    <h2 className="text-2xl font-bold mt-6 mb-3 border-b pb-2">Context & Hypothesis</h2>
    <p className="mb-4">
      M&S’s “Plan A” is widely regarded as a best-in-class retail sustainability programme. But the company’s own corporate filings state plainly: Plan A is not a cost — it is an enabler of profitable growth.
    </p>
    <p className="mb-8">
      This investigation explores how environmentalism has been woven into the financial fabric of M&S through a trifecta of monetized strategies: revenue from checkout bag sales, cost avoidance via packaging reduction, and ESG branding that supports premium pricing. The result is not greenwashing in the traditional sense — it’s green monetization, strategically designed and operationalized at scale.
    </p>
    
    {/* SECTION: The Bag-for-Life Business */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">The Bag-for-Life Business</h2>
    <h3 className="text-xl font-bold mb-3">From Ethics to Economics</h3>
    <p className="mb-4">
      In 2008, M&S became the first UK retailer to charge 5p for plastic carrier bags. The move, publicly framed as an environmental initiative, helped reduce usage by 3 billion bags in 8 years.
    </p>
    <p className="mb-4">
      But this programme also generated over £10 million in donations — meaning gross revenue likely exceeded £15 million.
    </p>
    <p className="mb-4">
      Today, M&S no longer offers statutory single-use bags. Instead, it sells reusable Bags for Life, typically priced at 30p or more — far above the 10p legal minimum.
    </p>

    <h3 className="text-xl font-bold mb-3">What’s the problem?</h3>
    <ul className="list-disc list-inside ml-4 mb-4">
        <li>M&S does not disclose how many Bags for Life are sold</li>
        <li>It does not report the revenue, cost of production, or profit margin</li>
        <li>It does not state how many are replaced under its return guarantee</li>
    </ul>
    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 italic">
      <strong className="font-bold">Red Flag:</strong> This creates a hidden profit pool. A 30p bag with a 5p production cost generates a 25p gross margin — multiplied by millions.
    </div>

    {/* SECTION: Packaging Reduction as Cost Shield */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Packaging Reduction as Cost Shield</h2>
    <h3 className="text-xl font-bold mb-3">What M&S Claims:</h3>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li>“1 billion units of plastic to be removed by 2027/28”</li>
        <li>“148 million units removed in 2024/25”</li>
        <li>“Switched to paper tape, wood cutlery, paper trays, etc.”</li>
    </ul>
    <p className="mb-4">
      These are genuine sustainability improvements. But they also bring major financial benefits:
    </p>
    
    {/* Table: Financial Impact */}
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-gray-50 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Mechanism</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Financial Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Fewer units bought</td>
            <td className="py-2 px-4 border-b">↓ Procurement cost</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Less plastic</td>
            <td className="py-2 px-4 border-b">↓ Packaging tax (PPT) liability</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Lighter weight</td>
            <td className="py-2 px-4 border-b">↓ Transportation fees</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Recyclable materials</td>
            <td className="py-2 px-4 border-b">↓ Waste management costs</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className="mb-4">
      M&S does not disclose:
    </p>
    <ul className="list-disc list-inside ml-4 mb-4">
        <li>The cost difference between materials (plastic vs paper, biofilms)</li>
        <li>The total savings from reducing 1 billion units</li>
        <li>Whether “eco” materials raised costs or if unit elimination offset them</li>
    </ul>

    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 italic">
      <strong className="font-bold">Red Flag:</strong> “Plastic reduction” is marketed as sacrifice, but functions as a strategic margin booster.
    </div>

    <h3 className="text-xl font-bold mb-3">Industry Cost Estimates:</h3>
    {/* Table: Industry Cost Estimates */}
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-gray-50 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Material</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Est. Unit Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Plastic film (baseline)</td>
            <td className="py-2 px-4 border-b">£0.002 – £0.005</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Paper trays</td>
            <td className="py-2 px-4 border-b">£0.02 – £0.05</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Compostable film</td>
            <td className="py-2 px-4 border-b">£0.005 – £0.01</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Card sleeves</td>
            <td className="py-2 px-4 border-b">£0.015 – £0.03</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mb-8">
      The only way to maintain or increase margin while switching to expensive alternatives? Eliminate units. And that’s exactly what M&S is doing.
    </p>

    {/* SECTION: Scenario: Bag-for-Life Profit Modeling */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Scenario: Bag-for-Life Profit Modeling</h2>
    <p className="mb-4">
      Let’s assume the following:
    </p>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li>M&S sells 50 million Bags for Life annually</li>
        <li>Price: 30p</li>
        <li>Cost: 5p</li>
        <li>Net margin per bag: 25p</li>
        <li>Revenue from Bags for Life: £15 million</li>
        <li>Net profit: £12.5 million</li>
    </ul>
    <p className="mb-4">
      Meanwhile, statutory donation reporting only applies to 5p bags — which M&S no longer sells.
    </p>
    <div className="bg-gray-100 border-l-4 border-gray-600 p-4 mb-8 italic">
      <strong className="font-bold">Bottom line:</strong> M&S retains 100% of profits from high-margin reusable bag sales, while the public believes they’re all donated.
    </div>

    {/* SECTION: Governance & Disclosure Gaps */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Governance & Disclosure Gaps</h2>
    <p className="mb-8">
      M&S reports extensively on its sustainability progress. It highlights carbon reductions, energy savings, and plastic units removed from circulation. Its ESG committee is embedded in board governance, and “Plan A” is consistently positioned as a pillar of corporate strategy. But critical numbers are absent. Nowhere does M&S disclose the total revenue or profit margin from reusable bag sales. It withholds cost savings from packaging reductions and omits any ROI breakdown of its sustainability initiatives. This leaves the public with glowing metrics — and no way to follow the money.
    </p>
    
    {/* SECTION: Greenwashing Risks */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Greenwashing Risks</h2>
    <h3 className="text-xl font-bold mb-3">ASA & CMA Crackdowns</h3>
    <p className="mb-4">
      The UK Advertising Standards Authority (ASA) and Competition & Markets Authority (CMA) are actively targeting:
    </p>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li>Vague green claims</li>
        <li>Omission of material facts</li>
        <li>Misleading sustainability branding</li>
    </ul>
    <p className="mb-4">
      M&S walks a legal tightrope:
    </p>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li>It avoids general terms like “eco-friendly”</li>
        <li>It publishes hard targets (e.g., 1 billion plastic units)</li>
        <li>But it withholds key financial data behind those claims</li>
    </ul>
    <div className="bg-gray-100 border-l-4 border-gray-600 p-4 mb-8 italic">
      <strong className="font-bold">Strategic Ambiguity:</strong> By disclosing just enough to meet ASA rules, but not enough for full transparency, M&S shields its green profit model from scrutiny.
    </div>

    {/* SECTION: Comparative Transparency Scorecard */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Comparative Transparency Scorecard</h2>
    {/* Table: Scorecard */}
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full bg-gray-50 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Metric</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200">M&S</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Tesco</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200">Waitrose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Bag revenue disclosure</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Replacement rate disclosure</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Packaging cost savings</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Plastic units removed</td>
            <td className="py-2 px-4 border-b">✅</td>
            <td className="py-2 px-4 border-b">✅</td>
            <td className="py-2 px-4 border-b">✅</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Donation transparency</td>
            <td className="py-2 px-4 border-b">❌ (partial)</td>
            <td className="py-2 px-4 border-b">❌</td>
            <td className="py-2 px-4 border-b">❌</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mb-8">
      Conclusion: No UK retailer leads on transparency. But M&S positions itself as the most ethical — so the discrepancy is sharper.
    </p>

    {/* SECTION: Why This Matters */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Why This Matters</h2>
    <p className="mb-4">
      Retail sustainability should not be performative.
    </p>
    <p className="mb-4">
      It should:
    </p>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li>Prioritize environmental outcomes</li>
        <li>Disclose when profits are derived from “green” initiatives</li>
        <li>Ensure consumers aren’t misled at checkout</li>
    </ul>
    <p className="mb-8">
      M&S is profiting from sustainability — and that’s not inherently wrong. But the lack of transparency, selective storytelling, and continued marketing of these schemes as pure CSR is.
    </p>

    {/* SECTION: GPX Demands to M&S */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">GPX Demands to M&S</h2>
    <p className="mb-4">
      GreedPeaceX calls on Marks & Spencer to:
    </p>
    <ul className="list-disc list-inside ml-4 mb-6">
        <li><strong className="font-bold">Publish Bag-for-Life Revenue and Margin</strong><br/>Break out total revenue and net profit from all reusable bag sales, including replacement costs and retained profits.</li>
        <li><strong className="font-bold">Quantify Packaging ROI</strong><br/>Show how much money is saved (or spent) from packaging reductions — including tax avoidance, procurement, and waste costs.</li>
        <li><strong className="font-bold">Disclose Supply Chain Impact</strong><br/>Publish a full audit of high-emission product lines (especially meat and dairy), and explain how they align with M&S’s Net Zero 2040 target.</li>
    </ul>

    {/* SECTION: Final Verdict */}
    <h2 className="text-2xl font-bold mb-3 border-b pb-2">Final Verdict</h2>
    <p className="mb-4">
      M&S’s Plan A is not a greenwashing campaign — it is something more sophisticated:
    </p>
    <div className="bg-gray-100 border-l-4 border-gray-600 p-4 mb-8 italic">
      A monetized environmental strategy that boosts margins, deflects criticism, and reinforces brand trust — all while hiding the numbers that matter most.
    </div>
    <p className="mb-4">
      Transparency is not a threat. It is a requirement. Until M&S opens the books on the business of “sustainable retail,” GreedPeaceX will keep asking:
    </p>
    <div className="text-3xl font-extrabold mt-6 text-center italic">
      What’s the real cost of green?
    </div>
  </>
);

// We need to import the component from the separate file
import InvisibleHandReportContent from './InvisibleHandReport'; 

function ReportPage({ reportComponent }) {
    // Determine which content to render
    let content = null;
    let header = { title: "Report", subtitle: "Not Found", byline: "" };
    let petitionSlug = '';

    switch (reportComponent) {
        case 'mands':
            header = {
                title: "THE REAL COST OF GREEN",
                subtitle: "How M&S Monetizes Plastic While Hiding the Profits",
                byline: "By Rhea Solace GreedPeaceX Investigations Team | Published: October 2025"
            };
            petitionSlug = 'realcost';
            content = <MAndSReportContent />;
            break;
        case 'invisiblehand':
            header = {
                title: "THE INVISIBLE HAND",
                subtitle: "A Forensic Dossier on Cross-Sector Corporate Power in Food, Energy, and Housing",
                byline: "By Malik Rowan, GPX Finance & Legal Systems | Published: December 2025"
            };
            petitionSlug = 'invisiblehand';
            // Use the imported component
            content = <InvisibleHandReportContent />; 
            break;
        default:
            content = <div className="text-center text-4xl mt-12">Report Not Found</div>;
    }

    // Modal state for action buttons
    const [isPetitionModalOpen, setIsPetitionModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const openPetitionModal = (type) => {
        setIsPetitionModalOpen(true);
    };

    const closePetitionModal = () => {
        setIsPetitionModalOpen(false);
    };

    const openShareModal = () => {
        setIsShareModalOpen(true);
    };

    const closeShareModal = () => {
        setIsShareModalOpen(false);
    };

    const openGeneralSignupModal = () => {
        // NOTE: We'll keep this simple by letting the button go to the Support page.
    };


    return (
        <div className="bg-white text-black p-8 font-serif max-w-4xl mx-auto">
            {/* Article Title Header (Yellow/Red Box) - CENTRALIZED */}
            <div className={`p-6 mb-8 text-center ${reportComponent === 'mands' ? 'bg-yellow-400 text-black' : 'bg-red-600 text-white'}`}>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    {header.title}
                </h1>
                <h3 className="text-xl md:text-2xl font-bold mt-2">
                    {header.subtitle}
                </h3>
                <p className={`text-sm md:text-base mt-2 border-t ${reportComponent === 'mands' ? 'border-black' : 'border-white'} pt-2 mx-auto inline-block`}>
                    {header.byline}
                </p>
            </div>
            
            {content}

            {/* ACTION BUTTON FOOTER (Three Buttons) */}
            <div className="mt-12 pt-6 border-t border-gray-300">
                <h2 className="text-xl font-bold text-center mb-4">TAKE ACTION NOW</h2>
                <div className="flex justify-center space-x-4">
                    {/* 1. Sign Petition Button */}
                    <button
                        onClick={() => openPetitionModal(petitionSlug)}
                        className="bg-red-600 text-white py-3 px-6 font-bold text-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Sign the Petition
                    </button>

                    {/* 2. Share Button */}
                    <button
                        onClick={openShareModal}
                        className="bg-gray-800 text-white py-3 px-6 font-bold text-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                        Share the Report
                    </button>

                    {/* 3. Join the Movement (Redirect to general signup modal on Support page) */}
                    <Link
                        to="/support"
                        className="bg-green-700 text-white py-3 px-6 font-bold text-lg hover:bg-green-800 transition-colors duration-200 no-underline"
                    >
                        Join the Movement
                    </Link>
                </div>
            </div>

            {/* Modals must be rendered outside the main content flow */}
            <Modal isOpen={isPetitionModalOpen} onClose={closePetitionModal} type={petitionSlug} isPetition={true} />
            <ShareModal isOpen={isShareModalOpen} onClose={closeShareModal} />
        </div>
    );
}

export default ReportPage;
