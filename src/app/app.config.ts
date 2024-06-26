import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './services/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { collegeCommexReducer, commexReducer } from './state/commex/commex.reducer';
import { CommexsEffects } from './state/commex/commex.effects';
import { attendedReducer, attendeeNumberReducer, attendeeReducer } from './state/attendee/attendee.reducer';
import { AttendeeEffects } from './state/attendee/attendee.effects';
import { profileReducer } from './state/faculty-state/faculty-state.reducer';
import { CvEffects } from './state/faculty-state/faculty-state.effects';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'
import { DeanEffects } from './state/dean-state/dean-state.effects';
import { profileDeanReducer } from './state/dean-state/dean-state.reducer';
import { clearStateMetaReducer } from './state/logout.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(CommexsEffects, AttendeeEffects),
    provideState({ name: 'commexs', reducer: commexReducer }),
    provideState({ name: 'collegeCommexs', reducer: collegeCommexReducer }),
    provideState({ name: 'attendees', reducer: attendeeNumberReducer }),
    provideState({ name: 'attended', reducer: attendedReducer }),
    // provideState({ name: 'logout', metareducers: logoutReducer }),
    provideStore(clearStateMetaReducer, {
      runtimeChecks: {},
      metaReducers: [clearStateMetaReducer] // <--- Meta reducers here
    }),

    provideStoreDevtools({
      maxAge: 200, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    provideEffects(CvEffects, DeanEffects),
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'dean', reducer: profileDeanReducer }),
    provideMomentDateAdapter(undefined, { strict: true })
  ]
};

