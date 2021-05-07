import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/requests';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string[];
  },
  series: SeriesData[];
}

// ApexCharts Chart options
const options = {
  plotOptions: {
    bar: {
      horizontal: true,
    }
  }
};

function BarChart() {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  useEffect(() => {
    axios.get<SaleSuccess[]>(`${BASE_URL}/sales/success-by-seller`)
      .then(response => {
        let newChartData: ChartData = {
          labels: {
            categories: []
          },
          series: [
            {
              name: "% Success",
              data: []
            }
          ]
        };

        response.data.map(data => {
          newChartData.labels.categories.push( data.sellerName );
          newChartData.series[0].data.push( round( 100.0 * data.deals / data.visited, 1 ) );
          return null;
        });

        setChartData(newChartData);
      });
  }, []);

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type='bar'
      height='240'
    />
  );
}

export default BarChart;