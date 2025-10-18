import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="bg-black text-white p-8 font-sans min-h-screen max-w-4xl mx-auto">
      <div className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
        WE EXPOSE CORPORATE GREED. WE FIGHT FOR JUSTICE. WE DEMAND CHANGE.
      </div>
      <p className="text-lg mb-8">
        GreedPeaceX is an independent movement of investigators, campaigners,
        and everyday people standing up to corporations that put profit before
        people and the planet.
      </p>

      {/* Our Mission */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">OUR MISSION</h2>
        <p className="mb-2">
          Corporate greed is systemic. Governments and regulators often fail.
          Communities suffer while shareholders profit.
        </p>
        <p>
          That’s why GPX exists—to confront greed directly and demand accountability.
        </p>
      </div>

      {/* Our Work */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">OUR WORK</h2>
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Investigations Link (to Support page) */}
          <Link to="/support" className="cursor-pointer text-white no-underline hover:text-gray-400">
            <div>
              <h3 className="text-xl font-bold">INVESTIGATIONS</h3>
              <p className="text-gray-400">
                Uncovering lies, financial exploitation, and environmental harm.
              </p>
            </div>
          </Link>
          
          {/* Action Campaigns Link */}
          <Link to="/action" className="cursor-pointer text-white no-underline hover:text-gray-400">
            <div>
              <h3 className="text-xl font-bold">ACTION CAMPAIGNS</h3>
              <p className="text-gray-400">
                Mobilising public petitions, protests, and direct digital pressure.
              </p>
            </div>
          </Link>
          
          {/* Legal Battles (Static) */}
          <div>
            <h3 className="text-xl font-bold">LEGAL BATTLES</h3>
            <p className="text-gray-400">
              Supporting court cases, filing complaints, forcing accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div>
        <h2 className="text-3xl font-bold mb-4">OUR VALUES</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold">TRUTH</h3>
            <p className="text-gray-400">Facts before spin.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">JUSTICE</h3>
            <p className="text-gray-400">Power must serve people, not exploit them.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">COURAGE</h3>
            <p className="text-gray-400">We confront the powerful without compromise.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">SOLIDARITY</h3>
            <p className="text-gray-400">This movement belongs to everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;