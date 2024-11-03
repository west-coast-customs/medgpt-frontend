import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navigation',
  standalone: true,
    imports: [
        ButtonComponent,
        NgOptimizedImage,
        RouterLink
    ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {

}
