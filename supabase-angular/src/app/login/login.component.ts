import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
