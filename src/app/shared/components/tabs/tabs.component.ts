/*Module Section */
import { Component, OnInit,Input, Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'dat-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @Input() tabItems:Array<any>;
  @Input() selecedTab:any;
  @Output() onTabIndexChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onTabItemClose:EventEmitter<any> = new EventEmitter<any>();
  public tabs:Array<any>;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes["tabItems"])
    {
      let change = changes["tabItems"];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      //console.log(curVal);
      //console.log(prevVal);
      //console.log(changes["tabItems"]);
      if(curVal!=prevVal)
      {
        //console.log(this.tabItems);
        this.tabs=this.tabItems;
      }
    }
    if(changes["selecedTab"]){
      let change = changes["selecedTab"];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      //console.log(curVal);
      //console.log(prevVal);
      //console.log(changes["selecedTab"]);
      if(curVal!=prevVal)
      {
        //console.log(this.tabItems);
        let currentTabId=this.selecedTab["tabId"];
        this.setActiveTab(currentTabId);
      }
    }
  }
  onTabChange(tab)
  {
      //console.log(event);
      console.log(tab);
     if(tab)
      {
        this.onTabIndexChange.emit(tab);
      }
  }
  setActiveTab(currentTabId)
  {
    if(this.tabs)
    {
      for(let item of this.tabs)
      {
        if(item["tabId"]==currentTabId)
        {
          item["isSelected"]=true;
        }
        else
        {
          item["isSelected"]=false;
        }
      }
    }
  }
  onTabClose(tab)
  {
    //console.log(tab);
    if(tab)
    {
      this.onTabItemClose.emit(tab);
    }
  }
  disposeAllObjects()
  {
    this.tabs=null;
  }
  ngOnDestroy()
  {
    this.disposeAllObjects();
  }
}
