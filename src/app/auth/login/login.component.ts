import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component ({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = '';
    password = '';
    loading = false;

    constructor(private auth: AuthService, private router: Router){}

    async login(){
        this.loading = true;

    try{
        const result  = await this.auth.login(this.username, this.password);
        this.auth.saveToken(result.token);
        const role = result.role;
        
        if(role === 'ROLE_TEACHER') this.router.navigate(['/teacher']);
        else if (role === 'ROLE_STUDENT') this.router.navigate(['./student']);
        else if (role === 'ROLE_ADMIN') this.router.navigate(['./admin']);
        else alert('Unknown User');

    }catch(err){
        alert('Invalid username or password');
    }
this.loading = false;
}
}