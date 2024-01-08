import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Contact } from '../interfaces/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://localhost:5000/api';
  private contactSubject = new BehaviorSubject<Contact[]>([]);
  public contact$ = this.contactSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  loadAllContacts(): void {
    this.httpClient.get<Contact[]>(`${this.baseUrl}/contacts`).subscribe(contacts => {
      this.contactSubject.next(contacts);
    });
  }

  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.baseUrl}/contacts/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${this.baseUrl}/contacts`, contact).pipe(
      tap((newContact) => {
        const currentContacts = this.contactSubject.getValue();
        this.contactSubject.next([...currentContacts, newContact]);
      })
    );
  }

  updateContact(id: string, contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${this.baseUrl}/contacts/${id}`, contact).pipe(
      tap(() => this.loadAllContacts())
    );
  }

  deleteContact(id: string): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${this.baseUrl}/contacts/${id}`).pipe(
      tap(() => this.loadAllContacts())
    );
  }

}