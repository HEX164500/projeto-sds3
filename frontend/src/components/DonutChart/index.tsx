import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

// ApexCharts Chart options
const options = {
  legend: {
    show: true
  }
}

type ChartData = {
  labels: string[],
  series: number[]
}

// ApexCharts fake Chart data ( NOT IN USE FOR NOW )
/*const mockData = {
  series: [477138, 499928, 444867, 220426, 473088],
  labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
}*/

function DonutChart() {

  //FORMA ERRADA
  let chartData: ChartData = { labels: [], series: [] };

  //FORMA ERRADA - Um pouco diferente do original
  axios.get<SaleSum[]>(`${BASE_URL}/sales/amount-by-seller`)
    .then(response => {
      let newCharData : ChartData = { labels: [], series: [] };

      response.data.map( data => {
        newCharData.labels.push(data.sellerName);
        newCharData.series.push(data.sum);
        return null;
      });

      chartData = newCharData;
      console.log(chartData);
    });

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type='donut'
      height='240'
    />
  );
}

export default DonutChart;