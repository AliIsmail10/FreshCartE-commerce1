import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loaderInterceptor,errorInterceptor])), provideRouter( routes,
      withViewTransitions(),withInMemoryScrolling({ scrollPositionRestoration: 'top' }) ),
    provideClientHydration(),importProvidersFrom(RouterModule,BrowserAnimationsModule,NgxSpinnerModule,
 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


    ),
    provideToastr()
  ]
};
