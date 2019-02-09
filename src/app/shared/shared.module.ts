/*Module Section */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WindowTokenModule } from 'ngx-window-token';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DataTableModule,TooltipModule,DropdownModule,MultiSelectModule,DialogModule} from 'primeng/primeng';
/*Service Section*/
import { SharedService } from './services/shared.service';
import { SharedSubscriptionService } from './services/shared-subscription.service';
import { ErrorService } from './services/error.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ApiGatewayService } from './services/api-gateway.service';
import { CookieService } from 'ngx-cookie-service';
import { TabService } from './services/tab.service';
/*Component Section*/
import { TabsComponent } from './components/tabs/tabs.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { SingleSelectDropdownListComponent } from './components/single-select-dropdown-list/single-select-dropdown-list.component';
import { MultiSelectDropdownListComponent } from './components/multi-select-dropdown-list/multi-select-dropdown-list.component';

/*Directive Section*/

/*Pipe Section*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WindowTokenModule,
    NgSpinKitModule,
    DataTableModule,
    TooltipModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    WindowTokenModule,
    NgSpinKitModule,
    DataTableModule,
    TooltipModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule,
    TabsComponent,
    SpinnerComponent,
    SingleSelectDropdownListComponent,
    MultiSelectDropdownListComponent,
  ],
  declarations: [
    TabsComponent,
    SpinnerComponent,
    ErrorComponent,
    SingleSelectDropdownListComponent,
    MultiSelectDropdownListComponent,
  ]
})
export class SharedModule { 

  public static forRoot(): ModuleWithProviders 
  {
    return {
      ngModule: SharedModule, 
      providers: [
        SharedService,
        SharedSubscriptionService,
        ErrorService,
        HttpErrorHandlerService,
        ApiGatewayService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:TokenInterceptorService,
          multi:true
        },
        CookieService,
        TabService
      ]
    };
  }
}
