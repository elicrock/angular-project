import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPackage } from '../../models/package';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CardComponent {
  @Input() package: IPackage;
  @Output() mouseEnterPackage = new EventEmitter<IPackage>();
  // @Output() mouseLeavePackage = new EventEmitter<void>();
  @Input() isHovered: boolean = false;

  formatWeeklyDownloads(pkg: IPackage): string {
    if (pkg && pkg.weeklyDownloads > 1000) {
      const roundedDownloads = Math.floor(pkg.weeklyDownloads / 1000);
      return `${roundedDownloads}K`;
    } else if (pkg) {
      return pkg.weeklyDownloads.toString();
    } else {
      return '';
    }
  }

  onCardMouseOver(): void {
    this.mouseEnterPackage.emit(this.package);
  }
}
