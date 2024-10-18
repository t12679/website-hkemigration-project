import React, { useState } from 'react';
import './LanguageSwitcher.css';

function LanguageSwitcher({ className, useDropdown, currentLanguage, setCurrentLanguage }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en-US' ? 'zh-Hant-HK' : 'en-US';
    setCurrentLanguage(newLanguage); 
  };

  if (useDropdown) {
    return (
      <div
        className='dropdown-buttons'
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="dropdown-arrow">
          <button className="language-button" onClick={toggleLanguage}>
            {currentLanguage === 'en-US' ? 'English' : '中文'}
          </button>
        </div>
        {showDropdown && (
          <div className="dropdown-language">
            <button onClick={toggleLanguage}>
              {currentLanguage === 'en-US' ? '中文' : 'English'}
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button className={`language-button ${className}`} onClick={toggleLanguage}>
        {currentLanguage === 'en-US' ? 'English' : '中文'}
      </button>
    );
  }
}

export default LanguageSwitcher;
