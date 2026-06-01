import React, { useRef } from 'react';
import '../../assets/css/SunscreenSlider.css';
import { ArrowRight, Designtools, ArrowLeft} from 'iconsax-reactjs';
import img from '../../assets/img/test_design.jpg';

const SLIDER_DATA = [
  
  {
    id: 1,
    isMainCover: false,
    brand: "AXIS - Y",
    name: "Complete No-Stress Physical Sunscreen",
    price: "10.80$",
    type: "Physical",
    productImg: "test_design.jpg"
  },
  {
    id: 2,
    isMainCover: false,
    brand: "AXIS - Y",
    name: "Complete No-Stress Physical Sunscreen",
    price: "10.80$",
    type: "Physical",
    productImg: "test_design.jpg"
  },
  {
    id: 3,
    isMainCover: false,
    brand: "COSRX",
    name: "Ultra-light Invisible Sunscreen",
    price: "10.20$",
    type: "Chemical",
    productImg: "test_design.jpg"
  },
  {
    id: 4,
    isMainCover: false,
    brand: "ANUA",
    name: "Airy Sun Cream SPF50+",
    price: "12.50$",
    type: "Physical",
    productImg: "test_design.jpg"
  }
];

export default function Screenslider({mainTitle = null, mainDes= null, items = []}) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 340; // Adjusts card width + gap spacing
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="qnic-ad-container">
      {/* Header Profile Info */}
      <div className="qnic-ad-header">
        <div className="qnic-profile-section">
          <div className="qnic-avatar-wrapper">
            <Designtools/>
          </div>
          <div className="qnic-meta-info">
            <span className="qnic-brand-name">{mainTitle}</span>
            <span className="qnic-ad-tag">Suggestion ·</span>
          </div>
        </div>
        <div className="qnic-header-actions">
          <button className="qnic-follow-btn btn">
            មើលបន្ថែម
            <ArrowRight />
          </button>
        </div>
      </div>

      <p className="qnic-ad-caption">
        {mainDes}
      </p>

      {/* Main Slider Window */}
      <div className="qnic-slider-wrapper">

        <div className="qnic-slider-track" ref={sliderRef}>
          {SLIDER_DATA.map((item) => (
            <div key={item.id} className="qnic-slider-card">
                <div className="qnic-product-sheet">
                  <div className="qnic-image-frame">
                    <img src={img} alt={item.name} className="qnic-product-thumb" />
                  </div>
                  
                  <div className="qnic-product-details">
                    <h4 className="qnic-prod-brand">FOR FREE</h4>
                    <p className="qnic-prod-name">ចង់ឱ្យផលិតផលរបស់អ្នកលេចធ្លោ?</p>
                  </div>
                </div>
              {/* Shared CTA Interactive Action Row per Slide */}
              <div className="qnic-card-action-bar">
                <span className="qnic-cta-text">
                  ការរចនា Poster ប្រកបដោយគំនិតច្នៃប្រឌិតពីយើង នឹងជួយផ្សព្វផ្សាយម៉ាកយីហោរបស់អ្នកឱ្យកាន់តែរីកសុះសាយ
                </span>
                <button className="qnic-cta-btn">ពិនិត្យមើល</button>
              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="slide-action df-r">
        <button className="qnic-nav-btn qnic-prev btn" onClick={() => scroll('left')}><ArrowLeft/></button>
        <button className="qnic-nav-btn qnic-next btn" onClick={() => scroll('right')}><ArrowRight /></button>
      </div>
    </div>
  );
}