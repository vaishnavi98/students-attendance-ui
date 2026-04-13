import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.gaurd';
export const routes: Routes = [
  { path: '', component: LoginComponent },   // default page
  { path: 'login', component: LoginComponent },
{ 
  path: 'student', 
  component: StudentComponent,
  canActivate: [AuthGuard],
  data: { role: 'STUDENT' }
},
{ 
  path: 'teacher', 
  component: TeacherComponent,
  canActivate: [AuthGuard],
  data: { roles: ['TEACHER', 'ADMIN']}
},
{ 
  path: 'admin', 
  component: AdminComponent,
  canActivate: [AuthGuard],
  data: { role: 'ADMIN' }
}

];
