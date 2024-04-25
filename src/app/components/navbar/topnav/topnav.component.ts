import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectAllProfile } from '../../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  dropToggle = false;
  isLoading: boolean = false;
  port = mainPort
  public facultyProfile$ = this.store.select(selectAllProfile);

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router) { }

  triggerToggle() {
    this.setToggle.emit();
  }

  openDialog(): void {
    this.router.navigate(['/']);
    // console.log("Checking dialogue");
    // this.dialog.open(TopnavLogout);
  }

  @Output() setToggle = new EventEmitter<string>();

}







@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule],
  templateUrl: './topnav.logout.html'
})
export class TopnavLogout {
  constructor(private router: Router, public dialogRef: MatDialogRef<TopnavLogout>) { }
  logout() {
    this.router.navigate(['/']);
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


