import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = ({ state }) => {
    const [stateData, setStateData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [cases, setCases] = useState([]);
    const [deaths, setDeaths] = useState([]);

    // const pushCases = async (response) => {
    //     setCases([]);
    //     await response.data.forEach((day) => {
    //         setCases((cases) => [...cases, day.cases]);
    //     });
    //     datasets.data = cases;
    // };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `https://disease.sh/v3/covid-19/nyt/states/${state.toLowerCase()}?lastdays=all`
            );
            setStateData(response.data);
        }
        fetchData();
    }, [state]);

    useEffect(() => {
        setCases([]);
        setLabels([]);
        setDeaths([]);
        stateData.forEach((day) => {
            setCases((cases) => [...cases, day.cases]);
            setLabels((labels) => [...labels, day.date]);
            setDeaths((deaths) => [...deaths, day.deaths]);
        });
    }, [stateData]);

    return (
        <div>
            {console.log(stateData)}
            <Line
                type="line"
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Cases',
                            fill: false,
                            lineTension: 0.5,
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            data: cases,
                        },
                        {
                            label: 'Total Deaths',
                            fill: false,
                            lineTension: 0.5,
                            backgroundColor: 'rgba(245, 42, 20,1)',
                            borderColor: 'rgba(245, 42, 20,1)',
                            borderWidth: 2,
                            data: deaths,
                        },
                    ],
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Tracking Covid19 Cases',
                        fontSize: 20,
                    },
                }}
            />
        </div>
    );
};

export default Chart;
