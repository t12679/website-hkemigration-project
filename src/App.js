import React, { useState, useEffect } from 'react';

import HomePage from './HomePage';
import About from './About';
import Project from './Project';
import Team from './Team';
import ContactUs from './ContactUs'; 
import Survey from './Survey';
import Interview from './Interview';
import Cantonese from './Cantonese';
import Mandarin from './Mandarin';
import English from './English'; 
import Data from './Data';
import './App.css';
import './i18n';
import LanguageSwitcher from './LanguageSwitcher';





function App() {
  const [visibleComponent, setVisibleComponent] = useState('');
  const [showDropdownAbout, setShowDropdownAbout] = useState(false);
  const [showDropdownInterview, setShowDropdownInterview] = useState(false);

  const renderComponent = () => {
    switch(visibleComponent) {
      case 'HomePage':
        return <HomePage setVisibleComponent={setVisibleComponent} />
      case 'About':
        return <About setVisibleComponent={setVisibleComponent} />
      case 'Project':
        return <Project setVisibleComponent={setVisibleComponent} />
      case 'Team':
        return <Team setVisibleComponent={setVisibleComponent} />
      case 'Contact Us':
        return <ContactUs setVisibleComponent={setVisibleComponent} />
      case 'Survey':
        return <Survey setVisibleComponent={setVisibleComponent} />
      case 'Interview':
        return <Interview setVisibleComponent={setVisibleComponent} />
      case 'Cantonese':
        return <Cantonese setVisibleComponent={setVisibleComponent} />
      case 'Mandarin':
        return <Mandarin setVisibleComponent={setVisibleComponent} />
      case 'English':
        return <English setVisibleComponent={setVisibleComponent} />
      case 'Data':
        return <Data setVisibleComponent={setVisibleComponent} />
      default:
        return <HomePage setVisibleComponent={setVisibleComponent} />
    }
  }
  

  const renderNavigation = () => (
    <nav>
      <div 
        onMouseEnter={() => setShowDropdownAbout(true)}
        onMouseLeave={() => setShowDropdownAbout(false)}
      >
        <button className="about-button" onClick={() => setVisibleComponent('About')}>About</button>
        {showDropdownAbout && (
          <div className="dropdown-about">
            <button onClick={() => setVisibleComponent('Project')}>Project</button>
            <button onClick={() => setVisibleComponent('Team')}>Team</button>
            <button onClick={() => setVisibleComponent('Contact Us')}>Contact Us</button>
          </div>
        )}
      </div>
      <button onClick={() => setVisibleComponent('Survey')}>Take the survey</button>
        <div 
          onMouseEnter={() => setShowDropdownInterview(true)}
          onMouseLeave={() => setShowDropdownInterview(false)}
        >
      <button className="interview-button" onClick={() => setVisibleComponent('Interview')}>Take the interview</button>
      {showDropdownInterview && (
          <div className="dropdown-interview">
            <button onClick={() => setVisibleComponent('Cantonese')}>Cantonese</button>
            <button onClick={() => setVisibleComponent('Mandarin')}>Mandarin</button>
            <button onClick={() => setVisibleComponent('English')}>English</button>
          </div>
        )}
      </div>
      
      <button onClick={() => setVisibleComponent('Data')}>Data</button>

      <LanguageSwitcher className="LanguageSwitcher" useDropdown={true} />
    </nav>
  )


  const renderFooterButtons = () => (
    <nav className='nav-footer'>
      <button className="about-button" onClick={() => setVisibleComponent('About')}>About</button>
      <button onClick={() => setVisibleComponent('Survey')}>Take the survey</button>
      <button className="interview-button" onClick={() => setVisibleComponent('Interview')}>Take the interview</button>
      <button onClick={() => setVisibleComponent('Data')}>Data</button>
      <LanguageSwitcher className="LanguageSwitcher" useDropdown={false} />
    </nav>
  )
  





  return (
    <div className="app">
      <header>
        
        <h1 className="title" onClick={() => setVisibleComponent('HomePage')}>
          Emigration and Thoughts of Emigration From Hong Kong
        </h1>
        {renderNavigation()}
      </header>
      <main>
        {renderComponent()}
      </main>
      <footer>
        <div className="title-footer" onClick={() => setVisibleComponent('HomePage')}>
          Emigration and Thoughts of Emigration From Hong Kong
        </div>
        {renderFooterButtons()}
      </footer>
    </div>
  );
}

export default App;