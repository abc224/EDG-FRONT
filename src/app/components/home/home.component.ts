import { Component } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ZoneService } from '../../services/zone.service';
import { Zone } from '../../models/zone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  date!: Date;
  stats = {
    total: 0,
    tauxSup90: 0,
    tauxSup70: 0,
    tauxSup50: 0,
    tauxInf50: 0,
  };

  // Labels du donut
  public donutLabels: string[] = [
    'Conakry',
    'Kindia',
    'Kankan',
    'Labé',
    'Mamou',
    'Nzérékoré',
    'Faranah',
    'Boké',
  ];

  // Données à afficher, avec la structure correcte pour 'datasets'
  public donutData: ChartData<'doughnut'> = {
    labels: this.donutLabels,
    datasets: [
      {
        data: [40, 20, 10, 5, 5, 5, 5, 10], // Pourcentages pour chaque région
        backgroundColor: [
          '#FF5733', // Conakry
          '#33FF57', // Kindia
          '#3357FF', // Kankan
          '#FF33A1', // Labé
          '#FFD633', // Mamou
          '#FF8C00', // Nzérékoré
          '#8E44AD', // Faranah
          '#1ABC9C', // Boké
        ], // Couleurs du donut
      },
    ],
  };

  // Type du graphique
  public donutType: ChartType = 'doughnut';

  // Options pour le graphique
  public donutOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          textAlign: 'center',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${value}%`; // Afficher les pourcentages dans le tooltip
          },
        },
      },
    },
  };
  tauxCouverture: number = 0;
  constructor(private zoneService: ZoneService) {
    setInterval(() => {
      this.date = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.zoneStats();
  }
  // zoneStats() {
  //   this.zoneService.findAll().subscribe(
  //     (res: Zone[]) => {
  //       const total = res.length;
  //       const electrified = res.filter(
  //         (z) => z.statut === 'electrified'
  //       ).length;
  //       const notElectrified = total - electrified;
  //       const tauxCouverture = total > 0 ? (electrified / total) * 100 : 0;

  //       this.stats = { total, electrified, notElectrified };
  //       this.tauxCouverture = tauxCouverture;
  //     },
  //     (err) => {
  //       console.error('Erreur lors de la récupération des zones :', err);
  //     }
  //   );
  // }

  zoneStats() {
    this.zoneService.findAll().subscribe(
      (res: Zone[]) => {
        const total = res.length;

        let tauxSup90 = 0;
        let tauxSup70 = 0;
        let tauxSup50 = 0;
        let tauxInf50 = 0;

        res.forEach((zone) => {
          // On suppose que chaque zone a un attribut `tauxElectrification` compris entre 0 et 100
          const taux = zone.tauxElectrification ?? 0;

          if (taux >= 90) {
            tauxSup90++;
          } else if (taux >= 70) {
            tauxSup70++;
          } else if (taux >= 50) {
            tauxSup50++;
          } else {
            tauxInf50++;
          }
        });

        this.stats = {
          total,
          tauxSup90,
          tauxSup70,
          tauxSup50,
          tauxInf50,
        };
      },
      (err) => {
        console.error('Erreur lors de la récupération des zones :', err);
      }
    );
  }
}
