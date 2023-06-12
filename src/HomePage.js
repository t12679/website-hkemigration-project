import React from 'react';
import './HomePage.css';
import { useTranslation } from 'react-i18next';

function HomePage({ setVisibleComponent }) {
    const { t } = useTranslation();

  return (
    <div>
        <h2>{t('welcome')}</h2>
        <div className = "Homepage1">
            <h1 className= "Homepage1-heading">In 2020, CUHK HKIAPS reported that X% of people thought about memigrating from Hong Kong and Y% were making plans to emigrate from Hong Kong</h1>
        </div>


        <div className = "Homepage2">
            <h2 className = "Homepage2-content">
                <p>In 2022, the population of Hong Kong decreased by 2.something %. Although this is the largest population drop on record, it is only a minority of those who who say they have thought of emigrating and who have been making plans.</p>
                <p>In contrast to most research that has mainly examined how those who emigrate are different from those that do not in terms of their characteristics, the Hong Kong Emigration Project will examine how those who emigrate are different from those who have a propensity to emigrate but have not yet done so in terms of their characteristics, general motives for emigrating and what recent events have most motivated them to emigrate.</p>
            </h2>
        </div>


        <div className = "Homepage3">
            <div className="Homepage3-content">
                <h2 className="Homepage3-content-heading">About the project</h2>
                <p className="Homepage3-content-p">This project is a 2-year project at the Department of Sociology in the CUHK to evaluate to better understand what is driving emigration from Hong Kong and also what ties Hong Kong residents to Hong Kong society.  We aim to generate policy-oriented analysis that can help to the management of emigration flows and the impact that they have had on different social and economic sectors of Hong Kong society. </p>
                <button className = "Learn-more-button" onClick={() => setVisibleComponent('Project')}>Learn More</button>
            </div>
        </div>
        
        <div className="Homepage-conclusion">
            <div className="conclusion-content">
                <div className="Homepage-heading4">
                <h2> Research findings</h2>
                    <p>The project began in July 2022 and will run through July 2024. Research findings and summaries 
                    will be updated on this site as the project progresses.</p>
                </div>
                <div className="Homepage-heading4">
                <h2>Resources</h2>
                    <p>For individuals who wish to contribute their insights about the determinants and impacts of emigration 
                    from Hong Kong on various sectors of the economy and society, please feel free to reach out to us. </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
