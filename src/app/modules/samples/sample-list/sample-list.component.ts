import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { SampleListResult, SampleRequest } from 'src/app/models/general.models';
import { AuthService } from 'src/app/services/auth.service';
import { DialogCreateComponent } from 'src/app/shared/components/dialog-create/dialog-create.component';
import { SampleService } from 'src/app/shared/services/sample.service';

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.scss']
})
export class SampleListComponent implements OnInit {

  public search: FormControl = new FormControl('');
  public samples: SampleListResult = {} as SampleListResult;
  public displayedColumns: string[] = ['name', 'description', 'number_test', 'icons'];
  public isAdmin: string = '';

  constructor(public authServices: AuthService, private sampleService: SampleService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.isAdmin = this.authServices.getRole();
    this.getSamples();
  }

  public searchSample(): void {
    this.sampleService.getSamples(this.search.value).subscribe((sample: SampleListResult) => this.samples = sample);
  }

  private getSamples(): void {
    this.sampleService.getSamples().subscribe((sample: SampleListResult) => this.samples = sample);
  }

  public addSample(): void {
    const dialogRef = this.dialog.open(DialogCreateComponent);
    dialogRef.afterClosed().subscribe((sample: SampleRequest) => {
      if (sample) {
        this.sampleService.createSample(sample).pipe(
          switchMap(() => this.sampleService.getSamples())
        ).subscribe((sample: SampleListResult) => this.samples = sample);
      }
    });
  }

  public deleteSample(event: any): void {
    this.sampleService.deleteSample(event).pipe(
      switchMap(() => this.sampleService.getSamples())
    ).subscribe((sample: SampleListResult) => this.samples = sample);
  }

  public editSample(event: any): void {
    this.sampleService.updateSample(event.id, event.result).pipe(
      switchMap(() => this.sampleService.getSamples())
    ).subscribe((sample: SampleListResult) => this.samples = sample);
  }

}
