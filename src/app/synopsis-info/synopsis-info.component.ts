import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-info',
  //standalone: true,
  //imports: [],
  templateUrl: './synopsis-info.component.html',
  styleUrl: './synopsis-info.component.scss'
})
export class SynopsisInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
