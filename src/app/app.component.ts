import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full h-full">
      <router-outlet/>
    </div>`,
  imports: [RouterOutlet]
})
export class AppComponent {}
