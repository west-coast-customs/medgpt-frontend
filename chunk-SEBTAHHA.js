import{b as G,c as d}from"./chunk-XOH3FMNG.js";import{a as L,c as W}from"./chunk-UT3XKRPR.js";import"./chunk-L6WIEPRT.js";import{a as B}from"./chunk-XYMJPSQV.js";import{a as z}from"./chunk-GBT7ZGCO.js";import{e as j}from"./chunk-6L5DBB62.js";import{f as $}from"./chunk-PK7LRR4S.js";import{Ba as c,Ca as l,Fb as F,Hb as A,Ia as x,Ja as M,Oa as S,Sa as m,Ta as u,Ua as T,Ub as U,Va as I,Wa as P,Xa as O,Y as a,Ya as r,Za as p,_a as o,fb as b,gb as E,jb as D,kb as N,mb as R,ob as k,tb as s}from"./chunk-25PO6U34.js";import"./chunk-3HT42XJM.js";var g=class n{static{this.ɵfac=function(e){return new(e||n)();};}static{this.ɵcmp=a({type:n,selectors:[["app-loader"]],standalone:!0,features:[s],decls:1,vars:0,consts:[[1,"loader"]],template:function(e,i){e&1&&o(0,"span",0);},styles:['[_nghost-%COMP%]{width:fit-content}.loader[_ngcontent-%COMP%]{width:48px;height:48px;border:5px solid #FFF;border-radius:50%;display:inline-block;box-sizing:border-box;position:relative;animation:_ngcontent-%COMP%_pulse 1s linear infinite;background-color:rgb(33 150 243 / var(--tw-bg-opacity));--tw-bg-opacity: .2}.loader[_ngcontent-%COMP%]:after{content:"";position:absolute;width:48px;height:48px;border:5px solid #FFF;border-radius:50%;display:inline-block;box-sizing:border-box;left:50%;top:50%;transform:translate(-50%,-50%);animation:_ngcontent-%COMP%_scaleUp 1s linear infinite}@keyframes _ngcontent-%COMP%_scaleUp{0%{transform:translate(-50%,-50%) scale(0)}60%,to{transform:translate(-50%,-50%) scale(1)}}@keyframes _ngcontent-%COMP%_pulse{0%,60%,to{transform:scale(1)}80%{transform:scale(1.2)}}'],changeDetection:0});}};function Q(n,t){if(n&1&&(r(0,"p",2),R(1),p()),n&2){let e=t.$implicit,i=t.$index,_=t.$count,C=E();u("chat__message--user",e.role===C.MessageAuthors.USER)("chat__message--bot",e.role===C.MessageAuthors.AGENT),m("@fadeInUpOnEnter",void 0)("@.disabled",i!==_-1||!C.gotNewMessage()),c(),k(" ",e.content," ");}}function X(n,t){n&1&&o(0,"app-loader"),n&2&&m("@fadeOnEnter",void 0);}var h=class n{constructor(t){this.chatService=t;this.MessageAuthors=G;this.activeChatMessages=this.chatService.activeChatMessages;this.gotNewMessage=this.chatService.gotNewMessage;this.waitingBotResponse=this.chatService.waitingBotResponse;}static{this.ɵfac=function(e){return new(e||n)(l(d));};}static{this.ɵcmp=a({type:n,selectors:[["app-chat-window"]],standalone:!0,features:[s],decls:4,vars:1,consts:[[1,"chat__wrapper"],[1,"chat__message",3,"chat__message--user","chat__message--bot"],[1,"chat__message"]],template:function(e,i){e&1&&(r(0,"div",0),P(1,Q,2,7,"p",1,I),S(3,X,1,1,"app-loader"),p()),e&2&&(c(),O(i.activeChatMessages()),c(2),T(i.waitingBotResponse()?3:-1));},dependencies:[g],styles:[".chat__wrapper[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-top:auto;flex-grow:1}.chat__message[_ngcontent-%COMP%]{width:fit-content;max-width:85%;border-radius:20px;padding:10px 12px;text-align:left;line-height:20px}.chat__message--user[_ngcontent-%COMP%]{align-self:flex-end;--tw-bg-opacity: 1;background-color:rgb(244 244 244 / var(--tw-bg-opacity))}.chat__message--bot[_ngcontent-%COMP%]{background-color:rgb(33 150 243 / var(--tw-bg-opacity));--tw-bg-opacity: .2}"],data:{animation:[W(250),L(250)]},changeDetection:0});}};var q=["input"],f=class n{constructor(t,e){this.chatService=t;this.activatedRoute=e;this.waitingBotResponse=this.chatService.waitingBotResponse;this.inputText=M("");this.inputTextEmpty=F(()=>!this.inputText()?.trim().length);this.inputElement=x("input");this.activatedRoute.params.pipe(B()).subscribe(()=>this.focusInput()),A(()=>{this.waitingBotResponse()||this.focusInput();});}onInput(){this.chatService.send(this.inputText()),this.inputText.set("");}focusInput(){setTimeout(()=>this.inputElement()?.nativeElement.focus());}static{this.ɵfac=function(e){return new(e||n)(l(d),l($));};}static{this.ɵcmp=a({type:n,selectors:[["app-chat-input"]],viewQuery:function(e,i){e&1&&D(i.inputElement,q,5),e&2&&N();},inputs:{inputText:[1,"inputText"]},outputs:{inputText:"inputTextChange"},standalone:!0,features:[s],decls:5,vars:3,consts:()=>{let t;return t="Message MedGPT",[["ngSrc","icons/paperclip.svg","width","28","height","28","alt","paperclip",1,"chat-input__attachment"],[1,"input__wrapper"],["customClass","input--rounded","placeholder",t,1,"chat__input",3,"keyup.enter","disabled"],[1,"input__image",3,"click"],["ngSrc","icons/arrow-up.svg","width","24","height","24","alt","arrow-up"]];},template:function(e,i){e&1&&(o(0,"img",0),r(1,"div",1)(2,"app-input",2),b("keyup.enter",function(){return i.onInput();}),p(),r(3,"button",3),b("click",function(){return i.onInput();}),o(4,"img",4),p()()),e&2&&(c(2),m("disabled",i.waitingBotResponse()),c(),u("input__image--disabled",i.inputTextEmpty()));},dependencies:[U,j,z],styles:[".chat-input__attachment[_ngcontent-%COMP%]{height:fit-content;align-self:center}[_nghost-%COMP%]{display:flex;gap:12px;margin-top:auto}.input__wrapper[_ngcontent-%COMP%]{width:100%;border-radius:30px;--tw-bg-opacity: 1;background-color:rgb(244 244 244 / var(--tw-bg-opacity));border-width:2px;border-style:solid;border-color:transparent;transition:border-color .25s ease-in-out;display:flex;gap:12px}.input__wrapper[_ngcontent-%COMP%]:focus-within{--tw-border-opacity: 1;border-color:rgb(33 150 243 / var(--tw-border-opacity))}.input__image[_ngcontent-%COMP%]{margin-right:12px;width:32px;height:32px;place-self:center;place-content:center;place-items:center;border-radius:50%;cursor:pointer;--tw-bg-opacity: 1;background-color:rgb(33 150 243 / var(--tw-bg-opacity));transition:background-color .25s ease-in-out}.input__image--disabled[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(217 217 217 / var(--tw-bg-opacity))}input[_ngcontent-%COMP%]{width:100%;height:52px;padding:24px 16px;border-radius:30px;outline:none;--tw-bg-opacity: 1;background-color:rgb(244 244 244 / var(--tw-bg-opacity))}"],changeDetection:0});}};var y=class n{constructor(t){this.chatService=t;}ngOnDestroy(){this.chatService.disconnect();}static{this.ɵfac=function(e){return new(e||n)(l(d));};}static{this.ɵcmp=a({type:n,selectors:[["app-chat"]],standalone:!0,features:[s],decls:3,vars:0,consts:[[1,"chat__wrapper"]],template:function(e,i){e&1&&(r(0,"div",0),o(1,"app-chat-window"),p(),o(2,"app-chat-input"));},dependencies:[h,f],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%;justify-content:space-between;align-items:center}.chat__input[_ngcontent-%COMP%]{width:784px}.chat__wrapper[_ngcontent-%COMP%]{max-width:784px;display:flex;flex-direction:column-reverse;height:100%;width:100%;margin-bottom:20px;overflow:auto}"],changeDetection:0});}};export{y as default};/**i18n:ed7ec225acdd9c4f0fa7847d53fc67c2e1160b32a59af7292008029acf8bcf9e*/