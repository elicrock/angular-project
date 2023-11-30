import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { IPackage } from '../models/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private apiUrl = 'http://localhost:3000/packages';
  constructor(private http: HttpClient) {}

  getAllPackages(): Observable<IPackage[]> {
    return this.http.get<IPackage[]>(this.apiUrl);
  }

  getPackageDependencies(packageId: string): Observable<any> {
    const encodedPackageId = encodeURIComponent(packageId);
    const url = `${this.apiUrl}/${encodedPackageId}/dependencies`;
    return this.http.get(url);
  }
}
