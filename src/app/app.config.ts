import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './services/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { certReducer, educReducer, evaluationReducer, expReducer, expertiseReducer, profileReducer, projReducer } from './state/faculty-state/faculty-state.reducer';
import { CvEffects } from './state/faculty-state/faculty-state.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideAnimationsAsync(),
    provideAnimationsAsync(),

    provideStore(),
    provideEffects(CvEffects),
    provideState({ name: 'profile', reducer: profileReducer }),
    provideState({ name: 'cert', reducer: certReducer }),
    provideState({ name: 'educ', reducer: educReducer}),
    provideState({ name: 'exp', reducer: expReducer}),
    provideState({ name: 'proj', reducer: projReducer}),
    provideState({ name: 'expertise', reducer: expertiseReducer}),
    provideState({ name: 'eval', reducer: evaluationReducer})
  ]
};
