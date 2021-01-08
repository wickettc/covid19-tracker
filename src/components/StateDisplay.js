import React from 'react';
import '../css/side-display.css';
import Chart from './Chart';

const StateDisplay = (props) => {
    const { state, cases, active, deaths, recovered, handleExit } = props;
    return (
        <div className="chart-and-display-container">
            <div className="side-display-container">
                <i
                    onClick={handleExit}
                    className="exit far fa-times-circle"
                ></i>
                <h1>Covid19 Tracker</h1>
                <h2>{state}</h2>
                <h3>Cases: {cases.toLocaleString()}</h3>
                <h3>Active Cases: {active.toLocaleString()}</h3>
                <h3>Deaths: {deaths.toLocaleString()}</h3>
                <h3>Recovered: {recovered.toLocaleString()}</h3>
            </div>
            <hr />
            <Chart state={state} />
        </div>
    );
};

export default StateDisplay;
