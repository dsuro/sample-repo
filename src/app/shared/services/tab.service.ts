/*Module Section */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/*Contant Section*/
import { AppConstants } from '../constants/app-constants';
/*Model Section*/
import { TabModel } from '../models/tab-model';
/*Service Section*/
import { SharedService } from './shared.service';
import { ApiGatewayService } from './api-gateway.service';



@Injectable()
export class TabService {
  private seriveName:string='TabService';
  constructor(private sharedService:SharedService,
    private apiGatewayService:ApiGatewayService) { }
    public getAllTabs():Observable<Array<TabModel>>
    {
      //console.log(userDto);
      let resourceUrl=this.sharedService.getResourceURL(AppConstants.TAB_SERVICE_URL);
      return this.apiGatewayService.get(this.seriveName,'getAllTabs',resourceUrl,null)
                  .pipe(map(reponse =>reponse as Array<TabModel>));
    }
}
