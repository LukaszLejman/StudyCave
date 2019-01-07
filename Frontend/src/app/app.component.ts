import { Component, OnInit, Input } from '@angular/core';
import { RoutingStateService } from './routing-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(routingState: RoutingStateService) {
    routingState.loadRouting();
  }

  ngOnInit() {}
}
