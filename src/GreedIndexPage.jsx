import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the public anonymous key
const supabase = createClient(
  'https://hokibuzggipohnopetld.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJipssiOiJzdXBhYmFzZSIsInJlZiI6Imhva2lidXpnZ2lwb2hub3BldGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTg2NjUsImV4cCI6MjA3MDMzNDY2NX0.Hs7XWmLMs9wYktt1UFp1DtTp-3VK_fRCni2g-3TyA9g'
);

// Tooltip Component for Table Headers
const HeaderWithTooltip = ({ title, description }) => (
  <div className="group relative flex items-center justify-center cursor-help">
    <span className="border-b border-dotted border-gray-400 hover:border-white transition-colors">{title}</span>
    {/* Info Icon */}
    <span className="ml-1 text-xs text-gray-400 opacity-70">ⓘ</span>
    
    {/* Tooltip Popup - UPDATED POSITION: Now appears BELOW the header */}
    <div className="absolute top-full mt-2 w-64 p-4 bg-white text-black text-xs font-normal rounded shadow-xl hidden group-hover:block z-50 text-left leading-relaxed border border-gray-200">
      {description}
      {/* Little arrow pointing UP (at the top of the box) */}
      <div className="absolute -top-2 left-1/2 -ml-2 border-8 border-transparent border-b-white"></div>
    </div>
  </div>
);

function GreedIndexPage() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      // Fetch the most recent score for each company
      const { data, error } = await supabase
        .from('greed_daily_scores')
        .select('*, greed_targets(name)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching scores:', error);
      } else {
        // Group scores by target_id to get only the most recent entry
        const latestScoresMap = new Map();
        if (data) {
          data.forEach(score => {
            if (!latestScoresMap.has(score.target_id)) {
              latestScoresMap.set(score.target_id, score);
            }
          });
        }
        const latestScores = Array.from(latestScoresMap.values());
        
        // Sort the latest scores by greed_score in descending order
        latestScores.sort((a, b) => b.greed_score - a.greed_score);
        
        setScores(latestScores);
      }
      setLoading(false);
    }
    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading Greed Index...
      </div>
    );
  }

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
      <div className="overflow-x-auto overflow-y-auto border border-gray-700 rounded-lg shadow-2xl" style={{ maxHeight: '600px' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-700 text-white sticky top-0 z-20 shadow-md">
              <th className="p-4 text-left font-bold border-b border-green-800">Company</th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Env. Harm (30%)" 
                  description="Measures the scale of ecological damage caused by the company’s core operations. Includes pollution, carbon emissions, habitat destruction, water contamination, and unsustainable supply chains." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Profit from Harm (25%)" 
                  description="Evaluates how much of the company’s revenue depends on harmful or exploitative activities. The more a business earns from socially or environmentally damaging practices, the higher this score." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Greenwashing (15%)" 
                  description="Assesses misleading environmental claims, deceptive marketing, or sustainability PR that hides ongoing harm. Higher scores indicate companies exaggerating or fabricating their ‘green’ credentials." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Worker Exp. (15%)" 
                  description="Scores the company’s impact on workers across the supply chain — including unsafe conditions, unfair pay, union busting, overwork, outsourcing abuse, and use of precarious labour." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Pay Gap (10%)" 
                  description="Measures inequality inside the company by comparing CEO compensation to median worker pay. Extreme pay gaps signal internal greed and systemic exploitation." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Accountability (5%)" 
                  description="Evaluates the company’s willingness to be transparent, admit wrongdoing, comply with regulations, and face consequences. Low accountability increases long-term risk and public harm." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Total Score" 
                  description="The combined weighted score of all six categories. Higher totals indicate corporations causing the greatest overall harm relative to profit, public trust, and environmental impact." 
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.length > 0 ? (
              scores.map((score, index) => (
                <tr key={score.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-150`}>
                  <td className="p-4 border-b border-gray-700 font-medium">
                    {/* Company name will be a link to the profile page */}
                    <a href={`/company/${score.greed_targets.name}`} className="text-white hover:text-green-400 hover:underline">
                      {score.greed_targets.name}
                    </a>
                  </td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.community_harm}</td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.profit_from_necessity}</td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.obscurity}</td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.exploit_ratio}</td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.pay_inequality}</td>
                  <td className="p-4 text-center border-b border-gray-700 text-gray-300">{score.responsiveness}</td>
                  <td className="p-4 text-center border-b border-gray-700 font-bold text-xl">
                    {/* Score will be a link to a detailed report */}
                    <a href={`/report/${score.id}`} className="text-yellow-400 hover:text-yellow-300 hover:underline">
                      {score.greed_score}
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-8 text-center text-gray-400">
                  {/* Updated message to be more helpful */}
                  No data available. Database may be warming up. Please refresh or run the calculation.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GreedIndexPage;
