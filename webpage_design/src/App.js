import React, { useState } from 'react';
import HomePage from './Homepage/HomePage';
import About from './About/About';
import Project from './About/Project';
import Team from './About/Team';
import ContactUs from './About/ContactUs'; 
import Survey from './Survey';
import Interview from './Interview/Interview';
import Cantonese from './Interview/Cantonese';
import Mandarin from './Interview/Mandarin';
import English from './Interview/English'; 
import Data from './Data/Data';
import DataProtection from './DataProtection/DataProtection';
import './App.css';
import './i18n';
import ReactMarkdown from 'react-markdown';
import LanguageSwitcher from './LanguageSwitcher';
import useContentful from './useContentful';



function App() {
  const [visibleComponent, setVisibleComponent] = useState('HomePage');
  const [currentLanguage, setCurrentLanguage] = useState('en-US');
  const [showDropdownAbout, setShowDropdownAbout] = useState(false);
  const [showDropdownInterview, setShowDropdownInterview] = useState(false);
  const { data: Pagedata, isLoading, error } = useContentful('app', currentLanguage);
  const entry = Pagedata ? Pagedata[0] : null;
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const renderComponent = () => {
    switch(visibleComponent) {
      case 'HomePage':
        return <HomePage setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'About':
        return <About setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Project':
        return <Project setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Team':
        return <Team setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Contact Us':
        return <ContactUs setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Survey':
        return <Survey setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Interview':
        return <Interview setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Cantonese':
        return <Cantonese setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Mandarin':
        return <Mandarin setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'English':
        return <English setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      case 'Data':
        return <Data setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
        case 'DataProtection':
        return <DataProtection setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
      default:
        return <HomePage setVisibleComponent={setVisibleComponent} currentLanguage={currentLanguage}/>
    }
  }

  

  const renderNavigation = () => (
    <nav>
      <div className='dropdown-buttons' 
        onMouseEnter={() => setShowDropdownAbout(true)}
        onMouseLeave={() => setShowDropdownAbout(false)}
      >
        <button className="about-button" onClick={() => setVisibleComponent('About')}>{entry && entry.fields.navAbout}</button>
        {showDropdownAbout && (
          <div className={currentLanguage === 'en-US' ? 'dropdown-about' : 'dropdown-aboutCN'}>
            <button onClick={() => setVisibleComponent('Project')}>{entry && entry.fields.navProject}</button>
            <button onClick={() => setVisibleComponent('Team')}>{entry && entry.fields.navTeam}</button>
            <button onClick={() => setVisibleComponent('Contact Us')}>{entry && entry.fields.navContact}</button>
          </div>
        )}
      </div>
      
        <div className='dropdown-buttons' 
          onMouseEnter={() => setShowDropdownInterview(true)}
          onMouseLeave={() => setShowDropdownInterview(false)}
        >
      <button className="interview-button" onClick={() => setVisibleComponent('Interview')}>{entry && entry.fields.takeInterview}</button>
      {showDropdownInterview && (
          <div className={currentLanguage === 'en-US' ? 'dropdown-interview' : 'dropdown-interviewCN'}>
            <button onClick={() => setVisibleComponent('Cantonese')}>{entry && entry.fields.cantonese}</button>
            <button onClick={() => setVisibleComponent('Mandarin')}>{entry && entry.fields.mandarin}</button>
            <button onClick={() => setVisibleComponent('English')}>{entry && entry.fields.english}</button>
          </div>
        )}
      </div>
      
      <button onClick={() => setVisibleComponent('Data')}>{entry && entry.fields.dataAndPreliminaryResults}</button>


      <button onClick={() => setVisibleComponent('DataProtection')}>{entry && entry.fields.dataAnonymityProtection}</button>
      
      <div className='dropdown-buttons'>
        <LanguageSwitcher 
          className="LanguageSwitcher" 
          useDropdown={true} 
          currentLanguage={currentLanguage} 
          setCurrentLanguage={setCurrentLanguage} 
        />
      </div>
    </nav>
  )


  const renderFooterButtons = () => (
    <nav className='nav-footer'>
      <button className="about-button" onClick={() => setVisibleComponent('About')}>{entry && entry.fields.navAbout}</button>
      <button className="interview-button" onClick={() => setVisibleComponent('Interview')}>{entry && entry.fields.takeInterview}</button>
      <button onClick={() => setVisibleComponent('Data')}>{entry && entry.fields.dataAndPreliminaryResults}</button>
      <button onClick={() => setVisibleComponent('DataProtection')}>{entry && entry.fields.dataAnonymityProtection}</button>
      <LanguageSwitcher 
          className="LanguageSwitcher" 
          currentLanguage={currentLanguage} 
          setCurrentLanguage={setCurrentLanguage} 
        />
    </nav>
  )
  

  return (
   
      <div className="app">
        <header>
          <div className="title" onClick={() => setVisibleComponent('HomePage')}>
          <ReactMarkdown>{entry && entry.fields.websiteTitle}</ReactMarkdown>
          </div>
          {renderNavigation()}
        </header>
        <main>
          {renderComponent()}
        </main>
        <footer>
          <div className="title-footer" onClick={() => setVisibleComponent('HomePage')}>
          {entry && entry.fields.websiteName}
          </div>
          {renderFooterButtons()}
        </footer>
      </div>
   
  );
}

export default App;