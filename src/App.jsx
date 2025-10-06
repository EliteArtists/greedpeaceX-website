import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import GreedIndexWidget from './GreedIndexWidget';
import GreedIndexPage from './GreedIndexPage';
import ReportPage from './ReportPage';
import HTMLFlipBook from 'react-pageflip';
import SupportMissionPage from './SupportMissionPage';
import ActionCampaignsPage from './ActionCampaignsPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';

// Initialize the Supabase client with the public anonymous key
const supabase = createClient(
  'https://hokibuzggipohnopetld.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva2lidXpnZ2lwb2hub3BldGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTg2NjUsImV4cCI6MjA3MDMzNDY2NX0.Hs7XWmLMs9wYktt1UFp1DtTp-3VK_fRCni2g-3TyA9g'
);

function App() {
  const [greedScore, setGreedScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const book = useRef();

  useEffect(() => {
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

  const goToFrontPage = () => {
    setCurrentPage('home');
  };

  const goToReportPage = () => {
    setCurrentPage('report');
  };

  const goToGreedIndexPage = () => {
    setCurrentPage('greedIndex');
  };

  const goToSupportMissionPage = () => {
    setCurrentPage('supportMission');
  };
  
  const goToActionCampaignsPage = () => {
    setCurrentPage('actionCampaigns');
  };

  const goToContactPage = () => {
    setCurrentPage('contact');
  };

    const goToAboutPage = () => {
    setCurrentPage('about');
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading Greed Index...
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HTMLFlipBook
            width={1000}
            height={600}
            ref={book}
            startPage={0}
            size="fixed"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={600}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={300}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            className="demo-book"
          >
            {/* Page 1 (Homepage) */}
            <div className="page bg-black text-white p-4 h-full flex flex-col">
              <header className="flex justify-between items-center bg-green-700 text-white p-4">
                <div onClick={goToFrontPage} className="text-3xl font-bold cursor-pointer">GPX</div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    goToGreedIndexPage();
                  }}
                  className="cursor-pointer"
                >
                  <GreedIndexWidget greedScore={greedScore} />
                </div>
              </header>

              <main
                onClick={(e) => {
                  e.stopPropagation();
                  goToReportPage();
                }}
                className="cursor-pointer bg-yellow-400 text-black p-6 my-4"
              >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  TESCO CASHING IN ON PLASTIC BAG PRICE HIKE
                </h1>
                <p className="text-sm md:text-base mt-2">
                  Shareholders pocket millions as shoppers pay the price for increased bag fees
                </p>
              </main>

              <div className="grow overflow-y-auto -mr-3 pr-3">
                <section>
                  <h2 className="text-3xl font-bold text-center bg-gray-800 text-white p-4">
                    INVESTIGATIONS
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-red-600 text-white p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold">INVESTIGATIONS</h3>
                        <h4 className="text-2xl font-bold mt-2">CORPORATE GREENWASHING EXPOSED</h4>
                        <p className="text-sm mt-2">Uncovering the lies behind false eco-friendly claims</p>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold">ACTION</h3>
                        <h4 className="text-2xl font-bold mt-2">LEGAL TOOLKIT: TAKE ON GREEDY COMPANIES</h4>
                        <p className="text-sm mt-2">Empowering you to fight back against corporate abuse</p>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold">PODCAST</h3>
                        <h4 className="text-2xl font-bold mt-2">GREEN GIANTS: WHERE'S THE ACCOUNTABILITY?</h4>
                        <p className="text-sm mt-2">Holding high profit polluters' feet to the fire</p>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="bg-black text-white text-center p-4 mt-4">
                  <h2 className="text-2xl font-bold">EXPOSING GREED AND DEMANDING CHANGE</h2>
                </div>
              </div>
            </div>
            {/* Page 2 (Tesco Report Page) */}
            <div className="page bg-white text-black p-4 h-full overflow-hidden">
              <ReportPage />
            </div>
            {/* Page 3 (Greed Index Page) */}
            <div className="page bg-black text-white p-4 h-full overflow-hidden">
              <GreedIndexPage />
            </div>
          </HTMLFlipBook>
        );
      case 'report':
        return (
          <HTMLFlipBook
            width={1000}
            height={600}
            ref={book}
            startPage={0}
            size="fixed"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={600}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={300}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            className="demo-book"
          >
            <div className="page bg-white text-black p-4 h-full overflow-hidden">
              <ReportPage />
            </div>
          </HTMLFlipBook>
        );
      case 'greedIndex':
        return (
          <HTMLFlipBook
            width={1000}
            height={600}
            ref={book}
            startPage={0}
            size="fixed"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={600}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={300}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={true}
            className="demo-book"
          >
            <div className="page bg-black text-white p-4 h-full overflow-hidden">
              <GreedIndexPage />
            </div>
          </HTMLFlipBook>
        );
      case 'supportMission':
        return <SupportMissionPage />;
      case 'actionCampaigns':
        return <ActionCampaignsPage />;
      case 'contact':
        return <ContactPage />;
              case 'about':
        return (
          <AboutPage
            goToSupportMissionPage={goToSupportMissionPage}
            goToActionCampaignsPage={goToActionCampaignsPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Menu Bar */}
      <nav className="p-4 flex justify-end space-x-6 text-sm font-bold">
        <a href="#" className="hover:underline" onClick={goToFrontPage}>Home</a>
        <a href="#" className="hover:underline" onClick={goToAboutPage}>About</a>
        <a href="#" className="hover:underline" onClick={goToSupportMissionPage}>Support the Mission</a>
        <a href="#" className="hover:underline" onClick={goToActionCampaignsPage}>Action Campaigns</a>
        <a href="#" className="hover:underline" onClick={goToContactPage}>Contact</a>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;