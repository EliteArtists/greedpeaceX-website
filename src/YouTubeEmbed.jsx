import React from 'react';

// The YouTubeEmbed component accepts the videoId and title as props
const YouTubeEmbed = ({ videoId, title }) => {
  // Construct the secure and clean embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    // Use a container with aspect ratio styling (Tailwind aspect-video)
    // to ensure the video scales correctly (16:9 ratio)
    <div className="w-full h-full aspect-video">
      <iframe
        className="w-full h-full border-0"
        src={embedUrl}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy" // Improves initial page load performance
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
