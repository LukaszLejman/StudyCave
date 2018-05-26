import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-materials-menu',
  templateUrl: './materials-menu.component.html',
  styleUrls: ['./materials-menu.component.css']
})
export class MaterialsMenuComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

}
