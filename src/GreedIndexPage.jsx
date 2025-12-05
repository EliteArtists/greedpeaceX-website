import React, { useState } from 'react';

// --- DATA FROM AI AGENT ---
const MANUAL_SCORES = [
  {
    id: 'tesco-manual',
    greed_targets: { name: 'Tesco' },
    greed_score: 13,
    community_harm: 13,
    profit_from_necessity: 19,
    obscurity: 10,
    exploit_ratio: 10,
    pay_inequality: 8,
    responsiveness: 3,
    rationale: {
      environmental_harm: "Tesco has made notable progress on its operational footprint, reporting about a 65% reduction in emissions from its own operations since 2015 and using 100% renewable electricity across its estate. However, its overall environmental impact remains large because most emissions sit in its supply chain, and watchdogs still score it poorly on climate and agriculture while NGOs continue to raise concerns about forest-risk commodities.",
      profit_from_necessity: "Groceries are essential goods, and recent coverage highlights that Tesco has generated multi-billion-pound profits and increased market share during the cost-of-living crisis. Union leaders describe this as 'profiteering pure and simple'. Tesco has raised its profit forecast and executed sizeable share buybacks while trumpeting price cuts, indicating it can protect margins even as consumer prices remain high.",
      greenwashing: "Tesco strongly markets its sustainability strategy and net-zero plans. Yet NGOs and campaigners have accused it of greenwashing, particularly over continued sales of Brazilian meat and other forest-risk products despite deforestation pledges, with calls for the CMA to scrutinise whether its green claims mislead customers under the Green Claims Code.",
      worker_exploitation: "Tesco has faced repeated disputes over pay and conditions: distribution workers in Great Britain and staff in Ireland have rejected pay offers and mounted protests. In 2024 it also lost a significant UK legal case over attempts to 'fire and rehire' staff on lower pay, and ethical ratings flag ongoing concerns about workers' rights.",
      pay_inequality: "Tesco’s CEO Ken Murphy was paid around £9.9m in the latest reported year, more than doubling his previous package and equating to roughly 373–431 times the typical Tesco worker’s pay. These rewards coincided with strong profits and ongoing cost-cutting, leading unions to frame the pay gap as socially damaging.",
      resistance_to_accountability: "Tesco has a history of scrutiny from the Groceries Code Adjudicator and CMA. While it publishes extensive sustainability reporting, persistent NGO accusations of greenwashing around deforestation suggest it has at times been slow to fully align its public claims with its underlying sourcing practices."
    }
  },
  {
    id: 'bp-manual',
    greed_targets: { name: 'BP' },
    greed_score: 18,
    community_harm: 27,
    profit_from_necessity: 22,
    obscurity: 14,
    exploit_ratio: 11,
    pay_inequality: 8,
    responsiveness: 4,
    rationale: {
      environmental_harm: "BP remains one of the largest corporate contributors to the climate crisis. In February 2025 the company publicly shifted strategy to increase annual oil and gas spending to about $10bn while cutting more than $5bn from its low-carbon investment plans, doubling down on high-emissions hydrocarbons rather than leading a transition.",
      profit_from_necessity: "BP sells essential energy products and generated massive profits ($14bn in 2023, $8.9bn in 2024) even as households faced high fuel costs. It has maintained dividends and share buybacks while prioritizing free cash flow over low-carbon spending, framed by critics as excessive fossil-fuel profiteering from a basic necessity.",
      greenwashing: "Academic and NGO work has repeatedly concluded that big oil climate narratives amount to greenwashing. BP withdrew ads after complaints they misled the public by foregrounding small renewables activities while >96% of spend remained on oil and gas. In 2025 it abandoned its green strategy, slashing renewables spending.",
      worker_exploitation: "This month BP told 5,400 staff at its UK forecourts that it will remove paid rest breaks and most bank-holiday premiums to offset the cost of the real living wage. Unions say this wipes out the headline pay rise. Separately, executive bonuses were trimmed after contractor fatalities, indicating ongoing workplace safety issues.",
      pay_inequality: "BP’s CEO earned ~£8m in 2023 and £5.4m in 2024. Campaigners describe these packages as obscene given the cost-of-living crisis. Set against the removal of paid breaks for forecourt workers, this pattern indicates extreme internal pay disparity.",
      resistance_to_accountability: "BP faces mounting climate litigation, including a 2024 suit by the city of Chicago for deceiving the public about fossil fuel dangers. A US Senate report found big oil companies privately acknowledged efforts to downplay the climate crisis while lobbying against laws they publicly claimed to support."
    }
  }
];

