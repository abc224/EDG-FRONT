import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css',
})
export class StatistiquesComponent implements OnInit {
  stations = 58;
  transformateurs = 142;
  villages = 260;

  donutData: ChartData<'doughnut', number[], string> = {
    labels: ['Zones couvertes', 'Zones non couvertes'],
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ['#22c55e', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#dc2626'],
      },
    ],
  };

  donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai'],
    datasets: [
      {
        data: [18, 20, 29, 50, 75],
        label: 'Électrification',
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  barChartData: ChartData<'bar'> = {
    labels: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Boké'],
    datasets: [
      {
        data: [95, 80, 65, 50, 40],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => value + '%',
        },
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
