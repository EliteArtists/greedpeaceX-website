import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, Navigate } from 'react-router-dom'; // <-- IMPORTS ADDED
import { createClient } from '@supabase/supabase-js';
import GreedIndexWidget from './GreedIndexWidget';
import GreedIndexPage from './GreedIndexPage';
import ReportPage from './ReportPage';
import SupportMissionPage from './SupportMissionPage';
import ActionCampaignsPage from './ActionCampaignsPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

// Initialize the Supabase client with the public anonymous key
const supabase = createClient(
  'https://hokibuzggipohnopetld.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJipssiOiJzdXBhYmFzZSIsInJlZiI6Imhva2lidXpnZ2lwb2hub3BldGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTg2NjUsImV4cCI6MjA3MDMzNDY2NX0.Hs7XWmLMs9wYktt1UFp1DtTp-3VK_fRCni2g-3TyA9g'
);

// Define a reusable Layout component to hold the menu and footer
const Layout = ({ greedScore, children }) => (
  <div className="bg-black text-white min-h-screen font-sans">
    {/* Menu Bar - Now uses Link component for navigation */}
    <nav className="p-4 flex justify-end space-x-6 text-sm font-bold">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/about" className="hover:underline">About</Link>
      <Link to="/support" className="hover:underline">Support the Mission</Link>
      <Link to="/action" className="hover:underline">Action Campaigns</Link>
      <Link to="/contact" className="hover:underline">Contact</Link>
    </nav>
    
    {/* Page Content */}
    {children}
    
    {/* Footer */}
    <div className="bg-black text-white text-center p-4 mt-4 shrink-0">
      <h2 className="text-2xl font-bold">EXPOSING GREED AND DEMANDING CHANGE</h2>
    </div>
  </div>
);

// Define the HomePage component structure directly within App
const HomePage = ({ greedScore }) => (
  <div className="max-w-5xl mx-auto">
    <div className="bg-black text-white p-4 flex flex-col">
      <header className="flex justify-between items-center bg-green-700 text-white p-4">
        {/* GPX Logo now links to Home route */}
        <Link to="/" className="text-3xl font-bold cursor-pointer">GPX</Link>
        {/* Greed Index Widget now links to Greed Index route */}
        <Link to="/index" className="cursor-pointer">
          <GreedIndexWidget greedScore={greedScore} />
        </Link>
      </header>
      <main
        // This main area now links to a dynamic Report route
        className="cursor-pointer bg-yellow-400 text-black p-6 my-4"
      >
        {/* We use a hardcoded link here for the featured report */}
        <Link to="/report/real-cost-of-green" className="text-black no-underline">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-center">
            THE REAL COST OF GREEN
          </h1>
          <p className="text-sm md:text-base mt-2 text-center">
            How Marks & Spencer Monetizes Plastic While Hiding the Profits
          </p>
        </Link>
      </main>
      <section>
        <h2 className="text-3xl font-bold text-center bg-gray-800 text-white p-4">
          INVESTIGATIONS
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {/* Action Blocks - Link to corresponding pages */}
          <div className="bg-red-600 text-white p-4 flex flex-col justify-between text-center">
            <Link to="/report/invisible-hand" className="text-white no-underline">
              <div>
                <h3 className="text-xl font-bold">UPCOMING</h3>
                <h4 className="text-2xl font-bold mt-2">THE INVISIBLE HAND</h4>
                <p className="text-sm mt-2">The seven companies controlling your food, energy & rent</p>
              </div>
            </Link>
          </div>
          <div className="bg-yellow-400 text-black p-4 flex flex-col justify-between text-center">
            <Link to="/action" className="text-black no-underline">
              <div>
                <h3 className="text-xl font-bold">ACTION</h3>
                <h4 className="text-2xl font-bold mt-2">LEGAL TOOLKIT: TAKE ON GREEDY COMPANIES</h4>
                <p className="text-sm mt-2">Empowering you to fight back against corporate abuse</p>
              </div>
            </Link>
          </div>
          <div className="bg-blue-600 text-white p-4 flex flex-col justify-between text-center">
            <Link to="/podcast" className="text-white no-underline">
              <div>
                <h3 className="text-xl font-bold">PODCAST</h3>
                <h4 className="text-2xl font-bold mt-2">GREEN GIANTS: WHERE'S THE ACCOUNTABILITY?</h4>
                <p className="text-sm mt-2">Holding high profit polluters' feet to the fire</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  </div>
);


function App() {
  const [greedScore, setGreedScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: Removed currentPage state and related functions
    async function fetchAverageGreedScore() {
      const { data, error } = await supabase
        .from('greed_daily_scores')
        .select('greed_score, target_id')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching average greed score:', error);
      } else {
        const latestScoresMap = new Map();
        data.forEach(score => {
          if (!latestScoresMap.has(score.target_id)) {
            latestScoresMap.set(score.target_id, score.greed_score);
          }
        });
        const latestScores = Array.from(latestScoresMap.values());
        const totalScore = latestScores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / latestScores.length;
        setGreedScore(Math.round(averageScore));
      }
      setLoading(false);
    }
    fetchAverageGreedScore();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading Greed Index...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout greedScore={greedScore}><HomePage greedScore={greedScore} /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/support" element={<Layout><SupportMissionPage /></Layout>} />
        <Route path="/action" element={<Layout><ActionCampaignsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/index" element={<Layout><GreedIndexPage /></Layout>} />
        
        {/* Dynamic Report Route - All reports will use this structure */}
        <Route path="/report/:slug" element={<Layout><ReportPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
