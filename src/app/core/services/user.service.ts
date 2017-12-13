import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpService) { }

    getAll() {
        return this.http.get('http://localhost:3000/users');
    }

    getById(id: number) {
        return this.http.get('http://localhost:3000/users/' + id);
    }

    create(user: User) {
        return this.http.post('http://localhost:3000/users', user);
    }

    update(user: User) {
        return this.http.put('http://localhost:3000/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('http://localhost:3000/users/' + id);
    }
}