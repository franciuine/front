import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from "jspdf";

export interface lessonPlan {
  name: string;
  description: string;
  level: string;
  field: string;
  component: string;
  pillar: string;
  actions: string;
}

const plans: lessonPlan[] = [
  {name: 'Tabuleiro', description: 'Percurso em tabuleiro para algoritmos', level: '4º ano - Ensino Fundamental', field: 'Matemática', component: 'Matemática', pillar: 'Algoritmos', actions: ''},
  {name: 'Baralho binário', description: 'Jogo de cartas em números binários', level: '7º ano - Ensino Fundamental', field: 'Linguagens', component: 'Números binários', pillar: 'Reconhecimento de padrões', actions: ''},
];

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'level', 'field', 'component', 'pillar', 'actions'];
  dataSource = new MatTableDataSource<lessonPlan>(plans);
  doc = new jsPDF;
  
  constructor() {
    
  }

  ngOnInit(): void {
  }

  downloadPlan (row: any) {
    this.doc.text(row.name, 10, 10);
    this.doc.save(row.name + ".pdf");    
  }

}
