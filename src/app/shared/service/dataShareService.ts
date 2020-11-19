import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../class/user';

@Injectable({
    providedIn : 'root'
})
export class DataSharedService // implements OnDestroy 
{
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    // ngOnDestroy() {
    //     this.emitChangeSource.unsubscribe();
    // }

    public loginUser: User;

    private userChangeSource = new Subject<User>();
    // Observable string streams
    userEventEmitted$ = this.userChangeSource.asObservable();
    // Service message commands
    userChange(changeUser: any) {
        this.loginUser = changeUser;
        this.userChangeSource.next(changeUser);
    }
}