import React from 'react';
import '../css/side-display.css';

const USADisplay = (props) => {
    const { cases, active, deaths, recovered } = props;
    return (
        <div className="side-display-container">
            <h1>Covid19 Tracker</h1>
            <h2>USA</h2>
            <h3>Cases: {cases.toLocaleString()}</h3>
            <h3>Active Cases: {active.toLocaleString()}</h3>
            <h3>Deaths: {deaths.toLocaleString()}</h3>
            <h3>Recovered: {recovered.toLocaleString()}</h3>
        </div>
    );
};

export default USADisplay;