// Component for Individual Score Cells with Rationale Tooltip
const ScoreWithTooltip = ({ score, rationale }) => (
  <div className="group relative flex items-center justify-center cursor-help w-full h-full">
    <span className={`font-bold ${score > 15 ? 'text-red-400' : 'text-gray-300'}`}>{score}</span>
    
    {/* Rationale Tooltip */}
    <div className="absolute top-full mt-2 w-72 p-4 bg-gray-900 text-white text-xs font-normal rounded shadow-2xl border border-gray-700 hidden group-hover:block z-50 text-left leading-relaxed">
      {rationale}
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 -ml-2 border-8 border-transparent border-b-gray-700"></div>
    </div>
  </div>
);

// Component for Table Headers (General Definitions)
const HeaderWithTooltip = ({ title, description }) => (
  <div className="group relative flex items-center justify-center cursor-help">
    <span className="border-b border-dotted border-gray-400 hover:border-white transition-colors">{title}</span>
    <span className="ml-1 text-xs text-gray-400 opacity-70">ⓘ</span>
    
    {/* Definition Tooltip */}
    <div className="absolute top-full mt-2 w-64 p-4 bg-white text-black text-xs font-normal rounded shadow-xl hidden group-hover:block z-50 text-left leading-relaxed border border-gray-200">
      {description}
      <div className="absolute -top-2 left-1/2 -ml-2 border-8 border-transparent border-b-white"></div>
    </div>
  </div>
);

function GreedIndexPage() {
  // We use the manual scores directly for now
  const scores = MANUAL_SCORES;

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8">
      {/* PAGE HEADER & DESCRIPTION */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">GREED INDEX</h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          The Greed Index is GPX’s monthly scorecard exposing how corporations generate profit at the expense of people and the planet. Using six weighted categories, we reveal who causes the most harm — and who hides it best.
        </p>
      </div>

      {/* DATA TABLE */}
      <div className="overflow-x-auto overflow-y-auto border border-gray-700 rounded-lg shadow-2xl" style={{ maxHeight: '600px', minHeight: '300px' }}>
        <table className="w-full text-left border-collapse relative">
          <thead>
            <tr className="bg-green-700 text-white sticky top-0 z-20 shadow-md">
              <th className="p-4 text-left font-bold border-b border-green-800 w-1/6">Company</th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Env. Harm (30%)" 
                  description="Measures the scale of ecological damage caused by the company’s core operations." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Profit (25%)" 
                  description="Evaluates how much of the company’s revenue depends on harmful or exploitative activities." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Greenwash (15%)" 
                  description="Assesses misleading environmental claims, deceptive marketing, or sustainability PR." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Worker Exp. (15%)" 
                  description="Scores the company’s impact on workers across the supply chain." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Pay Gap (10%)" 
                  description="Measures inequality inside the company by comparing CEO compensation to median worker pay." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Accountability (5%)" 
                  description="Evaluates the company’s willingness to be transparent and admit wrongdoing." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Total Score" 
                  description="The combined weighted score of all six categories." 
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-150`}>
                <td className="p-4 border-b border-gray-700 font-medium">
                  <a href={`/company/${score.greed_targets.name}`} className="text-white hover:text-green-400 hover:underline text-lg">
                    {score.greed_targets.name}
                  </a>
                </td>
                
                {/* Individual Score Cells with Specific Rationale Tooltips */}
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.community_harm} rationale={score.rationale.environmental_harm} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.profit_from_necessity} rationale={score.rationale.profit_from_necessity} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.obscurity} rationale={score.rationale.greenwashing} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.exploit_ratio} rationale={score.rationale.worker_exploitation} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.pay_inequality} rationale={score.rationale.pay_inequality} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.responsiveness} rationale={score.rationale.resistance_to_accountability} />
                </td>
                
                {/* Total Score */}
                <td className="p-4 text-center border-b border-gray-700 font-bold text-xl">
                  <a href={`/report/${score.id}`} className="text-yellow-400 hover:text-yellow-300 hover:underline">
                    {score.greed_score}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GreedIndexPage;
