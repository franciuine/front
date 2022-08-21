import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LessonPlanService } from 'src/app/shared/service/LessonPlan.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input()
  plan: any;

  constructor(private dialogRef: MatDialogRef<DeleteModalComponent>,
              private _snackBar: MatSnackBar,
              private lessonPlanService: LessonPlanService,) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close(true);
  }

  deleteActivity() {
    this.lessonPlanService.deleteLesson(this.plan.id).subscribe(() => {
          this.dialogRef.close(true);
          this._snackBar.open("Atividade excluída com sucesso!", "OK").afterDismissed().subscribe(() => {
            location.reload();
          });
    });
  }

}
