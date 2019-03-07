import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';

const appKey = "kid_SyHrix3U4"; 
const appSecret = "2cdcd7adfd674f6e9b0a22b0bf4d6e24"; 
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService{
    private currentAuthtoken : string;

    constructor(private http: HttpClient) {}

    private createAuthHeaders(type : string) : HttpHeaders{
        if(type === 'Basic'){
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
    
// If the user is logging in or registering we need a Basic authentication. If the 
// user is logging out that needs authentication we use Kinvey authentication.

    login(loginModel : LoginModel) {
        return this.http.post(loginUrl, JSON.stringify(loginModel),
        {
            headers: this.createAuthHeaders('Basic')
        });
    }

    register(registerModel : RegisterModel) {
        return this.http.post(registerUrl, JSON.stringify(registerModel),
        {
            headers: this.createAuthHeaders('Basic')
        });
    }

    logout() {
        return this.http.post(logoutUrl, {},
        {
            headers: this.createAuthHeaders('Kinvey')
        })
    }

    get authtoken(){
        return this.currentAuthtoken;
    }
    set authtoken(value : string){
        this.currentAuthtoken = value;
    }

    checkIfLogged(){
       // return this.currentAuthtoken === localStorage.getItem('authtoken');
       return localStorage.getItem('authtoken') !== null;
    }
}