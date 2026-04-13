import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:8080/auth/login';

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return firstValueFrom(
            this.http.post<any>(this.apiUrl, { username, password })
        );
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getRole(): string {
        const token = localStorage.getItem('token');
        if (!token) return '';

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    }


    logout() {
        localStorage.removeItem('token');
    }
}
