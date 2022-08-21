import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EducationLevel } from 'src/app/shared/model/EducationLevel';
import { LessonPlan } from 'src/app/shared/model/LessonPlan';
import { EducationLevelService } from 'src/app/shared/service/EducationLevel.service';
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/service/User.service';
import { Lifecycle } from 'src/app/lifecycle';
import { User } from 'src/app/shared/model/User';
import { PdfService } from 'src/app/shared/service/Pdf.service';

interface Pillar {
  value: number;
  name: string;
}

interface TeacherLevel {
  value: number;
  name: string;
}

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent extends Lifecycle {

  @Input()
  editLessonPlan: LessonPlan;
  componentList: string[];
  activityForm: FormGroup;
  lessonPlan: LessonPlan;
  levels: EducationLevel[];
  components: any;
  selectedLevel: EducationLevel;
  currentUser: any;
  currentUserName: String;
  FinalformData: FormData;
  fileName: string;
  title: string;
  isEdit: boolean = false;

  pillars: Pillar[] = [
    { value: 0, name: 'Decomposição' },
    { value: 1, name: 'Reconhecimento de padrões' },
    { value: 2, name: 'Abstração' },
    { value: 2, name: 'Algoritmos' }
  ];

  teacherLevels: TeacherLevel[] = [
    { value: 0, name: 'Básico' },
    { value: 1, name: 'Intermediário' },
    { value: 2, name: 'Avançado' }
  ]

  constructor(private dialogRef: MatDialogRef<ActivityModalComponent>,
    private fb: FormBuilder,
    private lessonPlanService: LessonPlanService,
    private educationLevelService: EducationLevelService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private pdfService: PdfService) {

    super();
    this.educationLevelService.getAll().subscribe(data => {
      this.levels = data;
    });

    this.components = [
      { value: 0, name: 'Selecione um nível de ensino' },
    ]

  }

  ngOnInit(): void {
    if (this.editLessonPlan == null) {
      this.title = "Nova atividade";
      this.isEdit = false;
      this.activityForm = this.fb.group({
        name: ['', [Validators.required]],
        description: [''],
        educationLevel: ['', [Validators.required]],
        component: ['', [Validators.required]],
        pillar: ['', [Validators.required]],
        tutorial: ['', [Validators.required]],
        evaluation: ['', [Validators.required]],
        teacherLevel: ['', [Validators.required]],
        hability: ['']
      });
    } else {
      this.title = "Editar atividade"
      this.isEdit = true;
      this.activityForm = this.fb.group({
        name: [this.editLessonPlan.name, [Validators.required]],
        description: [this.editLessonPlan.description],
        educationLevel: ['', [Validators.required]],
        component: ['', [Validators.required]],
        pillar: ['', [Validators.required]],
        tutorial: [this.editLessonPlan.tutorial, [Validators.required]],
        evaluation: [this.editLessonPlan.evaluation, [Validators.required]],
        teacherLevel: ['', [Validators.required]],
        hability: [this.editLessonPlan.hability]
      });
    }
    this.currentUser = this.userService.findByUsername(localStorage.getItem("username")!);
  }

  cancel() {
    this.dialogRef.close(true);
    this.activityForm.reset();
  }

  create() {
    try {
      if (this.activityForm.valid) {
        this.lessonPlan = this.isEdit ? this.editLessonPlan : new LessonPlan();
        this.lessonPlan = this.activityForm.value;
        this.lessonPlan.enabled = true;
        this.lessonPlan.pillar = this.activityForm.value.pillar.name;
        this.lessonPlan.teacherLevel = this.activityForm.value.teacherLevel.name;
        this.lessonPlan.component = this.lessonPlan.component.toString().replace(",", ", ");
        this.lessonPlan.educationLevel = this.activityForm.value.educationLevel.name;
        this.lessonPlan.author = localStorage.getItem("username")!;
        if(this.fileName) {
          this.lessonPlan.pdfName = this.fileName;
          this.uploadPdf();
        }
        console.log(this.lessonPlan);
        if (this.isEdit) {
          this.lessonPlanService.deleteLesson(this.editLessonPlan.id).subscribe(() => {
            this.lessonPlanService.postLesson(this.lessonPlan).subscribe(() => {
              this.dialogRef.close(true);
              this._snackBar.open("Atividade editada com sucesso!", "OK");
              location.reload()
            });
          });
        } else {
          this.lessonPlanService.postLesson(this.lessonPlan).subscribe(() => {
            this.dialogRef.close(true);
            this._snackBar.open("Atividade cadastrada com sucesso!", "OK");
            location.reload()
          });
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  handleComponents() {
    if (this.activityForm.get('educationLevel')?.value != null) {
      this.resetComponents();
      this.educationLevelService.getById(this.activityForm.get('educationLevel')?.value.id).subscribe(data => {
        this.componentList = data.components.toString().split("/");
        for (let i = 0; i < this.componentList.length; i++) {
          this.components.push({ value: i, name: this.componentList[i] });
        }
      });
    }
  }

  resetComponents() {
    for (let i = 0; i < this.components.length; i++) {
      this.components.splice(i);
    }
  }

  getErrorMessage() {
    return 'Este campo é obrigatório';
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.FinalformData = new FormData();
      this.FinalformData.append('file', file);
      this.fileName = file.name;
    }
  }

  uploadPdf() {
    this.pdfService.savePdf(this.FinalformData, this.fileName).subscribe(() => {
    });
  }

}
