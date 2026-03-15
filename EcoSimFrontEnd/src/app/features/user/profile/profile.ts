import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../state/profile/user.actions';
import { selectUser, selectUserLoading } from '../../../state/profile/user.selectors';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private store = inject(Store);


  user$ = this.store.select(selectUser);
  isLoading$ = this.store.select(selectUserLoading);

  ngOnInit(): void {
    
    this.store.dispatch(UserActions.loadProfile());
  }
}