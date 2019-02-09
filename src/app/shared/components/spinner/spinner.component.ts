/*Module Section */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
/*Service Section */
import { SharedSubscriptionService } from '../../services/shared-subscription.service';

@Component({
  selector: 'dat-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  public showLoading:Boolean =false;
  private apiRequestSubscription:Subscription;
  private tabChangeSubscription:Subscription;
  constructor(private sharedSubscriptionService:SharedSubscriptionService) { }

  ngOnInit() {
    this.apiRequestSubscription=this.sharedSubscriptionService.receiveApiRequest()
    .subscribe((data)=>{
      //console.log(data);
      setTimeout(() => {
        this.showLoading=data['isApiRequest'];
      }, 100);
    });
    this.tabChangeSubscription=this.sharedSubscriptionService.recieveIsTabChange()
    .subscribe((data)=>{
      //console.log(data);
      setTimeout(() => {
        this.showLoading=data['isTabChange'];
      }, 100);
    });
  }
  unsubscribeAll()
  {
    if(this.apiRequestSubscription)
    {
      this.apiRequestSubscription.unsubscribe();
    }
  }
  disposeAllObjects()
  {
    this.apiRequestSubscription=null;
  }
  ngOnDestroy()
  {
    //console.log("ngOnDestroy");
    this.unsubscribeAll();
    this.disposeAllObjects();
  }  
}
