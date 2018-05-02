"use strict";(self.webpackChunkngeo=self.webpackChunkngeo||[]).push([[531],{"./src/auth/component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Empty:()=>Empty,EmptyOidc:()=>EmptyOidc,Panel:()=>Panel,WithUser:()=>WithUser,WithUserOidc:()=>WithUserOidc,default:()=>component_stories});var MessageType,lit=__webpack_require__("./node_modules/lit/index.js"),decorators=__webpack_require__("./node_modules/lit/decorators.js"),BaseElement=__webpack_require__("./srcapi/elements/BaseElement.ts");!function(MessageType){MessageType.ERROR="error",MessageType.INFORMATION="information",MessageType.SUCCESS="success",MessageType.WARNING="warning"}(MessageType||(MessageType={}));const Message=class{showMessage(message){}show(object){this.getMessageObjects(object).forEach((msg=>this.showMessage(msg)))}error(message){this.show(this.getMessageObjects(message,MessageType.ERROR))}info(message){this.show(this.getMessageObjects(message,MessageType.INFORMATION))}success(message){this.show(this.getMessageObjects(message,MessageType.SUCCESS))}warn(message){this.show(this.getMessageObjects(message,MessageType.WARNING))}getMessageObjects(object,opt_type){const msgObjects=[],defaultType=MessageType.INFORMATION;if("string"==typeof object)msgObjects.push({msg:object,type:void 0!==opt_type?opt_type:defaultType});else if(Array.isArray(object))object.forEach((msg=>{if("string"==typeof object)msgObjects.push({msg,type:void 0!==opt_type?opt_type:defaultType});else{if("string"==typeof msg)throw new Error("Wrong msg type");void 0!==opt_type&&(msg.type=opt_type),msgObjects.push(msg)}}));else{const msgObject=object;void 0!==opt_type&&(msgObject.type=opt_type),void 0===msgObject.type&&(msgObject.type=defaultType),msgObjects.push(msgObject)}return msgObjects}};__webpack_require__("./node_modules/bootstrap/js/src/alert.js");var util=__webpack_require__("./node_modules/ol/util.js");const Notification=new class MessageNotification extends Message{constructor(){super();const container=document.createElement("div");container.classList.add("ngeo-notification"),document.body.append(container),this.container_=container,this.cache_={}}notify(object){this.show(object)}clear(){for(const uid in this.cache_)this.clearMessageByCacheItem_(this.cache_[parseInt(uid,10)])}showMessage(message){const type=message.type;console.assert("string"==typeof type,"Type should be set.");const classNames=["alert","fade","show"];switch(type){case MessageType.ERROR:classNames.push("alert-danger");break;case MessageType.INFORMATION:classNames.push("alert-info");break;case MessageType.SUCCESS:classNames.push("alert-success");break;case MessageType.WARNING:classNames.push("alert-warning")}const el=document.createElement("div");let container;classNames.forEach((style=>el.classList.add(style))),container=message.target?message.target:this.container_,container.append(el),el.innerHTML=message.msg.normalize("NFD").replace(/([\u0300-\u036f]|[\u003C\u003E])/g,""),el.classList.add("show");const delay=void 0!==message.delay?message.delay:7e3,item={el},uid=(0,util.v6)(el);item.promise=window.setTimeout((()=>{$(el).alert("close"),delete this.cache_[uid]}),delay),this.cache_[uid]=item}clearMessageByCacheItem_(item){const el=item.el,promise=item.promise,uid=(0,util.v6)(el);$(el).alert("close"),clearTimeout(promise),delete this.cache_[uid]}};function litIcon(size){const internal=lit.JW`<circle cx="256" cy="48" r="48" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="109.17" cy="108.313" r="43" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="46.537" cy="257.328" r="38" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="108.028" cy="403.972" r="33" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="255.794" cy="463.935" r="28" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="402.894" cy="402.936" r="23" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"><circle cx="463.623" cy="256.106" r="18" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1">`;return size?lit.JW`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="${size}" width="${size}">${internal}</svg>`:lit.JW`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${internal}</svg>`}const gmfBackgroundlayerStatus={touchedByUser:!1};var UserState,BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js");!function(UserState){UserState.LOGGED_IN="logged in",UserState.LOGGED_OUT="logged out",UserState.DISCONNECTED="disconnected",UserState.READY="ready",UserState.NOT_INITIALIZED="not initialized"}(UserState||(UserState={}));const loginMessageRequired="Some layers in this link are not accessible to unauthenticated users. Please log in to see whole data.";const store_user=new class UserModel{constructor(){this.properties_=new BehaviorSubject.t(this.getEmptyUserProperties()),this.loginMessage_=new BehaviorSubject.t(""),this.state_=UserState.NOT_INITIALIZED}getProperties(){return this.properties_}getState(){return this.state_}getLoginMessage(){return this.loginMessage_}setLoginMessage(messageState){this.loginMessage_.next(messageState)}setUser(properties,state){this.checkUserProperties_(properties)&&null!==state&&(this.state_=state,this.properties_.next(properties))}getEmptyUserProperties(){return{email:null,is_intranet:null,functionalities:null,is_password_changed:null,roles:null,username:null,otp_key:null,otp_uri:null,two_factor_totp_secret:null}}checkUserProperties_(properties){if(null==properties)return console.error("New properties of the user must be an object"),!1;let isValid=!0;return Object.keys(this.getEmptyUserProperties()).forEach((key=>{Object.keys(properties).includes(key)||(console.error(`User is missing property ${key}`),isValid=!1)})),isValid}};var qruri=__webpack_require__("./node_modules/qruri/index.js"),qruri_default=__webpack_require__.n(qruri),i18next=__webpack_require__("./node_modules/i18next/dist/esm/i18next.js"),esm_exports=__webpack_require__("./node_modules/@sentry/core/build/esm/exports.js"),jquery_exposed=__webpack_require__("./node_modules/jquery/dist/jquery-exposed.js"),config=__webpack_require__("./srcapi/store/config.ts");let userTransformer=user=>user;var RouteSuffix;!function(RouteSuffix){RouteSuffix.CHANGE_PASSWORD="loginchangepassword",RouteSuffix.IS_LOGGED_IN="loginuser",RouteSuffix.LOGIN="login",RouteSuffix.LOGOUT="logout",RouteSuffix.RESET_PASSWORD="loginresetpassword"}(RouteSuffix||(RouteSuffix={}));const ngeoAuthService=new class AuthenticationService{constructor(){this.originalUrl=window.location.href,this.baseUrl_=null,this.user_=null,store_user.getProperties().subscribe({next:properties=>{this.user_=properties}}),this.noReloadRole_=null,config.Ay.getConfig().subscribe({next:configuration=>{configuration&&(this.noReloadRole_=configuration.gmfAuthenticationNoReloadRole,this.baseUrl_=configuration.authenticationBaseUrl?configuration.authenticationBaseUrl.replace(/\/$/,""):null,this.baseUrl_&&this.load_())}}),this.verifyConnection_=window.setInterval((()=>{this.checkConnection_()}),6e4)}checkConnection_(){if(this.user_.username&&!1!==this.user_.is_password_changed){const url=`${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;fetch(url,{method:"GET",credentials:"include"}).then((resp=>resp.json())).then((data=>{this.user_.username!==data.username&&this.handleDisconnection()})).catch((err=>{throw new Error(`Error on connection check: ${err.statusText}`)}))}}handleDisconnection(){const noReload=!!this.noReloadRole_&&this.getRolesNames().includes(this.noReloadRole_);this.resetUser(UserState.DISCONNECTED,noReload)}load_(){const url=`${this.baseUrl_}/${RouteSuffix.IS_LOGGED_IN}`;fetch(url,{method:"GET",credentials:"include"}).then((resp=>resp.json())).then((data=>this.checkUser_(data))).then((data=>this.handleLogin_(!0,data)),(()=>{throw new Error("Login fail.")}))}changePassword(login,oldPwd,newPwd,confPwd,otp=void 0){const url=`${this.baseUrl_}/${RouteSuffix.CHANGE_PASSWORD}`,options={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:jquery_exposed.param({login,oldPassword:oldPwd,otp,newPassword:newPwd,confirmNewPassword:confPwd})};return fetch(url,options).then((resp=>resp.json())).then((data=>this.checkUser_(data))).then((data=>this.setUser_(data,UserState.LOGGED_IN)),(()=>{throw new Error("Change password fail.")}))}login(login,pwd,otp=void 0){const url=`${this.baseUrl_}/${RouteSuffix.LOGIN}`,params={login,password:pwd,referrer_to:store_user.getLoginMessage().value==loginMessageRequired?this.originalUrl:window.location.href};otp&&Object.assign(params,{otp});const options={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"include",body:jquery_exposed.param(params)};return fetch(url,options).then((resp=>resp.json())).then((data=>this.checkUser_(data))).then((data=>userTransformer(data))).then((data=>this.handleLogin_(!1,data)),(()=>{throw new Error("Login fail.")}))}checkUser_(data){if(!data)return data;return data={...store_user.getEmptyUserProperties(),...data}}logout(){const noReload=!!this.noReloadRole_&&this.getRolesNames().includes(this.noReloadRole_),url=`${this.baseUrl_}/${RouteSuffix.LOGOUT}`;return fetch(url,{method:"GET",credentials:"include"}).then((()=>{this.resetUser(UserState.LOGGED_OUT,noReload)}))}resetPassword(login){const url=`${this.baseUrl_}/${RouteSuffix.RESET_PASSWORD}`,options={method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:jquery_exposed.param({login})};return fetch(url,options).then((resp=>resp.json().then((data=>data))))}getUsername(){return this.user_.username||null}getEmail(){return this.user_.email||null}getRolesIds(){return this.user_.roles?this.user_.roles.map((role=>role.id)):[]}getRolesNames(){return this.user_.roles?this.user_.roles.map((role=>role.name)):[]}handleLogin_(checkingLoginStatus,data){const userState=checkingLoginStatus?UserState.READY:UserState.LOGGED_IN;return this.setUser_(data,userState),data}setUser_(respData,userState){esm_exports.gV({username:respData.username}),store_user.setUser(respData,userState)}resetUser(userState,noReload){const emptyUserProperties=store_user.getEmptyUserProperties();store_user.setUser(emptyUserProperties,userState),noReload||this.load_()}},service=ngeoAuthService;var __decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let GmfAuthForm=class GmfAuthForm extends BaseElement.A{constructor(){super(...arguments),this.passwordValidator=null,this.loginInfoMessage="",this.isLoading=!1,this.disconnectedShown=!1,this.resetPasswordShown=!1,this.twoFactorAuth=!1,this.allowPasswordChange=!1,this.allowPasswordReset=!1,this.oidcUserInformationUrl="",this.changingPassword=!1,this.userMustChangeItsPassword=!1,this.openIdConnectUrl="",this.error=!1,this.otpImage="",this.gmfUser=null,this.customCSS_="",this.changingPasswordUsername_="",this.initialApplicationUrl=window.location.href,this.currentApplicationUrl=window.location.href,this.openIdConnectBaseUrl=""}connectedCallback(){super.connectedCallback(),this.subscriptions.push(store_user.getProperties().subscribe({next:properties=>{this.gmfUser=properties,this.setOtpImage_(),!1===this.gmfUser.is_password_changed?this.handleUserMustChangeItsPassword_():this.onUserStateUpdate_(store_user.getState())}}),store_user.getLoginMessage().subscribe({next:message=>{this.loginInfoMessage=message,this._updateOpenIdConnectUrl()}})),window.addEventListener("popstate",(()=>{this.currentApplicationUrl=window.location.href,this._updateOpenIdConnectUrl()})),this._updateOpenIdConnectUrl();const loginField=document.body.querySelector("input[slot=gmf-auth-login]"),passwordField=document.body.querySelector("input[slot=gmf-auth-password]");loginField.addEventListener("keypress",(event=>{"Enter"==event.key&&this.login(event)})),passwordField.addEventListener("keypress",(event=>{"Enter"==event.key&&this.login(event)}))}_updateOpenIdConnectUrl(){const applicationUrl=this.loginInfoMessage?this.initialApplicationUrl:this.currentApplicationUrl,params=new URLSearchParams({came_from:applicationUrl});this.openIdConnectUrl=`${this.openIdConnectBaseUrl}?${params.toString()}`}initConfig(configuration){this.twoFactorAuth=configuration.gmfTwoFactorAuth,this.allowPasswordChange=configuration.gmfAuthenticationConfig.allowPasswordChange,this.allowPasswordReset=configuration.gmfAuthenticationConfig.allowPasswordReset,this.oidcUserInformationUrl=configuration.gmfAuthenticationConfig.oidcUserInformationUrl,this.openIdConnectBaseUrl=configuration.gmfOidcLoginUrl,configuration.gmfCustomCSS&&void 0!==configuration.gmfCustomCSS.authentication&&(this.customCSS_=configuration.gmfCustomCSS.authentication),this._updateOpenIdConnectUrl()}render(){return lit.qy`<style>${(0,lit.iz)(this.customCSS_)}</style>${this.gmfUser.is_intranet?lit.qy`<div class="form-group"><span>${i18next.Ay.t("You are recognized as an intranet user.")}</span></div>`:""} ${null!==this.gmfUser.username?lit.qy`<div><div class="form-group"><span>${i18next.Ay.t("Logged in as")}</span> <strong>${this.gmfUser.username}</strong>.</div>${this.oidcUserInformationUrl?lit.qy`<div class="form-group"><span><a href="${this.oidcUserInformationUrl}" target="_blank">${i18next.Ay.t("User information on the OIDC service")}</a></span></div>`:lit.qy``} ${this.changingPassword?"":lit.qy`<form name="logoutForm" role="form" @submit="${evt=>this.logout(evt)}"><div class="form-group"><input type="submit" class="form-control btn prime" value="${i18next.Ay.t("Logout")}"></div><div class="form-group"><input ?hidden="${!(this.allowPasswordChange&&"oidc"!==this.gmfUser.login_type)}" type="button" class="form-control btn btn-default" value="${i18next.Ay.t("Change password")}" @click="${()=>this.changingPassword=!0}"></div></form>`}</div>`:""} ${this.loginInfoMessage?lit.qy`<div class="alert alert-warning"><span>${this.loginInfoMessage}</span></div>`:""} ${this.disconnectedShown?lit.qy`<div class="alert alert-warning">${i18next.Ay.t("You are not logged in any more. The Interface has been reloaded.")}</div>`:""} ${null!==this.gmfUser.username||this.changingPassword?"":"oidc"===this.gmfUser.login_type?lit.qy`<a class="btn prime form-control" role="button" href="${this.openIdConnectUrl}">${i18next.Ay.t("Connect")}</a>`:lit.qy`<div><form name="loginForm" role="form" @submit="${evt=>this.login(evt)}"><div class="form-group"><slot name="gmf-auth-login"></slot></div><div class="form-group"><slot name="gmf-auth-password"></slot></div>${this.twoFactorAuth?lit.qy`<div class="form-group">${i18next.Ay.t("The following field should be kept empty on first login:")} <input type="text" class="form-control" name="otp" autocomplete="one-time-code" placeholder="${i18next.Ay.t("Authentication code")}"></div>`:""}<div class="form-group"><input type="submit" class="form-control btn prime" value="${i18next.Ay.t("Connect")}"></div>${this.isLoading?lit.qy`<div class="login-spinner"><i class="fa-solid fa-spin">${litIcon()}</i></div>`:""}<div ?hidden="${!this.allowPasswordReset}" class="form-group"><a @click="${evt=>this.resetPassword(evt)}" href="">${i18next.Ay.t("Password forgotten?")}</a></div></form>${this.resetPasswordShown?lit.qy`<div class="alert alert-info">${i18next.Ay.t("A new password has just been sent to you by e-mail.")}</div>`:""}</div>`} ${this.changingPassword?lit.qy`<div>${this.userMustChangeItsPassword?lit.qy`<div class="alert alert-warning">${i18next.Ay.t("You must change your password")}</div>`:""}<form name="changePasswordForm" role="form" @submit="${evt=>this.changePassword(evt)}"><div class="form-group"><input type="password" class="form-control" name="oldpassword" autocomplete="current-password" aria-describedby="password-constraints" placeholder="${i18next.Ay.t("Old password")}"></div><div class="form-group"><input type="password" class="form-control" name="newpassword" autocomplete="new-password" placeholder="${i18next.Ay.t("New password")}"></div><div class="form-group"><input type="password" class="form-control" name="newpasswordconfirm" autocomplete="new-password" placeholder="${i18next.Ay.t("Confirm new password")}"></div>${this.gmfUser.otp_uri?lit.qy`<div class="form-group"><label>${i18next.Ay.t("Two factor authentication QR code:")}</label><div><img src="${this.otpImage}"></div></div>`:""} ${this.gmfUser.two_factor_totp_secret?lit.qy`<div class="form-group"><label>${i18next.Ay.t("Two factor authentication key:")}</label> <code>${this.gmfUser.two_factor_totp_secret}</code></div>`:""} ${this.twoFactorAuth?lit.qy`<div class="form-group"><input type="text" class="form-control" name="otp" autocomplete="one-time-code" placeholder="${i18next.Ay.t("Authentication code")}"></div>`:""}<div class="form-group"><input type="submit" class="form-control btn prime" value="${i18next.Ay.t("Change password")}"></div><div class="form-group"><input type="button" class="form-control btn btn-default" value="Cancel" @click="${()=>this.changePasswordReset()}"></div></form></div>`:""}<div ?hidden="${!this.error}" class="auth-error help-block"></div>`}setOtpImage_(){this.gmfUser.otp_uri&&(this.otpImage=qruri_default()(this.gmfUser.otp_uri,{margin:2}))}onUserStateUpdate_(userState){userState===UserState.LOGGED_IN?(this.changingPassword=!1,this.userMustChangeItsPassword=!1):userState===UserState.DISCONNECTED&&(this.disconnectedShown=!0)}handleUserMustChangeItsPassword_(){this.changingPasswordUsername_=this.gmfUser.username,this.changingPassword=!0,this.userMustChangeItsPassword=!0}changePassword(evt){evt.preventDefault();const errors=[],form=evt.target,oldPwd=form.oldpassword.value,newPwd=form.newpassword.value,confPwd=form.newpasswordconfirm.value;let otpVal="";if(this.twoFactorAuth&&(otpVal=form.otp.value),""===oldPwd&&errors.push(i18next.Ay.t("The old password is required.")),""===newPwd&&errors.push(i18next.Ay.t("The new password is required.")),""===confPwd&&errors.push(i18next.Ay.t("The password confirmation is required.")),errors.length)this.setError_(errors);else if(oldPwd===newPwd&&errors.push(i18next.Ay.t("The old and new passwords are the same.")),newPwd!==confPwd&&errors.push(i18next.Ay.t("The passwords don't match.")),this.passwordValidator&&(this.passwordValidator.isPasswordValid(oldPwd)||errors.push(i18next.Ay.t(this.passwordValidator.notValidMessage))),errors.length)this.setError_(errors);else{let username;username=this.userMustChangeItsPassword?this.changingPasswordUsername_:this.gmfUser.username,console.assert(!username),service.changePassword(username,oldPwd,newPwd,confPwd,otpVal).then((()=>{this.changePasswordReset(),this.setError_([i18next.Ay.t("Your password has successfully been changed.")],MessageType.INFORMATION)})).catch((()=>{if(this.renderRoot.querySelector('input[name = "oldpassword"]').value="",this.twoFactorAuth){this.renderRoot.querySelector('input[name = "otp"]').value=""}this.setError_([i18next.Ay.t("Incorrect old password.")])}))}}login(evt){evt.preventDefault(),this.manualLoginLogout_(),this.isLoading=!0;const errors=[],form=this.renderRoot.querySelector("form"),loginVal=document.body.querySelector("input[slot=gmf-auth-login]").value,pwdVal=document.body.querySelector("input[slot=gmf-auth-password]").value;""===loginVal&&errors.push(i18next.Ay.t("The username is required.")),""===pwdVal&&errors.push(i18next.Ay.t("The password is required."));let otpVal="";this.twoFactorAuth&&(otpVal=form.otp.value),errors.length?(this.isLoading=!1,this.setError_(errors)):service.login(loginVal,pwdVal,otpVal).then((()=>{this.cleanForm_(),this.resetError_()})).catch((()=>{this.setError_([i18next.Ay.t("Incorrect credentials or disabled account.")])})).finally((()=>{this.isLoading=!1,form.reset()}))}logout(evt){evt.preventDefault(),this.manualLoginLogout_(),this.isLoading=!0,service.logout().then((()=>{this.cleanForm_(),this.resetError_()})).catch((()=>{this.setError_([i18next.Ay.t("Could not log out.")])})).finally((()=>{this.isLoading=!1}))}manualLoginLogout_(){gmfBackgroundlayerStatus.touchedByUser=!0}resetPassword(evt){evt.preventDefault(),this.isLoading=!0;const login=document.body.querySelector("input[slot=gmf-auth-login]").value;if(""===login)return this.isLoading=!1,void this.setError_([i18next.Ay.t("Please, input a login...")]);service.resetPassword(login).then((()=>{this.cleanForm_(),this.resetPasswordShown=!0,this.resetError_()})).catch((()=>{this.setError_([i18next.Ay.t("An error occurred while resetting the password.")])})).finally((()=>{this.isLoading=!1}))}changePasswordReset(){this.cleanForm_(),this.resetError_(),this.changingPassword=!1,this.userMustChangeItsPassword=!1;const oldPwd=this.renderRoot.querySelector('input[name = "oldpassword"]'),newPwd=this.renderRoot.querySelector('input[name = "newpassword"]'),newPwdConf=this.renderRoot.querySelector('input[name = "newpasswordconfirm"]');oldPwd.value="",newPwd.value="",newPwdConf.value="",service.resetUser(UserState.DISCONNECTED,!0)}setError_(errors,messageType){null==messageType&&(messageType=MessageType.ERROR),this.error&&this.resetError_(),this.error=!0;const container=this.renderRoot.querySelector(".auth-error");errors.forEach((error=>{const options={msg:error,target:container};messageType&&(options.type=messageType),Notification.notify(options)}))}cleanForm_(){const form=this.renderRoot.querySelector("form"),loginField=document.body.querySelector("input[slot=gmf-auth-login]"),passwordField=document.body.querySelector("input[slot=gmf-auth-password]");form.reset(),loginField.value="",passwordField.value=""}resetError_(){Notification.clear(),this.error=!1}};GmfAuthForm.styles=[...BaseElement.A.styles,lit.AH`[hidden]{display:none!important}.login-spinner{float:left;margin-right:20px}i.fa-spin{fill:#000;width:1.3rem}.btn.btn-default{background-color:var(--map-tools-bg-color);border-color:var(--onhover-color);color:var(--map-tools-color)}.btn.btn-default.active{box-shadow:inset $light-box-shadow var(--light-box-shadow-color)}.btn.btn-default.active,.btn.btn-default:hover{background-color:var(--onhover-color);border-color:var(--onhover-color-darken)}`],__decorate([(0,decorators.MZ)({type:Object})],GmfAuthForm.prototype,"passwordValidator",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"loginInfoMessage",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"isLoading",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"disconnectedShown",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"resetPasswordShown",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"twoFactorAuth",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"allowPasswordChange",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"allowPasswordReset",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"oidcUserInformationUrl",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"changingPassword",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"userMustChangeItsPassword",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"openIdConnectUrl",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"error",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"otpImage",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"gmfUser",void 0),__decorate([(0,decorators.wk)()],GmfAuthForm.prototype,"customCSS_",void 0),GmfAuthForm=__decorate([(0,decorators.EM)("gmf-auth-form")],GmfAuthForm);var ToolPanelElement=__webpack_require__("./srcapi/elements/ToolPanelElement.ts"),PanelElement_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r};let GmfAuthPanel=class GmfAuthPanel extends ToolPanelElement.A{constructor(){super(...arguments),this.postLoading=!1,this.passwordValidator=null,this.customCSS_=""}initConfig(configuration){configuration.gmfCustomCSS&&void 0!==configuration.gmfCustomCSS.authenticationPanel&&(this.customCSS_=configuration.gmfCustomCSS.authenticationPanel)}render(){const spinnerTemplate=this.postLoading?lit.qy`<div><i class="fa-solid fa-spin svg-spinner">${litIcon()}</i> ${i18next.Ay.t("Loading themes, please wait...")}</div>`:"";return lit.qy`<style>${(0,lit.iz)(this.customCSS_)}</style>${this.getTitle(i18next.Ay.t("Login"))}<gmf-auth-form .passwordValidator="${this.passwordValidator}"><slot name="gmf-auth-login" slot="gmf-auth-login"></slot><slot name="gmf-auth-password" slot="gmf-auth-password"></slot></gmf-auth-form>${spinnerTemplate}`}};GmfAuthPanel.styles=[...ToolPanelElement.A.styles,lit.AH`.svg-spinner{float:left;margin-right:20px}i.fa-spin{fill:#000;width:1.3rem}`],PanelElement_decorate([(0,decorators.MZ)({type:Boolean})],GmfAuthPanel.prototype,"postLoading",void 0),PanelElement_decorate([(0,decorators.MZ)({type:Object})],GmfAuthPanel.prototype,"passwordValidator",void 0),PanelElement_decorate([(0,decorators.wk)()],GmfAuthPanel.prototype,"customCSS_",void 0),GmfAuthPanel=PanelElement_decorate([(0,decorators.EM)("gmf-auth-panel")],GmfAuthPanel);const component_stories={title:"Auth Form",component:"gmf-auth-form"},Template=args=>(store_user.setUser(args.user,UserState.READY),store_user.setLoginMessage(args.loginInfoMessage?loginMessageRequired:""),'<gmf-auth-form>\n    <input\n      slot="gmf-auth-login"\n      type="text"\n      class="form-control"\n      name="login"\n      autocomplete="username"\n      placeholder="Username" />\n    <input\n      slot="gmf-auth-password"\n      type="password"\n      class="form-control"\n      name="password"\n      autocomplete="current-password"\n      aria-describedby="password-constraints"\n      placeholder="Password"\n    /></gmf-auth-form>'),defaultProperties={loginInfoMessage:!1,user:null},Empty=Template.bind({});Empty.args={...defaultProperties},Empty.args.user=store_user.getEmptyUserProperties();const WithUser=Template.bind({});WithUser.args={...defaultProperties};const login=store_user.getEmptyUserProperties();login.username="George",WithUser.args.user=login;const EmptyOidc=Template.bind({});EmptyOidc.args={...defaultProperties};const loginEmptyOidc=store_user.getEmptyUserProperties();loginEmptyOidc.login_type="oidc",EmptyOidc.args.user=loginEmptyOidc;const WithUserOidc=Template.bind({});WithUserOidc.args={...defaultProperties};const loginOidc=store_user.getEmptyUserProperties();function Panel(){return'\n    <gmf-auth-panel>\n      <input\n        slot="gmf-auth-login"\n        type="text"\n        class="form-control"\n        name="login"\n        autocomplete="username"\n        placeholder="Username" />\n      <input\n        slot="gmf-auth-password"\n        type="password"\n        class="form-control"\n        name="password"\n        autocomplete="current-password"\n        aria-describedby="password-constraints"\n        placeholder="Password"\n      /></gmf-auth-panel>'}loginOidc.login_type="oidc",loginOidc.username="George OIDC",WithUserOidc.args.user=loginOidc,Empty.parameters={...Empty.parameters,docs:{...Empty.parameters?.docs,source:{originalSource:'(args: Args) => {\n  user.setUser(args.user, UserState.READY);\n  user.setLoginMessage(args.loginInfoMessage ? loginMessageRequired : \'\');\n  return `<gmf-auth-form>\n    <input\n      slot="gmf-auth-login"\n      type="text"\n      class="form-control"\n      name="login"\n      autocomplete="username"\n      placeholder="Username" />\n    <input\n      slot="gmf-auth-password"\n      type="password"\n      class="form-control"\n      name="password"\n      autocomplete="current-password"\n      aria-describedby="password-constraints"\n      placeholder="Password"\n    /></gmf-auth-form>`;\n}',...Empty.parameters?.docs?.source}}},WithUser.parameters={...WithUser.parameters,docs:{...WithUser.parameters?.docs,source:{originalSource:'(args: Args) => {\n  user.setUser(args.user, UserState.READY);\n  user.setLoginMessage(args.loginInfoMessage ? loginMessageRequired : \'\');\n  return `<gmf-auth-form>\n    <input\n      slot="gmf-auth-login"\n      type="text"\n      class="form-control"\n      name="login"\n      autocomplete="username"\n      placeholder="Username" />\n    <input\n      slot="gmf-auth-password"\n      type="password"\n      class="form-control"\n      name="password"\n      autocomplete="current-password"\n      aria-describedby="password-constraints"\n      placeholder="Password"\n    /></gmf-auth-form>`;\n}',...WithUser.parameters?.docs?.source}}},EmptyOidc.parameters={...EmptyOidc.parameters,docs:{...EmptyOidc.parameters?.docs,source:{originalSource:'(args: Args) => {\n  user.setUser(args.user, UserState.READY);\n  user.setLoginMessage(args.loginInfoMessage ? loginMessageRequired : \'\');\n  return `<gmf-auth-form>\n    <input\n      slot="gmf-auth-login"\n      type="text"\n      class="form-control"\n      name="login"\n      autocomplete="username"\n      placeholder="Username" />\n    <input\n      slot="gmf-auth-password"\n      type="password"\n      class="form-control"\n      name="password"\n      autocomplete="current-password"\n      aria-describedby="password-constraints"\n      placeholder="Password"\n    /></gmf-auth-form>`;\n}',...EmptyOidc.parameters?.docs?.source}}},WithUserOidc.parameters={...WithUserOidc.parameters,docs:{...WithUserOidc.parameters?.docs,source:{originalSource:'(args: Args) => {\n  user.setUser(args.user, UserState.READY);\n  user.setLoginMessage(args.loginInfoMessage ? loginMessageRequired : \'\');\n  return `<gmf-auth-form>\n    <input\n      slot="gmf-auth-login"\n      type="text"\n      class="form-control"\n      name="login"\n      autocomplete="username"\n      placeholder="Username" />\n    <input\n      slot="gmf-auth-password"\n      type="password"\n      class="form-control"\n      name="password"\n      autocomplete="current-password"\n      aria-describedby="password-constraints"\n      placeholder="Password"\n    /></gmf-auth-form>`;\n}',...WithUserOidc.parameters?.docs?.source}}},Panel.parameters={...Panel.parameters,docs:{...Panel.parameters?.docs,source:{originalSource:'function Panel(): string {\n  return `\n    <gmf-auth-panel>\n      <input\n        slot="gmf-auth-login"\n        type="text"\n        class="form-control"\n        name="login"\n        autocomplete="username"\n        placeholder="Username" />\n      <input\n        slot="gmf-auth-password"\n        type="password"\n        class="form-control"\n        name="password"\n        autocomplete="current-password"\n        aria-describedby="password-constraints"\n        placeholder="Password"\n      /></gmf-auth-panel>`;\n}',...Panel.parameters?.docs?.source},description:{story:"@returns The HTML of the story",...Panel.parameters?.docs?.description}}}}}]);