import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the public anonymous key
const supabase = createClient(
  'https://hokibuzggipohnopetld.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva2lidXpnZ2lwb2hub3BldGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTg2NjUsImV4cCI6MjA3MDMzNDY2NX0.Hs7XWmLMs9wYktt1UFp1DtTp-3VK_fRCni2g-3TyA9g'
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
        data.forEach(score => {
          if (!latestScoresMap.has(score.target_id)) {
            latestScoresMap.set(score.target_id, score);
          }
        });
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
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-5xl font-bold text-center mb-8">GREED INDEX</h1>
      <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '450px' }}>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-700 text-white sticky top-0 z-10">
              <th className="p-4">Company</th>
              <th className="p-4">Env. Harm (30%)</th>
              <th className="p-4">Profit from Harm (25%)</th>
              <th className="p-4">Greenwashing (15%)</th>
              <th className="p-4">Worker Exploitation (15%)</th>
              <th className="p-4">CEO vs Worker Pay (10%)</th>
              <th className="p-4">Accountability (5%)</th>
              <th className="p-4">Total Greed Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600`}>
                <td className="p-4">
                  {/* Company name will be a link to the profile page */}
                  <a href={`/company/${score.greed_targets.name}`} className="text-blue-400 hover:underline">
                    {score.greed_targets.name}
                  </a>
                </td>
                <td className="p-4 text-center">{score.community_harm}</td>
                <td className="p-4 text-center">{score.profit_from_necessity}</td>
                <td className="p-4 text-center">{score.obscurity}</td>
                <td className="p-4 text-center">{score.exploit_ratio}</td>
                <td className="p-4 text-center">{score.pay_inequality}</td>
                <td className="p-4 text-center">{score.responsiveness}</td>
                <td className="p-4 text-center font-bold text-lg">
                  {/* Score will be a link to a detailed report */}
                  <a href={`/report/${score.id}`} className="text-yellow-400 hover:underline">
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