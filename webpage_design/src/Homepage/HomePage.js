import React from 'react';
import './HomePage.css';
import ThermometersWrapper from './ThermometersWrapper';
import { useTranslation } from 'react-i18next';
import useContentful from '../useContentful';
import DotChart from './chart';
import WorldMap from './WorldMap';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import graph1 from '../images/Pension Pots.png'
import graph2 from '../images/Checking Out.png'
import diagram from '../images/Diagram.png'
import hkimmigration1 from '../images/hk immigration1.png'
import hkimmigration2 from '../images/hk immigration2.png'
import hkimmigration3 from '../images/hk immigration3.avif'


function HomePage({ setVisibleComponent, currentLanguage }) {
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
        if (year >= 2019 && year <= 2022) {
            setCurrentYear(year);
            setSelectedButton(year);
            setYear(year);
        }
        
        if (hasClicked[year]) {
          
            setAnimateCharts(false);
        } else {
            
            setAnimateCharts(true);
            setHasClicked({
              ...hasClicked,
              [year]: true,
            });
    
            setTimeout(() => {
                setAnimateCharts(false);
            }, 1000); 
        }
    };

    const { data: pageData, isLoading, error } = useContentful('homepage', currentLanguage); 
    const { data: chartData, isLoading: chartIsLoading, error: chartError } = useContentful('ChartData', currentLanguage); 
    const { data: chartData2, isLoading: chartData2IsLoading, error: chartData2Error } = useContentful('Chart2Data', currentLanguage);

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
            dotNote: item.fields.dotNote,
            source1: item.fields.source,
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
          source2:item.fields.source,
        };
        return acc;
      }, {});

  return (
    <div className ="container-fluid">
        <div className='row justify-content-center'>
            <div className='col-9'>
                <div className ='mt-4'>
                    <h1 className="">{data[currentYear].heading}</h1>    
                </div>
                <div className='mb-5'> 
                    <div className='p-4'>{data[currentYear].dotNote}</div>
                    <div className="d-flex align-items-end gap-5">
                        <div className="w-100">
                            <DotChart
                                key={`${currentYear}Chart1`}
                                people={data[currentYear].chart1} 
                                color='#61889e' 
                                animate={animateCharts}
                            />
                            <div className="text-center mt-2">{data[currentYear].chart1Title}</div>
                        </div>
                        <div className="w-100">
                            <DotChart 
                                key={`${currentYear}Chart2`}
                                people={data[currentYear].chart2} 
                                color='#e6bf01'
                                animate={animateCharts}
                            />
                            <div className="text-center mt-2">{data[currentYear].chart2Title}</div>
                        </div>
                    </div>

                    <div className='mt-4' style={{ fontSize:'10px' }}>
                        {data[currentYear].source1} <a href="https://www.cpr.cuhk.edu.hk/en/press/survey-findings-on-views-about-emigration-from-hong-kong-released-by-the-hong-kong-institute-of-asia-pacific-studies-at-cuhk-3/" 
                        target="_blank" rel="noopener noreferrer">Hong Kong Institute for Asian Pacific Studies</a>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-5 mb-2">
                        <div className="text-center fs-5" style={{ width: '70%' }}>
                            <ReactMarkdown>{data[currentYear].textAboveChart3}</ReactMarkdown>
                        </div>
                    </div>

                    {currentYear !== 2023 && ( 
                        <div className="d-flex flex-column align-items-center justify-content-center"> 
                            <div className="d-flex align-items-center justify-content-center">
                                {currentYear === 2022 && <span className="minus-sign">-</span>}
                                <DotChart
                                    key={`${currentYear}Chart3`} 
                                    people={data2[Year].chart3} 
                                    color={currentYear === 2022 ? '#808080' : '#317654'} 
                                    animate={animateCharts}/>
                            </div>
                                <div className="text-center mt-2">{data2[Year].chart3Title}({currentYear+1} - {currentYear})</div>                     
                        </div>  
                    )}

                    {currentYear !== 2023 && (
                        <div className='mt-3'style={{ fontSize:'10px' }}>
                            {data2[Year].source2} <a href = "https://www.censtatd.gov.hk/en/scode600.html" target="_blank" rel="noopener noreferrer">Census and Statistics Department of the Hong Kong</a>
                        </div>
                    )}
                </div>

                <div className="d-flex button-group">
                    <div className='d-flex align-items-center me-2'>Year</div>
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
                        className={`button ${selectedButton === 2021 ? 'selected' : ''} `}
                    >
                        2021
                    </button>
                    <button 
                        onClick={() => handleChangeYear(2022)}
                        className={`button ${selectedButton === 2022 ? 'selected' : ''} last-button`}
                    >
                        2022
                    </button>
                </div>
            </div>
        </div>

        <div className="row justify-content-center pt-4 mt-3" style={{ backgroundColor: 'rgba(49, 118, 84, 1)' }}>
            <div className = "col-9 text-center text-white fs-5">
                 <ReactMarkdown>{entry && entry.fields.GraphInfo}</ReactMarkdown>
            </div>
            <div className='d-flex justify-content-center gap-5 mt-2 mb-5 '>
                <img src={graph1} alt="hkemigration-dataplot" className="col-4 hkemigration-dataplot" />
                <img src={graph2} alt="hkemigration-dataplot" className="col-4 hkemigration-dataplot" />
            </div>
        </div>

        <div className = "row justify-content-center py-5 homepage-question">
            <div className = "col-8 text-center text-white fs-3 ">
                 <ReactMarkdown>{entry && entry.fields.Homepage1Content}</ReactMarkdown>
            </div>
        </div>  

        <div className = "row justify-content-center" style={{ backgroundColor: 'rgba(49, 118, 84, 1)' }}>
            <div className= "d-flex text-center text-white pt-3 pb-2 fs-3 " style= {{ width: '80%' }}>
                <ReactMarkdown>{entry && entry.fields.Homepage2Heading}</ReactMarkdown>
            </div>
            <div className = "flex-column text-white pb-4" style= {{ width: '70%', fontSize:'18px'}}>
                 <ReactMarkdown>{entry && entry.fields.homepage2Content}</ReactMarkdown>
                 <div style= {{fontSize:'13px'}}>
                    <ReactMarkdown>{entry && entry.fields.Homepage2Note}</ReactMarkdown>
                 </div>
                 <button className = "btn btn-light px-3 py-2 fw-bold rounded-pill text-success custom-button-width" onClick={() => setVisibleComponent('About')}>
                    {entry && entry.fields.Homepage2ContentButton}
                 </button>
            </div>
        </div>      

        <div className = "row justify-content-center">
            <div className="col-10 py-3">
                <div className="ms-5 pb-2">
                    <ReactMarkdown>{entry && entry.fields.Homepage3Content}</ReactMarkdown>
                </div>
                <div className="pb-2">
                    <WorldMap/>
                </div>
                <div className='ms-5' style={{fontSize:'12px'}}>
                    <ReactMarkdown>{entry && entry.fields.homepage3ContentSource}</ReactMarkdown> 
                </div>
            </div>     
        </div>

        <div className='row'>
            <div className= 'd-flex py-4 justify-content-around' style={{backgroundColor: 'rgba(49,118,84,1)'}}>
                <img src={hkimmigration1} alt="hkemigration-images" className="col-3 hkemigration-images" />
                <img src={hkimmigration2} alt="hkemigration-images" className="col-3 hkemigration-images" />
                <img src={hkimmigration3} alt="hkemigration-images" className="col-3 hkemigration-images" />
            </div>
        </div>

        <div className='row pt-4 pb-2 justify-content-center'>
            <div className='col-auto'>
                <ReactMarkdown>{entry && entry.fields.Methodology}</ReactMarkdown>
            </div>
        </div>
        
        <div className="d-flex flex-column align-items-center">
            <div className='col-9 text-center py-2' style={{fontSize: '17px'}}>
                <ReactMarkdown>{entry && entry.fields.DiagramText}</ReactMarkdown>
            </div>
            <div className= 'd-flex justify-content-center'>
                <img src={diagram} alt="emigration-relationship-comparison" className="col-6" />
            </div>
        </div>
    
        <div className='row text-white py-4 justify-content-center' style={{backgroundColor:'rgba(49,118,84,1)', fontSize: '18px'}}>
            <div className='col-9'>
                <ReactMarkdown>{entry && entry.fields.methodology2}</ReactMarkdown>
            </div>
        </div>

        <div className="row py-4 justify-content-center" style={{fontSize:'18px'}}>
            <div className="col-9">
                <ReactMarkdown>{entry && entry.fields.Homepage4Content}</ReactMarkdown>
            </div>
        </div>
     
        <div className='row text-white py-4 justify-content-center' style={{backgroundColor:'rgba(49,118,84,1)', fontSize: '18px'}}>
            <div className="col-9">
                <ReactMarkdown>{entry && entry.fields.Homepage5Content}</ReactMarkdown>
                <button className = "btn btn-light text-success fw-bold bolder-success px-4 py-2" onClick={() => setVisibleComponent('Project')}>
                    {entry && entry.fields.homepage5ContentButton}
                </button>
            </div>
        </div>
        
        <div className='row py-4 justify-content-center'>
            <div className='col-auto'>
                <div className='text-center fs-4 fw-bold'>
                    <ReactMarkdown>{entry && entry.fields.progressTrackerHeading}</ReactMarkdown>
                </div>
                <div className='pb-2'>
                    <ThermometersWrapper
                        surveyGoal={5000}
                        surveyCurrent={4163}
                        interviewGoal={500}
                        interviewCurrent={318}
                    />
                </div>
            </div>
        </div>
   
        <div className="row py-4 justify-content-center" style={{backgroundColor:'rgb(40,36,36)'}}>
            <div className="col-4 text-white">
                <ReactMarkdown>{ entry && entry.fields.Homepage6Content1 }</ReactMarkdown> 
            </div>
            <div className="col-4 text-white">
                <ReactMarkdown>{ entry && entry.fields.Homepage6Content2 }</ReactMarkdown>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
