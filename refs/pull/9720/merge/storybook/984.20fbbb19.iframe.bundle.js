(self.webpackChunkngeo=self.webpackChunkngeo||[]).push([[984],{"./node_modules/@sentry/core/build/esm/exports.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{gV:()=>setUser});const SDK_VERSION="9.10.1",worldwide_GLOBAL_OBJ=globalThis;function carrier_getMainCarrier(){return carrier_getSentryCarrier(worldwide_GLOBAL_OBJ),worldwide_GLOBAL_OBJ}function carrier_getSentryCarrier(carrier){const __SENTRY__=carrier.__SENTRY__=carrier.__SENTRY__||{};return __SENTRY__.version=__SENTRY__.version||SDK_VERSION,__SENTRY__[SDK_VERSION]=__SENTRY__[SDK_VERSION]||{}}function carrier_getGlobalSingleton(name,creator,obj=worldwide_GLOBAL_OBJ){const __SENTRY__=obj.__SENTRY__=obj.__SENTRY__||{},carrier=__SENTRY__[SDK_VERSION]=__SENTRY__[SDK_VERSION]||{};return carrier[name]||(carrier[name]=creator())}function dateTimestampInSeconds(){return Date.now()/1e3}const time_timestampInSeconds=function createUnixTimestampInSecondsFunc(){const{performance}=worldwide_GLOBAL_OBJ;if(!performance?.now)return dateTimestampInSeconds;const approxStartingTimeOrigin=Date.now()-performance.now(),timeOrigin=null==performance.timeOrigin?approxStartingTimeOrigin:performance.timeOrigin;return()=>(timeOrigin+performance.now())/1e3}();function misc_uuid4(crypto=function getCrypto(){const gbl=worldwide_GLOBAL_OBJ;return gbl.crypto||gbl.msCrypto}()){let getRandomByte=()=>16*Math.random();try{if(crypto?.randomUUID)return crypto.randomUUID().replace(/-/g,"");crypto?.getRandomValues&&(getRandomByte=()=>{const typedArray=new Uint8Array(1);return crypto.getRandomValues(typedArray),typedArray[0]})}catch(_){}return([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,(c=>(c^(15&getRandomByte())>>c/4).toString(16)))}function session_updateSession(session,context={}){if(context.user&&(!session.ipAddress&&context.user.ip_address&&(session.ipAddress=context.user.ip_address),session.did||context.did||(session.did=context.user.id||context.user.email||context.user.username)),session.timestamp=context.timestamp||time_timestampInSeconds(),context.abnormal_mechanism&&(session.abnormal_mechanism=context.abnormal_mechanism),context.ignoreDuration&&(session.ignoreDuration=context.ignoreDuration),context.sid&&(session.sid=32===context.sid.length?context.sid:misc_uuid4()),void 0!==context.init&&(session.init=context.init),!session.did&&context.did&&(session.did=`${context.did}`),"number"==typeof context.started&&(session.started=context.started),session.ignoreDuration)session.duration=void 0;else if("number"==typeof context.duration)session.duration=context.duration;else{const duration=session.timestamp-session.started;session.duration=duration>=0?duration:0}context.release&&(session.release=context.release),context.environment&&(session.environment=context.environment),!session.ipAddress&&context.ipAddress&&(session.ipAddress=context.ipAddress),!session.userAgent&&context.userAgent&&(session.userAgent=context.userAgent),"number"==typeof context.errors&&(session.errors=context.errors),context.status&&(session.status=context.status)}const objectToString=Object.prototype.toString;function isBuiltin(wat,className){return objectToString.call(wat)===`[object ${className}]`}function isPlainObject(wat){return isBuiltin(wat,"Object")}const debug_build_DEBUG_BUILD="undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__,CONSOLE_LEVELS=["debug","info","warn","error","log","assert","trace"],originalConsoleMethods={};const logger_logger=carrier_getGlobalSingleton("logger",(function makeLogger(){let enabled=!1;const logger={enable:()=>{enabled=!0},disable:()=>{enabled=!1},isEnabled:()=>enabled};return debug_build_DEBUG_BUILD?CONSOLE_LEVELS.forEach((name=>{logger[name]=(...args)=>{enabled&&function consoleSandbox(callback){if(!("console"in worldwide_GLOBAL_OBJ))return callback();const console=worldwide_GLOBAL_OBJ.console,wrappedFuncs={},wrappedLevels=Object.keys(originalConsoleMethods);wrappedLevels.forEach((level=>{const originalConsoleMethod=originalConsoleMethods[level];wrappedFuncs[level]=console[level],console[level]=originalConsoleMethod}));try{return callback()}finally{wrappedLevels.forEach((level=>{console[level]=wrappedFuncs[level]}))}}((()=>{worldwide_GLOBAL_OBJ.console[name](`Sentry Logger [${name}]:`,...args)}))}})):CONSOLE_LEVELS.forEach((name=>{logger[name]=()=>{}})),logger}));function generateTraceId(){return misc_uuid4()}function string_truncate(str,max=0){return"string"!=typeof str||0===max||str.length<=max?str:`${str.slice(0,max)}...`}function merge(initialObj,mergeObj,levels=2){if(!mergeObj||"object"!=typeof mergeObj||levels<=0)return mergeObj;if(initialObj&&0===Object.keys(mergeObj).length)return initialObj;const output={...initialObj};for(const key in mergeObj)Object.prototype.hasOwnProperty.call(mergeObj,key)&&(output[key]=merge(output[key],mergeObj[key],levels-1));return output}function object_addNonEnumerableProperty(obj,name,value){try{Object.defineProperty(obj,name,{value,writable:!0,configurable:!0})}catch(o_O){debug_build_DEBUG_BUILD&&logger_logger.log(`Failed to add non-enumerable property "${name}" to object`,obj)}}function _setSpanForScope(scope,span){span?object_addNonEnumerableProperty(scope,"_sentrySpan",span):delete scope._sentrySpan}function _getSpanForScope(scope){return scope._sentrySpan}class scope_Scope{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:generateTraceId(),sampleRand:Math.random()}}clone(){const newScope=new scope_Scope;return newScope._breadcrumbs=[...this._breadcrumbs],newScope._tags={...this._tags},newScope._extra={...this._extra},newScope._contexts={...this._contexts},this._contexts.flags&&(newScope._contexts.flags={values:[...this._contexts.flags.values]}),newScope._user=this._user,newScope._level=this._level,newScope._session=this._session,newScope._transactionName=this._transactionName,newScope._fingerprint=this._fingerprint,newScope._eventProcessors=[...this._eventProcessors],newScope._attachments=[...this._attachments],newScope._sdkProcessingMetadata={...this._sdkProcessingMetadata},newScope._propagationContext={...this._propagationContext},newScope._client=this._client,newScope._lastEventId=this._lastEventId,_setSpanForScope(newScope,_getSpanForScope(this)),newScope}setClient(client){this._client=client}setLastEventId(lastEventId){this._lastEventId=lastEventId}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(callback){this._scopeListeners.push(callback)}addEventProcessor(callback){return this._eventProcessors.push(callback),this}setUser(user){return this._user=user||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&session_updateSession(this._session,{user}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(tags){return this._tags={...this._tags,...tags},this._notifyScopeListeners(),this}setTag(key,value){return this._tags={...this._tags,[key]:value},this._notifyScopeListeners(),this}setExtras(extras){return this._extra={...this._extra,...extras},this._notifyScopeListeners(),this}setExtra(key,extra){return this._extra={...this._extra,[key]:extra},this._notifyScopeListeners(),this}setFingerprint(fingerprint){return this._fingerprint=fingerprint,this._notifyScopeListeners(),this}setLevel(level){return this._level=level,this._notifyScopeListeners(),this}setTransactionName(name){return this._transactionName=name,this._notifyScopeListeners(),this}setContext(key,context){return null===context?delete this._contexts[key]:this._contexts[key]=context,this._notifyScopeListeners(),this}setSession(session){return session?this._session=session:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(captureContext){if(!captureContext)return this;const scopeToMerge="function"==typeof captureContext?captureContext(this):captureContext,scopeInstance=scopeToMerge instanceof scope_Scope?scopeToMerge.getScopeData():isPlainObject(scopeToMerge)?captureContext:void 0,{tags,extra,user,contexts,level,fingerprint=[],propagationContext}=scopeInstance||{};return this._tags={...this._tags,...tags},this._extra={...this._extra,...extra},this._contexts={...this._contexts,...contexts},user&&Object.keys(user).length&&(this._user=user),level&&(this._level=level),fingerprint.length&&(this._fingerprint=fingerprint),propagationContext&&(this._propagationContext=propagationContext),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,_setSpanForScope(this,void 0),this._attachments=[],this.setPropagationContext({traceId:generateTraceId(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(breadcrumb,maxBreadcrumbs){const maxCrumbs="number"==typeof maxBreadcrumbs?maxBreadcrumbs:100;if(maxCrumbs<=0)return this;const mergedBreadcrumb={timestamp:dateTimestampInSeconds(),...breadcrumb,message:breadcrumb.message?string_truncate(breadcrumb.message,2048):breadcrumb.message};return this._breadcrumbs.push(mergedBreadcrumb),this._breadcrumbs.length>maxCrumbs&&(this._breadcrumbs=this._breadcrumbs.slice(-maxCrumbs),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(attachment){return this._attachments.push(attachment),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:_getSpanForScope(this)}}setSDKProcessingMetadata(newData){return this._sdkProcessingMetadata=merge(this._sdkProcessingMetadata,newData,2),this}setPropagationContext(context){return this._propagationContext=context,this}getPropagationContext(){return this._propagationContext}captureException(exception,hint){const eventId=hint?.event_id||misc_uuid4();if(!this._client)return logger_logger.warn("No client configured on scope - will not capture exception!"),eventId;const syntheticException=new Error("Sentry syntheticException");return this._client.captureException(exception,{originalException:exception,syntheticException,...hint,event_id:eventId},this),eventId}captureMessage(message,level,hint){const eventId=hint?.event_id||misc_uuid4();if(!this._client)return logger_logger.warn("No client configured on scope - will not capture message!"),eventId;const syntheticException=new Error(message);return this._client.captureMessage(message,level,{originalException:message,syntheticException,...hint,event_id:eventId},this),eventId}captureEvent(event,hint){const eventId=hint?.event_id||misc_uuid4();return this._client?(this._client.captureEvent(event,{...hint,event_id:eventId},this),eventId):(logger_logger.warn("No client configured on scope - will not capture event!"),eventId)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach((callback=>{callback(this)})),this._notifyingListeners=!1)}}class AsyncContextStack{constructor(scope,isolationScope){let assignedScope,assignedIsolationScope;assignedScope=scope||new scope_Scope,assignedIsolationScope=isolationScope||new scope_Scope,this._stack=[{scope:assignedScope}],this._isolationScope=assignedIsolationScope}withScope(callback){const scope=this._pushScope();let maybePromiseResult;try{maybePromiseResult=callback(scope)}catch(e){throw this._popScope(),e}return function is_isThenable(wat){return Boolean(wat?.then&&"function"==typeof wat.then)}(maybePromiseResult)?maybePromiseResult.then((res=>(this._popScope(),res)),(e=>{throw this._popScope(),e})):(this._popScope(),maybePromiseResult)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const scope=this.getScope().clone();return this._stack.push({client:this.getClient(),scope}),scope}_popScope(){return!(this._stack.length<=1)&&!!this._stack.pop()}}function getAsyncContextStack(){const sentry=carrier_getSentryCarrier(carrier_getMainCarrier());return sentry.stack=sentry.stack||new AsyncContextStack(function getDefaultCurrentScope(){return carrier_getGlobalSingleton("defaultCurrentScope",(()=>new scope_Scope))}(),function getDefaultIsolationScope(){return carrier_getGlobalSingleton("defaultIsolationScope",(()=>new scope_Scope))}())}function withScope(callback){return getAsyncContextStack().withScope(callback)}function withSetScope(scope,callback){const stack=getAsyncContextStack();return stack.withScope((()=>(stack.getStackTop().scope=scope,callback(scope))))}function stackStrategy_withIsolationScope(callback){return getAsyncContextStack().withScope((()=>callback(getAsyncContextStack().getIsolationScope())))}function asyncContext_getAsyncContextStrategy(carrier){const sentry=carrier_getSentryCarrier(carrier);return sentry.acs?sentry.acs:function getStackAsyncContextStrategy(){return{withIsolationScope:stackStrategy_withIsolationScope,withScope,withSetScope,withSetIsolationScope:(_isolationScope,callback)=>stackStrategy_withIsolationScope(callback),getCurrentScope:()=>getAsyncContextStack().getScope(),getIsolationScope:()=>getAsyncContextStack().getIsolationScope()}}()}function setUser(user){(function currentScopes_getIsolationScope(){return asyncContext_getAsyncContextStrategy(carrier_getMainCarrier()).getIsolationScope()})().setUser(user)}},"./node_modules/bootstrap/js/src/alert.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var jquery__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/jquery/dist/jquery-exposed.js"),jquery__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__),_util__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/bootstrap/js/src/util.js");const NAME="alert",JQUERY_NO_CONFLICT=jquery__WEBPACK_IMPORTED_MODULE_0___default().fn[NAME];class Alert{constructor(element){this._element=element}static get VERSION(){return"4.6.2"}close(element){let rootElement=this._element;element&&(rootElement=this._getRootElement(element));this._triggerCloseEvent(rootElement).isDefaultPrevented()||this._removeElement(rootElement)}dispose(){jquery__WEBPACK_IMPORTED_MODULE_0___default().removeData(this._element,"bs.alert"),this._element=null}_getRootElement(element){const selector=_util__WEBPACK_IMPORTED_MODULE_1__.A.getSelectorFromElement(element);let parent=!1;return selector&&(parent=document.querySelector(selector)),parent||(parent=jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).closest(".alert")[0]),parent}_triggerCloseEvent(element){const closeEvent=jquery__WEBPACK_IMPORTED_MODULE_0___default().Event("close.bs.alert");return jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).trigger(closeEvent),closeEvent}_removeElement(element){if(jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).removeClass("show"),!jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).hasClass("fade"))return void this._destroyElement(element);const transitionDuration=_util__WEBPACK_IMPORTED_MODULE_1__.A.getTransitionDurationFromElement(element);jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).one(_util__WEBPACK_IMPORTED_MODULE_1__.A.TRANSITION_END,(event=>this._destroyElement(element,event))).emulateTransitionEnd(transitionDuration)}_destroyElement(element){jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).detach().trigger("closed.bs.alert").remove()}static _jQueryInterface(config){return this.each((function(){const $element=jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);let data=$element.data("bs.alert");data||(data=new Alert(this),$element.data("bs.alert",data)),"close"===config&&data[config](this)}))}static _handleDismiss(alertInstance){return function(event){event&&event.preventDefault(),alertInstance.close(this)}}}jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("click.bs.alert.data-api",'[data-dismiss="alert"]',Alert._handleDismiss(new Alert)),jquery__WEBPACK_IMPORTED_MODULE_0___default().fn[NAME]=Alert._jQueryInterface,jquery__WEBPACK_IMPORTED_MODULE_0___default().fn[NAME].Constructor=Alert,jquery__WEBPACK_IMPORTED_MODULE_0___default().fn[NAME].noConflict=()=>(jquery__WEBPACK_IMPORTED_MODULE_0___default().fn[NAME]=JQUERY_NO_CONFLICT,Alert._jQueryInterface)},"./node_modules/ol/util.js":(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";function abstract(){throw new Error("Unimplemented abstract method.")}__webpack_require__.d(__webpack_exports__,{b0:()=>abstract,v6:()=>getUid});let uidCounter_=0;function getUid(obj){return obj.ol_uid||(obj.ol_uid=String(++uidCounter_))}},"./node_modules/qruri/canvas.browser.js":module=>{module.exports=function createCanvasBrowser(){return document.createElement("canvas")}},"./node_modules/qruri/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{for(var createcanvas=__webpack_require__("./node_modules/qruri/canvas.browser.js"),VERSIONS=[null,[[10,7,17,13],[1,1,1,1],[]],[[16,10,28,22],[1,1,1,1],[4,16]],[[26,15,22,18],[1,1,2,2],[4,20]],[[18,20,16,26],[2,1,4,2],[4,24]],[[24,26,22,18],[2,1,4,4],[4,28]],[[16,18,28,24],[4,2,4,4],[4,32]],[[18,20,26,18],[4,2,5,6],[4,20,36]],[[22,24,26,22],[4,2,6,6],[4,22,40]],[[22,30,24,20],[5,2,8,8],[4,24,44]],[[26,18,28,24],[5,4,8,8],[4,26,48]],[[30,20,24,28],[5,4,11,8],[4,28,52]],[[22,24,28,26],[8,4,11,10],[4,30,56]],[[22,26,22,24],[9,4,16,12],[4,32,60]],[[24,30,24,20],[9,4,16,16],[4,24,44,64]],[[24,22,24,30],[10,6,18,12],[4,24,46,68]],[[28,24,30,24],[10,6,16,17],[4,24,48,72]],[[28,28,28,28],[11,6,19,16],[4,28,52,76]],[[26,30,28,28],[13,6,21,18],[4,28,54,80]],[[26,28,26,26],[14,7,25,21],[4,28,56,84]],[[26,28,28,30],[16,8,25,20],[4,32,60,88]],[[26,28,30,28],[17,8,25,23],[4,26,48,70,92]],[[28,28,24,30],[17,9,34,23],[4,24,48,72,96]],[[28,30,30,30],[18,9,30,25],[4,28,52,76,100]],[[28,30,30,30],[20,10,32,27],[4,26,52,78,104]],[[28,26,30,30],[21,12,35,29],[4,30,56,82,108]],[[28,28,30,28],[23,12,37,34],[4,28,56,84,112]],[[28,30,30,30],[25,12,40,34],[4,32,60,88,116]],[[28,30,30,30],[26,13,42,35],[4,24,48,72,96,120]],[[28,30,30,30],[28,14,45,38],[4,28,52,76,100,124]],[[28,30,30,30],[29,15,48,40],[4,24,50,76,102,128]],[[28,30,30,30],[31,16,51,43],[4,28,54,80,106,132]],[[28,30,30,30],[33,17,54,45],[4,32,58,84,110,136]],[[28,30,30,30],[35,18,57,48],[4,28,56,84,112,140]],[[28,30,30,30],[37,19,60,51],[4,32,60,88,116,144]],[[28,30,30,30],[38,19,63,53],[4,28,52,76,100,124,148]],[[28,30,30,30],[40,20,66,56],[4,22,48,74,100,126,152]],[[28,30,30,30],[43,21,70,59],[4,26,52,78,104,130,156]],[[28,30,30,30],[45,22,74,62],[4,30,56,82,108,134,160]],[[28,30,30,30],[47,24,77,65],[4,24,52,80,108,136,164]],[[28,30,30,30],[49,25,81,68],[4,28,56,84,112,140,168]]],NUMERIC_REGEXP=/^\d*$/,ALPHANUMERIC_REGEXP=/^[A-Za-z0-9 $%*+\-./:]*$/,ALPHANUMERIC_OUT_REGEXP=/^[A-Z0-9 $%*+\-./:]*$/,GF256_MAP=[],GF256_INVMAP=[-1],i=0,v=1;i<255;++i)GF256_MAP.push(v),GF256_INVMAP[v]=i,v=2*v^(v>=128?285:0);var GF256_GENPOLY=[[]];for(i=0;i<30;++i){for(var prevpoly=GF256_GENPOLY[i],poly=[],j=0;j<=i;++j){var a=j<i?GF256_MAP[prevpoly[j]]:0,b=GF256_MAP[(i+(prevpoly[j-1]||0))%255];poly.push(GF256_INVMAP[a^b])}GF256_GENPOLY.push(poly)}var ALPHANUMERIC_MAP={};for(i=0;i<45;++i)ALPHANUMERIC_MAP["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(i)]=i;var MASKFUNCS=[function(i,j){return(i+j)%2==0},function(i,j){return i%2==0},function(i,j){return j%3==0},function(i,j){return(i+j)%3==0},function(i,j){return((i/2|0)+(j/3|0))%2==0},function(i,j){return i*j%2+i*j%3==0},function(i,j){return(i*j%2+i*j%3)%2==0},function(i,j){return((i+j)%2+i*j%3)%2==0}],needsverinfo=function(ver){return ver>6},ndatabits=function(ver,ecclevel){var nbits=-8&function(ver){var v=VERSIONS[ver],nbits=16*ver*ver+128*ver+64;return needsverinfo(ver)&&(nbits-=36),v[2].length&&(nbits-=25*v[2].length*v[2].length-10*v[2].length-55),nbits}(ver),v=VERSIONS[ver];return nbits-=8*v[0][ecclevel]*v[1][ecclevel]},ndatalenbits=function(ver,mode){switch(mode){case 1:return ver<10?10:ver<27?12:14;case 2:return ver<10?9:ver<27?11:13;case 4:return ver<10?8:16;case 8:return ver<10?8:ver<27?10:12}},getmaxdatalen=function(ver,mode,ecclevel){var nbits=ndatabits(ver,ecclevel)-4-ndatalenbits(ver,mode);switch(mode){case 1:return 3*(nbits/10|0)+(nbits%10<4?0:nbits%10<7?1:2);case 2:return 2*(nbits/11|0)+(nbits%11<6?0:1);case 4:return nbits/8|0;case 8:return nbits/13|0}},calculateecc=function(poly,genpoly){for(var modulus=poly.slice(0),polylen=poly.length,genpolylen=genpoly.length,i=0;i<genpolylen;++i)modulus.push(0);for(i=0;i<polylen;){var quotient=GF256_INVMAP[modulus[i++]];if(quotient>=0)for(var j=0;j<genpolylen;++j)modulus[i+j]^=GF256_MAP[(quotient+genpoly[j])%255]}return modulus.slice(polylen)},augumentbch=function(poly,p,genpoly,q){for(var modulus=poly<<q,i=p-1;i>=0;--i)modulus>>q+i&1&&(modulus^=genpoly<<i);return poly<<q|modulus},maskdata=function(matrix,reserved,mask){for(var maskf=MASKFUNCS[mask],n=matrix.length,i=0;i<n;++i)for(var j=0;j<n;++j)reserved[i][j]||(matrix[i][j]^=maskf(i,j));return matrix},putformatinfo=function(matrix,reserved,ecclevel,mask){for(var n=matrix.length,code=21522^augumentbch(ecclevel<<3|mask,5,1335,10),i=0;i<15;++i){var c=[n-1,n-2,n-3,n-4,n-5,n-6,n-7,n-8,7,5,4,3,2,1,0][i];matrix[[0,1,2,3,4,5,7,8,n-7,n-6,n-5,n-4,n-3,n-2,n-1][i]][8]=matrix[8][c]=code>>i&1}return matrix},evaluatematrix=function(matrix){for(var evaluategroup=function(groups){for(var score=0,i=0;i<groups.length;++i)groups[i]>=5&&(score+=groups[i]-5+3);for(i=5;i<groups.length;i+=2){var p=groups[i];groups[i-1]==p&&groups[i-2]==3*p&&groups[i-3]==p&&groups[i-4]==p&&(groups[i-5]>=4*p||groups[i+1]>=4*p)&&(score+=40)}return score},n=matrix.length,score=0,nblacks=0,i=0;i<n;++i){var groups,row=matrix[i];groups=[0];for(var j=0;j<n;){for(k=0;j<n&&row[j];++k)++j;for(groups.push(k),k=0;j<n&&!row[j];++k)++j;groups.push(k)}score+=evaluategroup(groups),groups=[0];for(j=0;j<n;){var k;for(k=0;j<n&&matrix[j][i];++k)++j;for(groups.push(k),k=0;j<n&&!matrix[j][i];++k)++j;groups.push(k)}score+=evaluategroup(groups);var nextrow=matrix[i+1]||[];nblacks+=row[0];for(j=1;j<n;++j){var p=row[j];nblacks+=p,row[j-1]==p&&nextrow[j]===p&&nextrow[j-1]===p&&(score+=3)}}return score+=10*(Math.abs(nblacks/n/n-.5)/.05|0)},generate=function(data,ver,mode,ecclevel,mask){var v=VERSIONS[ver],buf=function(ver,mode,data,maxbuflen){var buf=[],bits=0,remaining=8,datalen=data.length,pack=function(x,n){if(n>=remaining){for(buf.push(bits|x>>(n-=remaining));n>=8;)buf.push(x>>(n-=8)&255);bits=0,remaining=8}n>0&&(bits|=(x&(1<<n)-1)<<(remaining-=n))},nlenbits=ndatalenbits(ver,mode);switch(pack(mode,4),pack(datalen,nlenbits),mode){case 1:for(var i=2;i<datalen;i+=3)pack(parseInt(data.substring(i-2,i+1),10),10);pack(parseInt(data.substring(i-2),10),[0,4,7][datalen%3]);break;case 2:for(i=1;i<datalen;i+=2)pack(45*ALPHANUMERIC_MAP[data.charAt(i-1)]+ALPHANUMERIC_MAP[data.charAt(i)],11);datalen%2==1&&pack(ALPHANUMERIC_MAP[data.charAt(i-1)],6);break;case 4:for(i=0;i<datalen;++i)pack(data[i],8)}for(pack(0,4),remaining<8&&buf.push(bits);buf.length+1<maxbuflen;)buf.push(236,17);return buf.length<maxbuflen&&buf.push(236),buf}(ver,mode,data,ndatabits(ver,ecclevel)>>3);buf=function(poly,nblocks,genpoly){for(var subsizes=[],subsize=poly.length/nblocks|0,subsize0=0,pivot=nblocks-poly.length%nblocks,i=0;i<pivot;++i)subsizes.push(subsize0),subsize0+=subsize;for(i=pivot;i<nblocks;++i)subsizes.push(subsize0),subsize0+=subsize+1;subsizes.push(subsize0);var eccs=[];for(i=0;i<nblocks;++i)eccs.push(calculateecc(poly.slice(subsizes[i],subsizes[i+1]),genpoly));var result=[],nitemsperblock=poly.length/nblocks|0;for(i=0;i<nitemsperblock;++i)for(var j=0;j<nblocks;++j)result.push(poly[subsizes[j]+i]);for(j=pivot;j<nblocks;++j)result.push(poly[subsizes[j+1]-1]);for(i=0;i<genpoly.length;++i)for(j=0;j<nblocks;++j)result.push(eccs[j][i]);return result}(buf,v[1][ecclevel],GF256_GENPOLY[v[0][ecclevel]]);var result=function(ver){for(var v=VERSIONS[ver],n=function(ver){return 4*ver+17}(ver),matrix=[],reserved=[],i=0;i<n;++i)matrix.push([]),reserved.push([]);var blit=function(y,x,h,w,bits){for(var i=0;i<h;++i)for(var j=0;j<w;++j)matrix[y+i][x+j]=bits[i]>>j&1,reserved[y+i][x+j]=1};for(blit(0,0,9,9,[127,65,93,93,93,65,383,0,64]),blit(n-8,0,8,9,[256,127,65,93,93,93,65,127]),blit(0,n-8,9,8,[254,130,186,186,186,130,254,0,0]),i=9;i<n-8;++i)matrix[6][i]=matrix[i][6]=1&~i,reserved[6][i]=reserved[i][6]=1;var aligns=v[2],m=aligns.length;for(i=0;i<m;++i)for(var maxj=0==i?m-1:m,j=0==i||i==m-1?1:0;j<maxj;++j)blit(aligns[i],aligns[j],5,5,[31,17,21,17,31]);if(needsverinfo(ver)){var code=augumentbch(ver,6,7973,12),k=0;for(i=0;i<6;++i)for(j=0;j<3;++j)matrix[i][n-11+j]=matrix[n-11+j][i]=code>>k++&1,reserved[i][n-11+j]=reserved[n-11+j][i]=1}return{matrix,reserved}}(ver),matrix=result.matrix,reserved=result.reserved;if(function(matrix,reserved,buf){for(var n=matrix.length,k=0,dir=-1,i=n-1;i>=0;i-=2){6==i&&--i;for(var jj=dir<0?n-1:0,j=0;j<n;++j){for(var ii=i;ii>i-2;--ii)reserved[jj][ii]||(matrix[jj][ii]=buf[k>>3]>>(7&~k)&1,++k);jj+=dir}dir=-dir}}(matrix,reserved,buf),mask<0){maskdata(matrix,reserved,0),putformatinfo(matrix,0,ecclevel,0);var bestmask=0,bestscore=evaluatematrix(matrix);for(maskdata(matrix,reserved,0),mask=1;mask<8;++mask){maskdata(matrix,reserved,mask),putformatinfo(matrix,0,ecclevel,mask);var score=evaluatematrix(matrix);bestscore>score&&(bestscore=score,bestmask=mask),maskdata(matrix,reserved,mask)}mask=bestmask}return maskdata(matrix,reserved,mask),putformatinfo(matrix,0,ecclevel,mask),matrix},MODES={numeric:1,alphanumeric:2,octet:4},ECCLEVELS={L:1,M:0,Q:3,H:2};module.exports=function(data,options){var ver=(options=options||{}).version||-1,ecclevel=ECCLEVELS[(options.ecclevel||"L").toUpperCase()],mode=options.mode?MODES[options.mode.toLowerCase()]:-1,mask="mask"in options?options.mask:-1;if(mode<0)mode="string"==typeof data?data.match(NUMERIC_REGEXP)?1:data.match(ALPHANUMERIC_OUT_REGEXP)?2:4:4;else if(1!=mode&&2!=mode&&4!=mode)throw"invalid or unsupported mode";if(data=function(mode,data){switch(mode){case 1:return data.match(NUMERIC_REGEXP)?data:null;case 2:return data.match(ALPHANUMERIC_REGEXP)?data.toUpperCase():null;case 4:if("string"==typeof data){for(var newdata=[],i=0;i<data.length;++i){var ch=data.charCodeAt(i);ch<128?newdata.push(ch):ch<2048?newdata.push(192|ch>>6,128|63&ch):ch<65536?newdata.push(224|ch>>12,128|ch>>6&63,128|63&ch):newdata.push(240|ch>>18,128|ch>>12&63,128|ch>>6&63,128|63&ch)}return newdata}return data}}(mode,data),null===data)throw"invalid data format";if(ecclevel<0||ecclevel>3)throw"invalid ECC level";if(ver<0){for(ver=1;ver<=40&&!(data.length<=getmaxdatalen(ver,mode,ecclevel));++ver);if(ver>40)throw"too large data"}else if(ver<1||ver>40)throw"invalid version";if(-1!=mask&&(mask<0||mask>8))throw"invalid mask";var context,matrix=generate(data,ver,mode,ecclevel,mask),modsize=Math.max(options.modulesize||5,.5),margin=Math.max(null!=options.margin?options.margin:4,0),n=matrix.length,size=modsize*(n+2*margin),canvas=createcanvas();if(canvas.width=canvas.height=size,!(context=canvas.getContext("2d")))throw"canvas support is needed for PNG output";context.fillStyle="#fff",context.fillRect(0,0,size,size),context.fillStyle="#000";for(var i=0;i<n;++i)for(var j=0;j<n;++j)matrix[i][j]&&context.fillRect(modsize*(margin+j),modsize*(margin+i),modsize,modsize);return canvas.toDataURL()}}}]);