import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SearchComponent {
  searchQuery: string = '';

  @Output() searchSubmit = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<void>();

  submitSearch(): void {
    this.searchSubmit.emit(this.searchQuery);
  }

  reset(): void {
    this.searchQuery = '';
    this.resetSearch.emit();
  }
}
