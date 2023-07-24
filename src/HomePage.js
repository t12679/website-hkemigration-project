import React from 'react';
import './HomePage.css';
import { useTranslation } from 'react-i18next';
import useContentful from './useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import DotChart from './chart';
import WorldMap from './WorldMap';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import graph1 from './images/Pension Pots.png'
import graph2 from './images/Checking Out.png'
import diagram from './images/Diagram.png'
import hkimmigration1 from './images/hk immigration1.png'
import hkimmigration2 from './images/hk immigration2.png'
import hkimmigration3 from './images/hk immigration3.avif'





function HomePage({ setVisibleComponent }) {
    const { t } = useTranslation();
    const [currentYear, setCurrentYear] = useState(2019);
    const [Year, setYear] = useState(2019);
    const [selectedButton, setSelectedButton] = useState(2019);
    const [animateCharts, setAnimateCharts] = useState(true);
    const [hasClicked, setHasClicked] = useState({2019: false, 2020: false, 2021: false, 2022: false});


    useEffect(() => {
        setAnimateCharts(true);
        const timeoutId = setTimeout(() => setAnimateCharts(false), 1000);
        return () => clearTimeout(timeoutId);
      }, [currentYear]);
      
      const handleChangeYear = (year) => {
        if (year >= 2019 && year <= 2021) {
            setCurrentYear(year);
            setSelectedButton(year);
            setYear(year);
        }
        
        if (hasClicked[year]) {
            // If the button for this year has already been clicked, we keep animations off
            setAnimateCharts(false);
        } else {
            // If this is the first time the button for this year is clicked, we turn on animations
            setAnimateCharts(true);
            setHasClicked({
              ...hasClicked,
              [year]: true,
            });
    
            // Turn off animations after a delay
            setTimeout(() => {
                setAnimateCharts(false);
            }, 1000); // delay in milliseconds, adjust to suit your needs
        }
    };
    
    
    

    const { data: pageData, isLoading, error } = useContentful('homepage'); // replace '1ZpdUq7RMN3A45lmjWV3aT' with your content type id
    const { data: chartData, isLoading: chartIsLoading, error: chartError } = useContentful('ChartData'); 
    const { data: chartData2, isLoading: chartData2IsLoading, error: chartData2Error } = useContentful('Chart2Data');

    if (isLoading || chartIsLoading || chartData2IsLoading) {
        return <div></div>;
    }

    if (error || chartError || chartData2IsLoading) {
        return <div>Error: {error?.message || chartError?.message}</div>;
    }
    
    const entry = pageData ? pageData[0] : null;


    const data = chartData.reduce((acc, item) => {
        acc[item.fields.YearData] = {
            chartDescription: item.fields.ChartDescription,
            heading:item.fields.Heading,
            chart1: item.fields.Chart1Data,
            chart2: item.fields.Chart2Data,
            chart1Title: item.fields.Chart1Title,
            chart2Title: item.fields.Chart2Title,
            chart1LegendLabel: item.fields.Chart1LegendLabel,
            chart2LegendLabel: item.fields.Chart2LegendLabel,
            textAboveChart3: item.fields.textAboveChart3,
        };
        return acc;
    }, {});


    const data2 = chartData2.reduce((acc, item) => {
        const year = item.fields.Year;
        acc[year] = {
          charName: item.fields.Chart3Name,
          chart3: item.fields.Chart3Data,
          chart3LegendLabel: item.fields.Chart3LegendLabel,
          chart3Title: item.fields.Chart3Title,
        };
        return acc;
      }, {});

    


  return (
    <div>
       


        <div className = "Homepage1">
            <h1 className= "Homepage1-heading">{data[currentYear].heading}</h1>
            
        </div>
       

        <div className='Chart-section'>
            
            <div className="Charts-container">
              
                {/*<div className="chart-legend">
                <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#61889e' }}></div>
                        <div className="legend-label">{data[currentYear].chart1LegendLabel}</div>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#e6bf01' }}></div>
                        <div className="legend-label">{data[currentYear].chart2LegendLabel}</div>
                    </div>
                </div>*/}
                <div className="First-Chart-container">
                    <div className="chart-wrapper">
                        <DotChart
                         key={`${currentYear}Chart1`}
                         people={data[currentYear].chart1} 
                         color='#61889e' 
                         animate={animateCharts}/>
                        <div className="chart-title">{data[currentYear].chart1Title}</div>
                    </div>
                    <div className="chart-wrapper">
                        <DotChart 
                        key={`${currentYear}Chart2`}
                        people={data[currentYear].chart2} 
                        color='#e6bf01'
                        animate={animateCharts}/>
                        <div className="chart-title">{data[currentYear].chart2Title}</div>
                    </div>

                </div>
                <div className='ChartSource1'>
                    Source: <a href="https://www.cpr.cuhk.edu.hk/en/press/survey-findings-on-views-about-emigration-from-hong-kong-released-by-the-hong-kong-institute-of-asia-pacific-studies-at-cuhk-3/" 
                    target="_blank" rel="noopener noreferrer">CUHK Communications and Public Relations Office</a>
                </div>
            </div>


            <div className='TextAboveChart3'><ReactMarkdown>{data[currentYear].textAboveChart3}</ReactMarkdown></div>


            {currentYear !== 2022 && (
            <div className="Second-chart-container">
                <div className="Second-chart-container1"> 
                        <DotChart
                        key={`${currentYear}Chart3`} 
                        people={data2[Year].chart3} 
                        color='#317654' 
                        animate={animateCharts}/>      
                        <div className="chart-title">{data2[Year].chart3Title}({currentYear+1} - {currentYear})</div>                     
                </div> 
                
            </div>
            )}
            <div className='ChartSource2'>
                Source: <a href = "https://www.censtatd.gov.hk/en/scode600.html" target="_blank" rel="noopener noreferrer">Census and Statistics Department of the Hong Kong</a>
            </div>
        </div>

        <div className="button-group">
            <div className='Year'>Year</div>
            <button 
                onClick={() => handleChangeYear(2019)}
                className={`button ${selectedButton === 2019 ? 'selected' : ''} first-button`}
            >
                2019
            </button>
            <button 
                onClick={() => handleChangeYear(2020)}
                className={`button ${selectedButton === 2020 ? 'selected' : ''} `}
            >
                2020
            </button>
            <button 
                onClick={() => handleChangeYear(2021)}
                className={`button ${selectedButton === 2021 ? 'selected' : ''} last-button`}
            >
                2021
            </button>
           {/* <button 
                onClick={() => handleChangeYear(2022)}
                className={`button ${selectedButton === 2022 ? 'selected' : ''} last-button`}
            >
                2022
            </button>*/}
        </div>

        
        <div className="Graph-Diagram-Container">
            <div className='GraphContainer'>
                <img src={graph1} alt="graph1" className="graph" />
                <img src={graph2} alt="graph2" className="graph" />
            </div>
        </div>

        <div className = "Homepage1-1">
            <div className = "Homepage1-content">
                 <ReactMarkdown>{entry && entry.fields.Homepage1Content}</ReactMarkdown>
            </div>
        </div>
        

        <div className = "Homepage2">
            <div className = "Homepage2-content">
                 <ReactMarkdown>{entry && entry.fields.homepage2Content}</ReactMarkdown>
                 <button className = "Story-button" onClick={() => setVisibleComponent('About')}>Read our full story</button>
            </div>
        </div>

        

        <div className = "Homepage3">
            <div className="Homepage3-content">
                <div className="Homepage3-heading">
                    <ReactMarkdown>{entry && entry.fields.Homepage3Content}</ReactMarkdown>
                </div>
                
                <div className="Map">
                    <WorldMap/>
                </div>
                <div className='MapSource'>
                        Source:----
                    </div>
            </div>     
        </div>
    
    
        <div className="image-gallery">
            <img src={hkimmigration1} alt="hkimmigration" className="hkimmigration" />
            <img src={hkimmigration2} alt="hkimmigration" className="hkimmigration" />
            <img src={hkimmigration3} alt="hkimmigration" className="hkimmigration" />
        </div>


        <div className="DiagramContainer">
            <img src={diagram} alt="diagram" className="diagram" />
        </div>
    

        

        <div className = "Homepage4">
            <div className="Homepage4-content">
                <div className="Homepage4-content-p">
                    <ReactMarkdown>{entry && entry.fields.Homepage4Content}</ReactMarkdown>
                    
                </div>
            </div>
        </div>



        <div className = "Homepage5">
            <div className="Homepage5-content">
                <div className="Homepage5-content-p">
                    <ReactMarkdown>{entry && entry.fields.Homepage5Content}</ReactMarkdown>
                    
                </div>
                <button className = "Learn-more-button" onClick={() => setVisibleComponent('Project')}>Learn More</button>
            </div>
        </div>

    
        <div className="Homepage-conclusion">
            <div className="conclusion-content">
                <div className="Homepage-heading4">
                    <ReactMarkdown>{ entry && entry.fields.Homepage6Content1 }</ReactMarkdown> 
                </div>
                <div className="Homepage-heading4">
                    <ReactMarkdown>{ entry && entry.fields.Homepage6Content2 }</ReactMarkdown>
                </div>
            </div>
        </div>


    </div>
  );
}

export default HomePage;
