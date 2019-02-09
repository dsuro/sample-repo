import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { WINDOW } from 'ngx-window-token';
import { AppConstants } from '../constants/app-constants';

@Injectable()
export class SharedService {
  private userToken:String='';//YWRtaW4=
  private isInEditMode:Boolean=false;
  constructor(@Inject(WINDOW) private _window:any) { }
  getResourceURL(resource):string
  {
    return environment.BASE_SERVICE_URL+resource;
  }
  isBrowserIE()
  {
    let result:Boolean=false;
    let ua=this._window.navigator.userAgent;
    let keyExists:Boolean=false;
    if(this._window.navigator.appName=="Microsoft Internet Explorer")
      keyExists=true;
    else if(ua.indexOf('MSIE')!=-1)
      keyExists=true;
    else if(ua.indexOf('Trident')!=-1)
      keyExists=true;
    else if(ua.indexOf('rv:11')!=-1)
      keyExists=true;      
      if(keyExists)//if internet explorer
      {
        result=true;
      }
    return result;
  }
  interpolation(input:string,expression:any):string
  {
    let modifiedStr:string=input;
    if(typeof expression!=undefined && expression!=null)
    {
      for(let key in expression)
      {
        let val=expression[key];
        key="{{"+key+"}}";
        modifiedStr=modifiedStr.replace(key,val);
      }
    }
    console.log(modifiedStr);
    return modifiedStr;
  }
  isParentFrame()
  {
    return (this._window.self===this._window.top)?true:false;
  }
  encodeData(input)
	{
	    let output = "";
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
      const keyStr= AppConstants.ENCRYPTION_KEY;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                	keyStr.charAt(enc1) +
                	keyStr.charAt(enc2) +
                	keyStr.charAt(enc3) +
                	keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

       return output;
  }
  decodeData(input)
	{
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        const keyStr= AppConstants.ENCRYPTION_KEY;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            console.log("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;		
  }
  setUserToken(userToken)
  {
    this.userToken=userToken;
  }
  getUserToken():String{
    return this.userToken;
  }
  setIsInEditMode(isInEditMode){
    this.isInEditMode=isInEditMode;
  }
  getIsInEditMode():Boolean{
    return this.isInEditMode;
  }
}
