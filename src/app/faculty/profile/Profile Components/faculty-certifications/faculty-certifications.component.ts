import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { Store } from '@ngrx/store';
import { selectAllCerts, selectAllExistCerts } from '../../../../state/faculty-state/faculty-state.selector';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  public certifications$ = this.store.select(selectAllCerts);
  public existCertifications$ = this.store.select(selectAllExistCerts);
  public port = mainPort;
  constructor(private store: Store){}
}



