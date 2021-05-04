import Chart from 'react-apexcharts';

// ApexCharts Chart options
const options = {
  legend: {
      show: true
  }
}

// ApexCharts fake Chart data
const mockData = {
  series: [477138, 499928, 444867, 220426, 473088],
  labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
}

function DonutChart() {
  return (
    <Chart
      options={{...options, labels: mockData.labels}}
      series= {mockData.series}
      type= 'donut'
      height='240'
    />
  );
}

export default DonutChart;