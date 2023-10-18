import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Sample, Test, TestRequest } from 'src/app/models/general.models';
import { DialogCreateTestComponent } from 'src/app/shared/components/dialog-create-test/dialog-create-test.component';
import { SampleService } from 'src/app/shared/services/sample.service';
import { TestService } from 'src/app/shared/services/test.service';

@Component({
  selector: 'app-detail-sample',
  templateUrl: './detail-sample.component.html',
  styleUrls: ['./detail-sample.component.scss']
})
export class DetailSampleComponent implements OnInit {

  private sampleId: string = '';
  public sampleDetail: Sample = {} as Sample;
  public testList: Test[] = [];
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private sampleService: SampleService,
    private testService: TestService,
    private activatedRouter: ActivatedRoute, 
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getSampleDetail();
  }

  public getSampleDetail(): void {
    this.activatedRouter.params.pipe(
      tap((param: Params) => this.sampleId = param['id']),
      switchMap(param => this.sampleService.getSampleById(param['id']))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail;
      this.testList = sampleDetail.tests;
    });
  }

  public addTest(): void {
    const dialogRef = this.dialog.open(DialogCreateTestComponent);
    dialogRef.afterClosed().subscribe((test: any) => {
      const requestCreate: TestRequest = {
        sampleId: this.sampleId,
        ...test
      }
      if (test) {
        this.testService.createTest(requestCreate).pipe(
          switchMap(() => this.sampleService.getSampleById(this.sampleId))
        ).subscribe((sampleDetail: Sample) => {
          this.sampleDetail = sampleDetail
          this.testList = sampleDetail.tests;
        });
      }
    });
  }

  public deleteTest(event: any): void {
    this.testService.deleteTest(event).pipe(
      switchMap(() => this.sampleService.getSampleById(this.sampleId))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail
      this.testList = sampleDetail.tests;
    });
  }

  public editTest(event: any): void {
    const requestEdit: TestRequest = {
      sampleId: this.sampleId,
      ...event.result
    }
    this.testService.updateTest(event.id, requestEdit).pipe(
      switchMap(() => this.sampleService.getSampleById(this.sampleId))
    ).subscribe((sampleDetail: Sample) => {
      this.sampleDetail = sampleDetail
      this.testList = sampleDetail.tests;
    });
  }

}
