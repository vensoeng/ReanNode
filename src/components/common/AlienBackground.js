import React from 'react';
import '../../assets/css/alien.css';
export default function AlienBackground() {
  return (
      <div className="alien-bg">

            {/* Stars */}
            <div className="stars"></div>

            {/* Planets */}
            <div className="planet planet-purple"></div>
            <div className="planet planet-green"></div>

            {/* UFO */}
            <div className="ufo">
                <div className="ufo-glass"></div>
                <div className="ufo-light"></div>
            </div>

            {/* Floating particles */}
            <span className="particle p1"></span>
            <span className="particle p2"></span>
            <span className="particle p3"></span>
            <span className="particle p4"></span>

        </div>
  );
}