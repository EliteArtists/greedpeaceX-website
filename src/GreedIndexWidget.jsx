import React from 'react';

function GreedIndexWidget({ greedScore }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm">GREED INDEX</div>
      <div className="text-sm">Weekly 57</div>
      <div className="w-24 h-12 bg-black flex items-center justify-center text-white text-lg font-bold">
        {greedScore !== null ? greedScore : '---'}
      </div>
    </div>
  );
}

export default GreedIndexWidget;