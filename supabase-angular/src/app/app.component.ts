import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supabase-angular';

  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService, private router: Router) {  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));

    if (this.session?.user.email == '') {
      this.router.navigate(['/Login']);
    }
  }
}
