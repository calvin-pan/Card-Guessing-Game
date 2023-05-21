import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // Method that returns the user to the home page
  goBack() {
    this.router.navigate(["home"]);
  }

}
