import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Utils } from '../utils';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpService) { }

    getAll() {
        return this.http.get(Utils.getApiUri('/users/'));
    }

    getById(id: number) {
        return this.http.get(Utils.getApiUri('/users/') + id);
    }

    create(user: any) {
        return this.http.post(Utils.getApiUri('/users/'), user);
    }

    update(user: User) {
        return this.http.put(Utils.getApiUri('/users/') + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(Utils.getApiUri('/users/') + id);
    }
}