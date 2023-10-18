import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Sample } from 'src/app/models/general.models';
import { SampleService } from 'src/app/shared/services/sample.service';

@Component({
  selector: 'app-detail-sample',
  templateUrl: './detail-sample.component.html',
  styleUrls: ['./detail-sample.component.scss']
})
export class DetailSampleComponent implements OnInit {

  private idSample: string = '';
  public sampleDetail: Sample = {} as Sample;

  constructor(private sampleService: SampleService, private activatedRouter: ActivatedRoute){}

  ngOnInit(): void {
    this.getSampleDetail();
  }

  public getSampleDetail(): void {
    this.activatedRouter.params.pipe(
      tap((param: Params) => this.idSample = param['id']),
      switchMap(param => this.sampleService.getSampleById(param['id']))
    ).subscribe((sampleDetail: Sample) => {
      console.log('sampleDetail',sampleDetail);
      
      this.sampleDetail = sampleDetail;
    });
  }

}
