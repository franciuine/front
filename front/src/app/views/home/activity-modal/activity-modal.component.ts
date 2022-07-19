import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EducationLevel } from 'src/app/shared/model/EducationLevel';
import { LessonPlan } from 'src/app/shared/model/LessonPlan';
import { EducationLevelService } from 'src/app/shared/service/EducationLevel.service';
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';

interface Components {
  value: number;
  name: string;
}

interface Pillar {
  value: number;
  name: string;
}

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent implements OnInit {

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
    private educationLevelService: EducationLevelService) {

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
    if (this.activityForm.valid) {
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
    for(let i = 0; i < this.components.length; i++) {
      this.components.splice(i);
    }
  }

  getErrorMessage() {
    return 'Este campo é obrigatório';
  }
}
