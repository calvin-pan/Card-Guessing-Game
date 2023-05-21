import { Component, Injector, NgZone } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'deckofcardsapp-app';
  constructor(private router:Router) {
  }
  ngOnInit() {
    this.router.navigate(['home']);
  }
}