import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LessonPlan } from 'src/app/shared/model/LessonPlan';
import { jsPDF } from "jspdf";
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements AfterViewInit {

  plans: LessonPlan[];
  doc = new jsPDF;
  displayedColumns: string[] = ['name', 'description', 'level', 'component', 'pillar', 'actions'];
  dataSource: MatTableDataSource<LessonPlan>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lessonPlanService: LessonPlanService,
              private _liveAnnouncer: LiveAnnouncer) {

    this.lessonPlanService.getAll().subscribe(data => {
      this.plans = data;
      this.dataSource = new MatTableDataSource<LessonPlan>(this.plans);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  ngAfterViewInit() {
  }

  downloadPlan(row: any) {
    this.doc.setFont("Helvetica", "bold");
    this.doc.setFontSize(20);
    this.doc.setTextColor(50, 50, 50);
    this.doc.text("Atividade: " + row.name, 10, 15);

    this.doc.setFillColor(50, 50, 50);
    this.doc.rect(10, 20, 60, 8, "FD");
    this.doc.rect(70, 20, 130, 8, "S");
    this.doc.rect(10, 29, 60, 8, "FD");
    this.doc.rect(70, 29, 130, 8, "S");
    this.doc.rect(10, 38, 60, 8, "FD");
    this.doc.rect(70, 38, 130, 8, "S");
    this.doc.rect(10, 47, 60, 8, "FD");
    this.doc.rect(70, 47, 130, 8, "S");
    this.doc.rect(10, 56, 60, 8, "FD");
    this.doc.rect(70, 56, 130, 8, "S");
    this.doc.rect(10, 65, 190, 8, "FD");
    this.doc.rect(10, 74, 190, 32, "S");

    this.doc.setFontSize(12);
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont("Helvetica", "bold");
    this.doc.text("Descrição: ", 12, 25);
    this.doc.text("Nível de ensino: ", 12, 34);
    this.doc.text("Componente curricular: ", 12, 43);
    this.doc.text("Pilar do PC: ", 12, 52);
    this.doc.text("Carregado por: ", 12, 61);
    this.doc.text("Desenvolvimento: ", 12, 70);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont("Helvetica", "normal");
    this.doc.text(row.description, 73, 25);
    this.doc.text(row.educationLevel.name, 73, 34);
    this.doc.text(row.component, 73, 43);
    this.doc.text(row.pillar, 73, 52);
    this.doc.text(row.user.name, 73, 61);
    this.doc.text(row.tutorial, 12, 79)

    this.doc.save(row.name + ".pdf");
  }

  filterTable(input: Event) {
    this.dataSource.filter = (input.target as HTMLInputElement).value.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
