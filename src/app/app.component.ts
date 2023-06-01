import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart!: Chart;
  city: string = '';
  temperatures: number[] = [];
  labels: string[] = [];

  constructor(private weatherService: WeatherService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.getHistoricalWeather();
  }

  getHistoricalWeather() {
    const historicalData = [
      { date: '2023-05-30', temperature: 25 },
      { date: '2023-05-31', temperature: 28 },
      // Add more historical data as needed
    ];

    this.labels = historicalData.map(entry => entry.date);
    this.temperatures = historicalData.map(entry => entry.temperature);

    this.createChart();
  }

  getweather() {
    this.weatherService.getweatherbycity(this.city)
      .subscribe(
        (data: any) => {
          if (data && data.main && typeof data.main.temp === 'number') {
            const currentTemperature = data.main.temp;
            const currentDate = new Date().toLocaleDateString();

            this.labels.push(currentDate+`-${this.city}`);
            
            this.temperatures.push(currentTemperature);
            this.updateChart();
          } else {
            console.error('Invalid API response:', data);
          }
        },
        (error: any) => {
          console.error('Error fetching weather data:', error);
        }
      );
  }

  createChart() {
    const canvas = document.getElementById('weatherChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Temperature',
              data: this.temperatures,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.temperatures;
      this.chart.update();
    }
  }
}
