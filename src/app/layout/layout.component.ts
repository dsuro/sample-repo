/*Module Section */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
/*Contant Section*/

/*Model Section*/
import { TabModel } from '../shared/models/tab-model';
/*Service Section*/
import { SharedSubscriptionService } from '../shared/services/shared-subscription.service';
import { SharedService } from '../shared/services/shared.service';
import { TabService } from '../shared/services/tab.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public tabs:Array<TabModel>;
  public selecedTab:any;
  private tabSubscrition:Subscription;
  constructor(
    private tabService:TabService,
    private sharedSubscriptionService:SharedSubscriptionService,
    private sharedService:SharedService) { }

  ngOnInit() {
    this.initializeObjects();
    this.subscribeAll();
    this.getAllTabs();
  }
  onTabChange(event)
  {
    //console.log(event);
    let url =event["url"];
    //this.router.navigate([url],{skipLocationChange:true});
    this.selecedTab=event;
    //console.log(event);
  }
  initializeObjects()
  {
   
  }
  subscribeAll()
  {
  
  }
  getAllTabs()
  {
    this.tabSubscrition=this.tabService.getAllTabs()
    .subscribe((tabs)=>{
      console.log(tabs);
      this.tabs=tabs;
    });
  }
  unSubscribeAll()
  {
    if(this.tabSubscrition)
    {
      this.tabSubscrition.unsubscribe();
    }
  }
  disposeObjects()
  {
    this.tabSubscrition=null;
  }
  ngOnDestroy()
  {
    this.unSubscribeAll();
    this.disposeObjects();
  }
  onTabClose(event)
  {
    console.log(event);
    
  }
}
