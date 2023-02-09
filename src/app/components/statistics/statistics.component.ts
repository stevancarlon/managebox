import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChartType } from 'chart.js';
import { ProjectService } from 'src/app/service/project.service';
import { ChangeDetectorRef } from '@angular/core';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class StatisticsComponent implements OnInit {
  faChartColumn = faChartColumn
  pieChartLabels = ['In-progress', 'Delivered'];
  pieChartType: ChartType = 'pie';
  pieChartOptions = {};
  pieChartPlugins = [];
  pieChartData = {
    labels: ['In progress', 'Delivered'],
    datasets: [{ data: [1, 1] }],
  };
  loading = true

  pieChartDataObj = [
    { labels: ['In progress', 'Delivered'], datasets: [{ data: [0, 0] }] },
    { labels: ['In progress', 'Delivered'], datasets: [{ data: [0, 0] }] },
    { labels: ['In progress', 'Delivered'], datasets: [{ data: [0, 0] }] },
    { labels: ['In progress', 'Delivered'], datasets: [{ data: [0, 0] }] },
  ];

  constructor(
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // this.projectService.getProjects().subscribe(projects => {
    //   projects.map(project => {
    //     if (project.category == 'Software') {
    //       this.pieChartData.datasets[0].data[0] += 1
    //     }
    //   })
    // })
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      projects.map((project) => {
        if (project.category == 'Software') {
          console.log('ok');
          // project.status
          if (project.status) {
            console.log('ok');
            this.pieChartDataObj[0].datasets[0].data[0] += 1;
            console.log(this.pieChartDataObj[0].datasets[0]);
            this.changeDetectorRef.detectChanges();
          } else {
            this.pieChartDataObj[0].datasets[0].data[1] += 1;
            this.changeDetectorRef.detectChanges();
          }
        }

        if (project.category === 'Design') {
          // project.status
          if (project.status) {
            this.pieChartDataObj[1].datasets[0].data[0] += 1;
            this.changeDetectorRef.detectChanges();
          } else {
            this.pieChartDataObj[1].datasets[0].data[1] += 1;
            this.changeDetectorRef.detectChanges();
          }
        }

        if (project.category === 'Marketing') {
          // project.status
          if (project.status) {
            this.pieChartDataObj[2].datasets[0].data[0] += 1;
            this.changeDetectorRef.detectChanges();
          } else {
            this.pieChartDataObj[2].datasets[0].data[1] += 1;
            this.changeDetectorRef.detectChanges();
          }
        }

        if (project.category === 'Administration') {
          // project.status
          if (project.status) {
            this.pieChartDataObj[3].datasets[0].data[0] += 1;
            this.changeDetectorRef.detectChanges();
          } else {
            this.pieChartDataObj[3].datasets[0].data[1] += 1;
            this.changeDetectorRef.detectChanges();
          }
        }
      });
      this.loading = false
    });
  }
}
