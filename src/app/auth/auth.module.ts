import { CommonModule, getCurrencySymbol } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.component";
import { PersistanceService } from "../shared/services/persistance.srevice";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./services/auth.service";
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";
import { LoginEffect } from "./store/effects/login.effect";
import { RegisterEffect } from "./store/effects/register.effect";
import { reducer } from "./store/reducers";

const routes: Routes = [{
    path: 'register',
    component: RegisterComponent
},{
    path: 'login',
    component: LoginComponent
}]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        ReactiveFormsModule, 
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([
            RegisterEffect,
            LoginEffect, 
            GetCurrentUserEffect
        ]),
        BackendErrorMessagesModule
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [
        AuthService,
        PersistanceService
    ]
})
export class AuthModule{}