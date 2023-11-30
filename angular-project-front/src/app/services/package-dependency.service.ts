// package-dependency.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackageDependencyService {
  private dependenciesSubject = new BehaviorSubject<string[]>([]);
  dependencies$ = this.dependenciesSubject.asObservable();

  private selectedPackageSubject = new BehaviorSubject<string | null>(null);
  selectedPackage$ = this.selectedPackageSubject.asObservable();

  updateDependencies(dependencies: string[]): void {
    this.dependenciesSubject.next(dependencies);
  }

  setSelectedPackage(packageId: string | null): void {
    this.selectedPackageSubject.next(packageId);
  }
}
