import { Injectable } from '@angular/core';
import { WindowRef, DocumentRef } from './browers-globals';
import { GSPFRAME } from './global-config';
import { MOCK_DATA } from './mockdata';

@Injectable()
export class RestGspService {
  private _windowRef: WindowRef;
  private _documentRef: DocumentRef;
  private _restLoaded: boolean;
  constructor(w: WindowRef, d: DocumentRef) {
    this._documentRef = d;
    this._windowRef = w;
    this._restLoaded = false;
  }
  public load() {
    if (this._restLoaded) {
      return this._restLoaded;
    }
    if (GSPFRAME) {
      const script$ = this._documentRef.getNativeDocument().createElement('script');
      script$.type = 'text/javascript';
      script$.src = '/cwbase/web/scripts/jquery-1.10.2.js';
      script$.defer = true;
      this._documentRef.getNativeDocument().body.appendChild(script$);
      var self = this;
      script$.onload = function () {
        const scriptRtf = self._documentRef.getNativeDocument().createElement('script');
        scriptRtf.type = 'text/javascript';
        scriptRtf.src = '/cwbase/web/scripts/gsp.rtf.core.js';
        scriptRtf.defer = true;
        self._documentRef.getNativeDocument().body.appendChild(scriptRtf);
      }
    }
    this._restLoaded = true;
    return this._restLoaded;
  }
  public invoke(options: any): Promise<any> {
    var invokeObject: Promise<any>;
    var gsp = this._windowRef.getNativeWindow()['gsp'];
    options = JSON.stringify(options);
    var optionsService = {
      assembly: 'Genersoft.SCM.PubWeb.RestFul',
      className: 'Genersoft.SCM.PubWeb.RestFul.RestFulService',
      method: 'CommonOperate',
      params: [options]
    }
    invokeObject = new Promise<any>((resolve: Function, reject: Function) => {
      //判断是否在gsp框架下 如果是则进行请求数据，不是的话返回测试数据，测试数据根据方法名标记
      if (GSPFRAME) {
        gsp.rtf.rest.invoke(optionsService, function (data) {
          var obj = JSON.parse(data);
          if (obj && obj.resultType == 0) {//成功
            resolve(obj.appendData);
          }
          if (obj && obj.resultType == 6) {//警告
            alert(obj.message);
            reject(data);
          }
          if (obj && obj.resultType == 8) {//Info提示
            alert(obj.message);
            reject(data);
          }
          if (obj && obj.resultType == 7) {//错误
            alert(obj.message);
            reject(data);
          }
          if (obj && obj.resultType == 5) {
            console.log('未捕捉发生异常，详情见控制台');
            console.log(obj);
            reject(data)
          }

        }, function (error) {
          reject(error);
        });
      }
      else {
        options = JSON.parse(options);
        resolve(MOCK_DATA[options.method]);
      }

    }
    );
    return invokeObject;

  }
  public winFormCardView(amid: string) {
    this._windowRef.getNativeWindow().external['Invokemethod'](
      'Genersoft.AM.DAGL.AMDAGLController.dll',
      'Genersoft.AM.DAGL.AMDAGLController.ChromeViewControl',
      'ViewCard',
      amid
    )
  }
}
