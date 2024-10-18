import React from 'react';
import { ComposableMap, Geographies, Geography, Annotation, Line, Marker } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import worldMapData from '../WorldMap Data/ne_10m_admin_0_countries.json';
import './WorldMap.css';

const countryHighlight = {
  AUS: "rgba(49,118,84,1)", // green
  TWN: "rgba(49,118,84,1)", // green
  GBR: "rgba(49,118,84,1)", // green
  CAN: "rgba(49,118,84,1)", // green
  HKG: "rgba(49,118,84,1)", // green
};

const hongKongCoordinates = [114.1095, 22.3964];

const paths = [
  { coordinates: [100.7751, -33.2744], name: 'Australia (澳洲)', percentage: 6.1 }, // Australia
  { coordinates: [-106.3468, 59.1304], name: 'Canada (加拿大)', percentage: 15.0 }, // Canada
  { coordinates: [-3.4359, 45.3781], name: 'United Kingdom (英國)', percentage: 15.0 }, // UK
  { coordinates: [150.9605, 10.6978], name: 'Taiwan (台灣)', percentage: 15.0 }, // Taiwan
];

const colorScale = scaleLinear()
  .domain([0, 15]) // input percentage range
  .range(["#b3e2cd", "#1e9647"]); // colors light to dark


function WorldMap() {
  return (
    <div className='map-container'>
      <div className="tableContainer">
          <table>
              <thead>
                  <tr>
                      <th>Country
                        (國家/地區)
                      </th>
                      <th>Percentage
                        (百分比)
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {paths.map((path, i) => (
                      <tr key={i}>
                          <td>{path.name}</td>
                          <td>{`${path.percentage}%`}</td>
                      </tr>
                  ))}
                  <tr>
                      <td>Other Countries (其他國家)</td>
                      <td>20%</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div className="mapWrapper">
        <ComposableMap 
          width={350} 
          height={150}
          viewBox="0 -15 350 150" 
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 60,
          }}
          pointerEvents="none"
        >
          <Geographies geography={worldMapData}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryHighlight[geo.properties.ISO_A3] || "#EEE"} // apply color or default
                  />
                );
              })
            }
          </Geographies>

          // Canada

          <Annotation
              subject={[-100.7, 55]} // Coordinates for Canada
              dx={171} 
              dy={34} 
              connectorProps={{
                  stroke: "#000", // line color
                  strokeWidth: 2, // line thickness
              }}
          >
         </Annotation> 
         <Marker coordinates={[-106, 58]}>
            <svg width={5} height={5}>
                <polygon points="0,5 5,5 2.5,0" fill="#000" />
            </svg>
        </Marker>

        //Australia

        <Annotation
              subject={[133.7751, -25.2744]} // Coordinates for Canada
              dx={-16} 
              dy={-58} 
              connectorProps={{
                  stroke: "#000", // line color
                  strokeWidth: 0.3, // line thickness
              }}
          >
         </Annotation> 
         <Marker coordinates={[130, -22]}>
            <svg width={5} height={5}>
                <polygon points="0,5 5,5 2.5,0" fill="#000" />
            </svg>
        </Marker>

        // Taiwan

        <Annotation
              subject={[120.9605, 23.6978]} // Coordinates for Canada
              dx={-6} 
              dy={2}
              connectorProps={{
                  stroke: "#000", // line color
                  strokeWidth: 2, // line thickness
              }}
          >
         </Annotation> 
         <Marker coordinates={[124, 28]}>
            <svg width={5} height={5}>
                <polygon points="0,5 5,5 2.5,0" fill="#000" />
            </svg>
        </Marker>
        

        //UK

        <Annotation
              subject={[-3.4359, 55.3781]} // Coordinates for Canada
              dx={100} 
              dy={34} 
              connectorProps={{
                  stroke: "#000", // line color
                  strokeWidth: 2, // line thickness
              }}
          >
         </Annotation> 
         <Marker coordinates={[-15, 58]}>
            <svg width={5} height={5}>
                <polygon points="0,5 5,5 2.5,0" fill="#000" />
            </svg>
        </Marker>

        {paths.map((path, i) => (
          <Marker key={i} coordinates={path.coordinates}>
              <text y={-15} fontSize={5} textAnchor="middle">
                  {`${path.name}: ${path.percentage}%`}
              </text>
          </Marker>
        ))}

          <Marker coordinates={hongKongCoordinates}>
            <circle r={3} fill="black" /> // Adjust size and color as needed
          </Marker>
        </ComposableMap>
      </div>
    </div>
  );
}

export default WorldMap;
