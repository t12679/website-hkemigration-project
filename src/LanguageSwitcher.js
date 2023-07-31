import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'

function LanguageSwitcher({className, useDropdown}) {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (useDropdown) {
    return (
      <div className='dropdown-buttons' 
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
      <div className = "dropdown-arrow">
        <button className="language-button" onClick={toggleDropdown}>
          {i18n.language === 'en' ? 'English' : '中文'}     
        </button>
      </div>
        {showDropdown && (
          <div className="dropdown-language">
            <button onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
              {i18n.language === 'en' ? '中文' : 'English'}
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button className={`language-button ${className}`} onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
        {i18n.language === 'en' ? 'English' : '中文'}     
      </button>
    );
  }
}

export default LanguageSwitcher;
