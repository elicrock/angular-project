import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/searchComponent/search.component';
import { CardComponent } from './components/cardComponent/card.component';
import { IPackage } from './models/package';
import { HttpClientModule } from '@angular/common/http';
import { PackageService } from './services/package.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    SearchComponent,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'newAngular';

  packages: IPackage[] = [];
  loading = false;
  currentPackageDependencies: string[] = [];
  filteredPackages: IPackage[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loading = true;
    this.packageService.getAllPackages().subscribe((data) => {
      this.packages = data;
      this.loading = false;
      this.filteredPackages = [...this.packages];
    });
  }

  onPackageDependencies(item: IPackage): void {
    this.packageService
      .getPackageDependencies(item.id)
      .subscribe((dependencies) => {
        this.currentPackageDependencies = dependencies;
        this.highlightPackages();
      });
  }

  private highlightPackages(): void {
    this.packages.forEach((pkg) => {
      pkg.isHovered =
        this.currentPackageDependencies.includes(pkg.id) &&
        this.packages.some((p) => p.id === pkg.id);
    });
  }

  onSearch(query: string): void {
    this.filteredPackages = this.packages.filter((pkg) =>
      pkg.id.toLowerCase().includes(query.toLowerCase())
    );
  }

  onResetSearch(): void {
    this.filteredPackages = [...this.packages];
  }
}
