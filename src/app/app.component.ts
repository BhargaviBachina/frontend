import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Ensure required modules and components are imported
  template: `<router-outlet></router-outlet>`,  // Displays routed components
  styleUrls: ['./app.component.css'],  // Link to the component's styles
})
export class AppComponent {
  title = 'your-app';
}
