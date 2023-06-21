import React from 'react';
import './HomePage.css';
import { useTranslation } from 'react-i18next';
import useContentful from './useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import DotChart from './chart';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';






function HomePage({ setVisibleComponent }) {
    const { t } = useTranslation();
    const [currentYear, setCurrentYear] = useState(2020);
    const [selectedButton, setSelectedButton] = useState(2020);

    const handleChangeYear = (year) => {
        setCurrentYear(year);
        setSelectedButton(year);
      };

    const { data: pageData, isLoading, error } = useContentful('homepage'); // replace '1ZpdUq7RMN3A45lmjWV3aT' with your content type id
    const { data: chartData, isLoading: chartIsLoading, error: chartError } = useContentful('ChartData'); 


    if (isLoading || chartIsLoading) {
        return <div>Loading...</div>;
    }

    if (error || chartError) {
        return <div>Error: {error?.message || chartError?.message}</div>;
    }
    
    const entry = pageData ? pageData[0] : null;


    const data = chartData.reduce((acc, item) => {
        acc[item.fields.YearData] = {
            chart1: item.fields.Chart1Data,
            chart2: item.fields.Chart2Data,
            chart1Title: item.fields.Chart1Title,
            chart2Title: item.fields.Chart2Title,
            chart1LegendLabel: item.fields.Chart1LegendLabel,
            chart2LegendLabel: item.fields.Chart2LegendLabel,
        };
        return acc;
    }, {});

    


  return (
    <div>
        <h2>{t('welcome')}</h2>


        <div className = "Homepage1">
            <h1 className= "Homepage1-heading">{entry && entry.fields.homepage1Heading}</h1>
            <p className='Homepage1-content'>{entry && entry.fields.Homepage1Content}</p>
        </div>
       

        <div className='Chart-section'>
            <div className="Charts-container">
                <div className="chart-legend">
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#61889e' }}></div>
                        <div className="legend-label">{data[currentYear].chart1LegendLabel}</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#e6bf01' }}></div>
                        <div className="legend-label">{data[currentYear].chart2LegendLabel}</div>
                    </div>
                </div>
                <div className="Chart-container">
                    <div className="chart-wrapper">
                        <DotChart people={data[currentYear].chart1} color='#61889e'/>
                        <div className="chart-title">{data[currentYear].chart1Title}</div>
                    </div>
                    <div className="chart-wrapper">
                        <DotChart people={data[currentYear].chart2} color='#e6bf01'/>
                        <div className="chart-title">{data[currentYear].chart2Title}</div>
                    </div>
                </div>
                
            </div>
        </div>

        <div className="button-group">
            <div className='Year'>Year</div>
            <button 
                onClick={() => handleChangeYear(2020)}
                className={`button ${selectedButton === 2020 ? 'selected' : ''} first-button`}
            >
                2020
            </button>
            <button 
                onClick={() => handleChangeYear(2021)}
                className={`button ${selectedButton === 2021 ? 'selected' : ''}`}
            >
                2021
            </button>
            <button 
                onClick={() => handleChangeYear(2022)}
                className={`button ${selectedButton === 2022 ? 'selected' : ''} last-button`}
            >
                2022
            </button>
            <div className='ChartSource'>
                    Source: Census and Statistics Department of the Hong Kong
            </div>
    
        </div>


        <div className = "Homepage2">
            <div className = "Homepage2-content">
                 <ReactMarkdown>{entry && entry.fields.homepage2Content}</ReactMarkdown>
            </div>
        </div>

 

        <div className = "Homepage3">
            <div className="Homepage3-content">
                <div className="Homepage3-content-p">
                    <ReactMarkdown>{entry && entry.fields.Homepage3Content}</ReactMarkdown>
                </div>
                <button className = "Learn-more-button" onClick={() => setVisibleComponent('Project')}>Learn More</button>
            </div>
        </div>
    
        <div className="Homepage-conclusion">
            <div className="conclusion-content">
                <div className="Homepage-heading4">
                    <ReactMarkdown>{ entry && entry.fields.Homepage4Content }</ReactMarkdown> 
                </div>
                <div className="Homepage-heading4">
                    <ReactMarkdown>{ entry && entry.fields.Homepage5Content }</ReactMarkdown>
                </div>
            </div>
        </div>


    </div>
  );
}

export default HomePage;
