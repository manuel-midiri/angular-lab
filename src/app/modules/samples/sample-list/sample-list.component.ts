import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SampleListResult } from 'src/app/models/general.models';
import { AuthService } from 'src/app/services/auth.service';
import { mockSamples } from 'src/assets/data/mock-sample';

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.scss']
})
export class SampleListComponent implements OnInit {

  public search: FormControl = new FormControl('');
  public samples: SampleListResult = mockSamples;
  public displayedColumns: string[] = ['name', 'description', 'number_test', 'icons'];

  constructor(public authServices: AuthService){}

  ngOnInit(): void {
    this.search.valueChanges.subscribe(res => {
      console.log('search', res);
      
    })
  }

}
