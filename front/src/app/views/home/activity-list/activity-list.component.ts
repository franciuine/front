import { Component, OnInit, ViewChild } from '@angular/core';
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
  { name: 'Tabuleiro', description: 'Percurso em tabuleiro para algoritmos', level: '4º ano - Ensino Fundamental', field: 'Matemática', component: 'Matemática', pillar: 'Algoritmos', actions: '' },
  { name: 'Baralho binário', description: 'Jogo de cartas em números binários', level: '7º ano - Ensino Fundamental', field: 'Linguagens', component: 'Números binários', pillar: 'Reconhecimento de padrões', actions: '' },
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
    this.doc.rect(10, 65, 60, 8, "FD");
    this.doc.rect(70, 65, 130, 8, "S");
    this.doc.rect(10, 74, 190, 8, "FD");
    this.doc.rect(10, 83, 190, 32, "S");

    this.doc.setFontSize(12);
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFont("Helvetica", "bold");
    this.doc.text("Descrição: ", 12, 25);
    this.doc.text("Nível de educação: ", 12, 34);
    this.doc.text("Área do conhecimento: ", 12, 43);
    this.doc.text("Componente curricular: ", 12, 52);
    this.doc.text("Pilar do PC: ", 12, 61);
    this.doc.text("Carregado por: ", 12, 70);
    this.doc.text("Como aplicar: ", 12, 79);

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFont("Helvetica", "normal");
    this.doc.text(row.description, 73, 25);
    this.doc.text(row.level, 73, 34);
    this.doc.text(row.field, 73, 43);
    this.doc.text(row.component, 73, 52);
    this.doc.text(row.pillar, 73, 61);
    this.doc.text("[Nome do usuário que upou a atividade]", 73, 70);
    this.doc.text("[Explicação de como aplicar a atividade]", 12, 88)

    this.doc.save(row.name + ".pdf");
  }

}
