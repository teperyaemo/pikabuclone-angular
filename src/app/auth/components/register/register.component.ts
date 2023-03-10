import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms"
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { AuthService } from "../../services/auth.service";
import { registerAction } from "../../store/actions/register.action";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
    selector: 'pc-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    form: FormGroup;
    isSubmitting$: Observable<boolean>
    backendErrors$!: Observable<BackendErrorsInterface | null> 

    constructor(private fb: FormBuilder, private store: Store, private authService: AuthService){}

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValues()
    }

    initializeForm(): void{
        this.form = this.fb.group({
            username: '',
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
        const request: RegisterRequestInterface = {
            user: this.form.value
        }
        this.store.dispatch(registerAction({request}))        
    }
}