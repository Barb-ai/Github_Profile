import React, { useState, useEffect } from 'react';
import { getLanguageData } from '../Sever/Api';
import { Line, Bar,Doughnut } from 'react-chartjs-2';
import { useParams } from "react-router-dom";

const Chart = () => {
  const username=useParams().username;
  const [languagesArr, setlanguagesArr] = useState([]);

  useEffect(() => {
    const fetchlanguages = async () => {
      setlanguagesArr(await getLanguageData(username));
    };

    fetchlanguages();
  }, []);

  const barChart = (
    <Bar
      data={{
        labels: languagesArr.map(({language }) => language),
        datasets: [{
          data: languagesArr.map(({stars }) => stars),
          label: 'language',
          borderColor: '#3333ff',
          backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
          fill: true}],}}/>
      );

      const doughnutChart = (
        <Doughnut
          data={{
            labels: languagesArr.map(({language }) => language),
            datasets: [{
              data: languagesArr.map(({count }) => count),
              label: 'language',
              borderColor: '#3333ff',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              fill: true}],}}/>
          );

          return (
            <div>
                {barChart}
                {doughnutChart }

            </div>
          );
}

export default Chart;