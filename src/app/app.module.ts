import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AssociateListComponent } from './components/associate-list/associate-list.component';
import { AddAssociateComponent } from './components/add-associate/add-associate.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { associateReducer } from './store/associate/associate.reducer';
import { AssociateEffects } from './store/associate/associate.effects';
import { AppEffects } from './store/common/app.effects';

@NgModule({
  declarations: [AppComponent, AssociateListComponent, AddAssociateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ associate: associateReducer }, {}),
    EffectsModule.forRoot([AssociateEffects, AppEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
