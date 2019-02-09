import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';

@Component({
  selector: 'multi-select-dropdown-list',
  templateUrl: './multi-select-dropdown-list.component.html',
  styleUrls: ['./multi-select-dropdown-list.component.css']
})
export class MultiSelectDropdownListComponent implements OnInit {
  @Input() data:Array<any>;
  @Input() defaultValue:Array<any>;
  @Input() reset:Boolean;
  @Input() disabled:Boolean;
  @Input() placeHolder:String;
  @Output() onItemsSelected:EventEmitter<any>=new EventEmitter<any>();
  public dropdownData:Array<any>=[];
  public placeholderText:String="Select Items";
  public selectedItems:Array<any>=null;
  public maxLabels:Number=3;
  public isDisabled:Boolean=false;
  public showDropdown:Boolean;
  constructor() { }

  ngOnInit() {
    this.showDropdown=true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].previousValue!=changes['data'].currentValue){
      this.dropdownData=this.data;
    }
    if(changes['defaultValue'] && changes['defaultValue'].previousValue!=changes['defaultValue'].currentValue){
      this.setDefatltValue(this.defaultValue);
    }
    if(changes['placeHolder'] && changes['placeHolder'].previousValue!=changes['placeHolder'].currentValue){
      this.placeholderText=this.placeHolder;
    }
    if(changes['reset'] && changes['reset'].previousValue!=changes['reset'].currentValue){
      if(this.reset){
        this.selectedItems=null;
      }
    }
    if(changes['disabled'] && changes['disabled'].previousValue!=changes['disabled'].currentValue){
      this.isDisabled=this.disabled;
    }
  }
  setDefatltValue(value){
    setTimeout(() => {
      this.selectedItems=value;
    }, 100);
  }
  clearData(){
    this.dropdownData=[];
    this.showDropdown=false;
    setTimeout(() => {
      this.showDropdown=true;
      this.dropdownData=this.data;
      this.selectedItems=[];
    }, 100);

  }
  disposeAllObjects(){
    this.dropdownData=null;
    this.placeholderText=null;
    this.selectedItems=null;
    this.maxLabels=null;
    this.isDisabled=null;
    this.showDropdown=null;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.disposeAllObjects();
  }
  onItemChange(event){
    this.onItemsSelected.emit(this.selectedItems);
  }
  clearFilterItems(){
    this.dropdownData=[];
    setTimeout(() => {
      this.dropdownData=this.data;
      this.selectedItems=[];
    }, 100);
  }

}
