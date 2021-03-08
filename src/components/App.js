import React, { useEffect, useState } from 'react';
import USAMap from 'react-usa-map';
import StateDisplay from './StateDisplay';
import USADisplay from './USADisplay';
import stateLabelValues from '../data/stateLabelValues';
import '../css/app.css';
import axios from 'axios';

function App() {
    const [stateData, setStateData] = useState([]);
    const [USAData, setUSAData] = useState({});
    const [displayData, setDisplayData] = useState({});
    const [showState, setShowState] = useState(false);
    const [loading, setLoading] = useState(true);

    const mapHandler = (event) => {
        const stateName = stateLabelValues.filter((val) => {
            return val.value === event.target.dataset.name ? val.label : '';
        });
        const toBeDisplayed = stateData.filter((data) => {
            return data.state === stateName[0].label ? data : '';
        });
        if (toBeDisplayed[0] === 'undefined') {
            setDisplayData('District Of Columbia');
        } else {
            setDisplayData(toBeDisplayed[0]);
        }
        setShowState(true);
    };

    const handleExit = () => {
        setShowState(false);
    };

    useEffect(() => {
        async function fetchData() {
            const resultUSA = await axios.get(
                'https://disease.sh/v3/covid-19/countries/United%20States?strict=true'
            );
            setUSAData(resultUSA.data);
            const resultState = await axios.get(
                'https://disease.sh/v3/covid-19/states'
            );
            setStateData(resultState.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="top-container">
                    <USAMap className="map" onClick={mapHandler} />
                    {showState ? (
                        <StateDisplay
                            state={displayData.state}
                            cases={displayData.cases}
                            active={displayData.active}
                            deaths={displayData.deaths}
                            recovered={displayData.recovered}
                            handleExit={handleExit}
                        />
                    ) : (
                        <USADisplay
                            cases={USAData.cases}
                            active={USAData.active}
                            deaths={USAData.deaths}
                            recovered={USAData.recovered}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
