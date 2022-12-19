import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder } from "@angular/forms"
import { Store, select } from "@ngrx/store"
import { Observable } from "rxjs"

import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface"
import { AuthService } from "../../services/auth.service"
import { loginAction } from "../../store/actions/login.action"
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors"
import { LoginRequestInterface } from "../../types/loginrequest.interface"

@Component({
    selector: 'pc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    form!: FormGroup
    isSubmitting$!: Observable<boolean>
    backendErrors$!: Observable<BackendErrorsInterface | null> 

    constructor(private fb: FormBuilder, private store: Store, private authService: AuthService){}

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValues()
    }

    initializeForm(): void{
        this.form = this.fb.group({
            email: '', 
            password: ''
        })
    }

    initializeValues(): void{
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    }

    onSubmit():void{
        console.log(this.form.value)
        const request: LoginRequestInterface = {
            user: this.form.value
        }
        this.store.dispatch(loginAction({request}))        
    }
}