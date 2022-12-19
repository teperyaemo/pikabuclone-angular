import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { createEffect, ofType, Actions } from "@ngrx/effects"
import { switchMap, map, catchError, of } from "rxjs"
import { PersistanceService } from "src/app/shared/services/persistance.srevice"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { AuthService } from "../../services/auth.service"
import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from "../actions/getCurrentUser.action"

@Injectable()
export class GetCurrentUserEffect{
    getCurrentUser$ = createEffect(()=> 
        this.actions$.pipe(
            ofType(getCurrentUserAction),
            switchMap(()=> {
                const token = this.persistanceService.get('accessToken')
                if(!token){
                    return of(getCurrentUserFailureAction())
                }
                return this.authService.getCurrentUser().pipe(
                    map((currentUser: CurrentUserInterface) =>{
                        return getCurrentUserSuccessAction({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse)=> {
                    return of(getCurrentUserFailureAction())
                })
            )
        })  
    ))

    constructor(private actions$: Actions, private authService: AuthService,
         private persistanceService : PersistanceService){}
} 