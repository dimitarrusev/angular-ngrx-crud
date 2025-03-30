import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Associate } from '../store/model/Associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  private apiUrl = 'http://localhost:3000/associate';

  constructor(private httpClient: HttpClient) {}

  addAssociate(associate: Associate) {
    return this.httpClient.post<Associate>(this.apiUrl, associate);
  }

  getAssociates() {
    return this.httpClient.get<Associate[]>(this.apiUrl);
  }

  getAssociate(id: number) {
    return this.httpClient.get<Associate>(`${this.apiUrl}/${id}`);
  }

  updateAssociate(associate: Associate) {
    return this.httpClient.put<Associate>(
      `${this.apiUrl}/${associate.id}`,
      associate
    );
  }

  deleteAssociate(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
