import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LessonPlan } from 'src/app/shared/model/LessonPlan';
import { jsPDF } from "jspdf";
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/shared/service/User.service';
import { User } from 'src/app/shared/model/User';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PdfService } from 'src/app/shared/service/Pdf.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit {

  plans: LessonPlan[];
  userPlans: LessonPlan[];
  doc = new jsPDF;
  hasLoggedUser: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'level', 'component', 'pillar', 'actions'];
  dataSource: MatTableDataSource<LessonPlan>;
  userDataSource: MatTableDataSource<LessonPlan>;
  currentUser: any;
  currentUserName: string;
  userHasPlans: boolean = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private lessonPlanService: LessonPlanService,
    private pdfService: PdfService,
    private dialog: MatDialog) {
    this.hasLoggedUser = localStorage.getItem("token") != "noUser" ? true : false;
    if (this.hasLoggedUser) {
      this.currentUserName = localStorage.getItem("username")!;
      console.log(this.currentUserName);
      this.lessonPlanService.getLessonsByUser(this.currentUserName).subscribe(data => {
        this.userPlans = data;
        this.userHasPlans = data.length != 0 ? true : false;
        this.userDataSource = new MatTableDataSource<LessonPlan>(this.userPlans);
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
        /* this.userDataSource.sortingDataAccessor = (item, property) => {
           switch (property) {
             case 'name': return item.level.name;
             default: return item.id;
           }
         }; */
      })
    }
    this.lessonPlanService.getAllEnabled().subscribe(data => {
      this.plans = data;
      this.dataSource = new MatTableDataSource<LessonPlan>(this.plans);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      /* this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'name': return item.level.name;
          default: return item.id;
        }
      };*/


    });
  }

  ngOnInit() {

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
    this.doc.rect(10, 107, 190, 8, "FD");
    this.doc.rect(10, 116, 190, 32, "S");
    this.doc.rect(10, 149, 60, 8, "FD");
    this.doc.rect(70, 149, 130, 8, "S");
    this.doc.rect(10, 158, 60, 8, "FD");
    this.doc.rect(70, 158, 130, 8, "S");

    this.doc.setFontSize(12);
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont("Helvetica", "bold");
    this.doc.text("Descrição: ", 12, 25);
    this.doc.text("Nível de ensino: ", 12, 34);
    this.doc.text("Componente curricular: ", 12, 43);
    this.doc.text("Pilar do PC: ", 12, 52);
    this.doc.text("Carregado por: ", 12, 61);
    this.doc.text("Desenvolvimento: ", 12, 70);
    this.doc.text("Avaliação:", 12, 112);
    this.doc.text("Nível docente: ", 12, 154);
    this.doc.text("Habilidade BNCC: ", 12, 163);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont("Helvetica", "normal");
    this.doc.text(row.description, 73, 25);
    this.doc.text(row.educationLevel, 73, 34);
    this.doc.text(row.component, 73, 43);
    this.doc.text(row.pillar, 73, 52);
    this.doc.text(row.author, 73, 61);
    this.doc.text(row.tutorial, 12, 79);
    this.doc.text(row.tutorial, 12, 121);
    this.doc.text(row.teacherLevel, 73, 154);
    this.doc.text(row.hability, 73, 163);

    this.doc.save(row.name + ".pdf");

    if (row.pdfName) {
      this.pdfService.getPdf(row.pdfName).subscribe({
          next(data: any) {
            var binaryString = window.atob(data.pdf);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var j = 0; j < binaryLen; j++) {
              var ascii = binaryString.charCodeAt(j);
              bytes[j] = ascii;
            }
            var fileName = row.name + " - Anexos";
            var blob = new Blob([bytes], { type: "application/pdf" });

            var linkDownload = document.createElement("a");
            linkDownload.href = window.webkitURL.createObjectURL(blob);
            var url = linkDownload.href;
            linkDownload.download = fileName;
            linkDownload.click();


          }, error(error) {
            alert("Erro: " + JSON.stringify(error))
          }
        });
    }
  }

  filterTable(input: Event) {
    this.dataSource.filter = (input.target as HTMLInputElement).value.trim().toLowerCase();
  }

  deletePlan(row: any) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      minWidth: '350px'
    });
    dialogRef.componentInstance.plan = row;
  }

  editPlan(row: any) {
    const dialogRef = this.dialog.open(ActivityModalComponent, {
      minWidth: '500px',
    });

    dialogRef.componentInstance.editLessonPlan = row;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}