import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EducationLevel } from 'src/app/shared/model/EducationLevel';
import { LessonPlan } from 'src/app/shared/model/LessonPlan';
import { EducationLevelService } from 'src/app/shared/service/EducationLevel.service';
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/service/User.service';
import { Lifecycle } from 'src/app/lifecycle';

interface Pillar {
  value: number;
  name: string;
}

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent extends Lifecycle {

  componentList: string[];
  activityForm: FormGroup;
  lessonPlan: LessonPlan;
  levels: EducationLevel[];
  components: any;
  selectedLevel: EducationLevel;

  pillars: Pillar[] = [
    { value: 0, name: 'Decomposição' },
    { value: 1, name: 'Reconhecimento de padrões' },
    { value: 2, name: 'Abstração' },
    { value: 2, name: 'Algoritmos' }
  ];

  constructor(private dialogRef: MatDialogRef<ActivityModalComponent>,
    private fb: FormBuilder,
    private lessonPlanService: LessonPlanService,
    private educationLevelService: EducationLevelService,
    private _snackBar: MatSnackBar,
    private userService: UserService) {

    super();
    this.educationLevelService.getAll().subscribe(data => {
      this.levels = data;
    });

    this.components = [
      { value: 0, name: 'Selecione um nível de ensino' },
    ]

  }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      level: ['', [Validators.required]],
      component: ['', [Validators.required]],
      pillar: ['', [Validators.required]],
      tutorial: ['', [Validators.required]]
    });
  }

  cancel() {
    this.dialogRef.close(true);
    this.activityForm.reset();
  }

  create() {
    try {
      if (this.activityForm.valid) {
        this.lessonPlan = new LessonPlan();
        this.lessonPlan = this.activityForm.value;
        this.lessonPlan.enabled = false;
        this.lessonPlan.pillar = this.activityForm.value.pillar.name;
        this.lessonPlan.component = this.lessonPlan.component.toString().replace(",", ", ");
        this.educationLevelService.getById(this.activityForm.get('level')?.value).subscribe(data => {
          this.lessonPlan.level = data;
          this.userService.getById(1).subscribe(data => {
            this.lessonPlan.author = data;
            console.log(this.lessonPlan);
            let sub = this.lessonPlanService.postLesson(this.lessonPlan).subscribe(() => {
              this.dialogRef.close(true);
              this._snackBar.open("Atividade cadastrada com sucesso!", "OK");
            });
            this.addSubscriptions([sub]);
          });

        });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  handleComponents() {
    if (this.activityForm.get('level')?.value != null) {
      this.resetComponents();
      this.educationLevelService.getById(this.activityForm.get('level')?.value).subscribe(data => {
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
}
