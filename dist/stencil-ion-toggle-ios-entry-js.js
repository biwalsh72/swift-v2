(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{595:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_toggle",(function(){return d}));var i=n(23),o=n(14),r=n(37),a=n(603),s=n(606);const d=class{constructor(t){Object(i.l)(this,t),this.inputId="ion-tg-"+c++,this.lastDrag=0,this.activated=!1,this.name=this.inputId,this.checked=!1,this.disabled=!1,this.value="on",this.onClick=()=>{this.lastDrag+300<Date.now()&&(this.checked=!this.checked)},this.onFocus=()=>{this.ionFocus.emit()},this.onBlur=()=>{this.ionBlur.emit()},this.ionChange=Object(i.f)(this,"ionChange",7),this.ionFocus=Object(i.f)(this,"ionFocus",7),this.ionBlur=Object(i.f)(this,"ionBlur",7),this.ionStyle=Object(i.f)(this,"ionStyle",7)}checkedChanged(t){this.ionChange.emit({checked:t,value:this.value})}disabledChanged(){this.emitStyle(),this.gesture&&this.gesture.enable(!this.disabled)}async connectedCallback(){this.gesture=(await Promise.resolve().then(n.bind(null,121))).createGesture({el:this.el,gestureName:"toggle",gesturePriority:100,threshold:5,passive:!1,onStart:()=>this.onStart(),onMove:t=>this.onMove(t),onEnd:t=>this.onEnd(t)}),this.disabledChanged()}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}componentWillLoad(){this.emitStyle()}emitStyle(){this.ionStyle.emit({"interactive-disabled":this.disabled})}onStart(){this.activated=!0,this.setFocus()}onMove(t){g(document,this.checked,t.deltaX,-10)&&(this.checked=!this.checked,Object(s.d)())}onEnd(t){this.activated=!1,this.lastDrag=Date.now(),t.event.preventDefault(),t.event.stopImmediatePropagation()}getValue(){return this.value||""}setFocus(){this.buttonEl&&this.buttonEl.focus()}render(){const{inputId:t,disabled:e,checked:n,activated:s,color:d,el:g}=this,c=Object(o.b)(this),l=t+"-lbl",h=Object(r.f)(g),p=this.getValue();return h&&(h.id=l),Object(r.a)(!0,g,this.name,n?p:"",e),Object(i.j)(i.b,{onClick:this.onClick,role:"checkbox","aria-disabled":e?"true":null,"aria-checked":""+n,"aria-labelledby":l,class:Object.assign(Object.assign({},Object(a.a)(d)),{[c]:!0,"in-item":Object(a.c)("ion-item",g),"toggle-activated":s,"toggle-checked":n,"toggle-disabled":e,interactive:!0})},Object(i.j)("div",{class:"toggle-icon"},Object(i.j)("div",{class:"toggle-inner"})),Object(i.j)("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:e,ref:t=>this.buttonEl=t}))}get el(){return Object(i.g)(this)}static get watchers(){return{checked:["checkedChanged"],disabled:["disabledChanged"]}}},g=(t,e,n,i)=>{const o="rtl"===t.dir;return e?!o&&i>n||o&&-i<n:!o&&-i<n||o&&i>n};let c=0;d.style={ios:":host{-webkit-box-sizing:content-box !important;box-sizing:content-box !important;display:inline-block;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.088);--background-checked:var(--ion-color-primary, #3880ff);--handle-background:#ffffff;--handle-background-checked:#ffffff;--border-radius:16px;--handle-border-radius:14px;-webkit-box-sizing:content-box;box-sizing:content-box;position:relative;width:51px;height:32px;contain:strict}:host(.ion-color.toggle-checked) .toggle-icon{background:var(--ion-color-base)}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-transition:background-color 300ms;transition:background-color 300ms;background:var(--background);overflow:hidden;pointer-events:none}.toggle-inner{left:2px;top:2px;border-radius:var(--handle-border-radius);position:absolute;width:28px;height:28px;-webkit-transition:width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms, -webkit-transform 300ms;transition:width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms, -webkit-transform 300ms;transition:transform 300ms, width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms;transition:transform 300ms, width 120ms ease-in-out 80ms, left 110ms ease-in-out 80ms, right 110ms ease-in-out 80ms, -webkit-transform 300ms;background:var(--handle-background);-webkit-box-shadow:0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);box-shadow:0 3px 12px rgba(0, 0, 0, 0.16), 0 3px 1px rgba(0, 0, 0, 0.1);will-change:transform;contain:strict}[dir=rtl] .toggle-inner,:host-context([dir=rtl]) .toggle-inner{left:unset;right:unset;right:2px}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}:host(.toggle-activated) .toggle-icon::before,:host(.toggle-checked) .toggle-icon::before{-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(19px,  0,  0);transform:translate3d(19px,  0,  0);background:var(--handle-background-checked)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner,:host-context([dir=rtl]).toggle-checked .toggle-inner{-webkit-transform:translate3d(calc(-1 * 19px),  0,  0);transform:translate3d(calc(-1 * 19px),  0,  0)}:host(.toggle-activated.toggle-checked) .toggle-inner::before{-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0)}:host(.toggle-activated) .toggle-inner{width:34px}:host(.toggle-activated.toggle-checked) .toggle-inner{left:-4px}:host-context([dir=rtl]):host(.toggle-activated.toggle-checked) .toggle-inner,:host-context([dir=rtl]).toggle-activated.toggle-checked .toggle-inner{left:unset;right:unset;right:-4px}:host(.toggle-disabled){opacity:0.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:20px;padding-right:10px;padding-top:6px;padding-bottom:5px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:10px;padding-inline-end:10px}}:host(.in-item[slot=start]){padding-left:0;padding-right:16px;padding-top:6px;padding-bottom:5px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:0;padding-inline-start:0;-webkit-padding-end:16px;padding-inline-end:16px}}",md:":host{-webkit-box-sizing:content-box !important;box-sizing:content-box !important;display:inline-block;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}:host{--background:rgba(var(--ion-text-color-rgb, 0, 0, 0), 0.3);--background-checked:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.5);--handle-background:#ffffff;--handle-background-checked:var(--ion-color-primary, #3880ff);--border-radius:14px;--handle-border-radius:50%;padding-left:12px;padding-right:12px;padding-top:12px;padding-bottom:12px;-webkit-box-sizing:content-box;box-sizing:content-box;position:relative;width:36px;height:14px;contain:strict}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}:host(.ion-color.toggle-checked) .toggle-icon{background:rgba(var(--ion-color-base-rgb), 0.5)}:host(.ion-color.toggle-checked) .toggle-inner{background:var(--ion-color-base)}.toggle-icon{border-radius:var(--border-radius);display:block;position:relative;width:100%;height:100%;-webkit-transition:background-color 160ms;transition:background-color 160ms;background:var(--background);pointer-events:none}.toggle-inner{left:0;top:-3px;border-radius:var(--handle-border-radius);position:absolute;width:20px;height:20px;-webkit-transition-duration:160ms;transition-duration:160ms;-webkit-transition-property:background-color, -webkit-transform;transition-property:background-color, -webkit-transform;transition-property:transform, background-color;transition-property:transform, background-color, -webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);background:var(--handle-background);-webkit-box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);box-shadow:0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);will-change:transform, background-color;contain:strict}[dir=rtl] .toggle-inner,:host-context([dir=rtl]) .toggle-inner{left:unset;right:unset;right:0}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(16px,  0,  0);transform:translate3d(16px,  0,  0);background:var(--handle-background-checked)}:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner,:host-context([dir=rtl]).toggle-checked .toggle-inner{-webkit-transform:translate3d(calc(-1 * 16px),  0,  0);transform:translate3d(calc(-1 * 16px),  0,  0)}:host(.toggle-disabled){opacity:0.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:16px;padding-right:0;padding-top:12px;padding-bottom:12px;cursor:pointer}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:0;padding-inline-end:0}}:host(.in-item[slot=start]){padding-left:2px;padding-right:18px;padding-top:12px;padding-bottom:12px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:18px;padding-inline-end:18px}}"}},603:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return s}));const i=(t,e)=>null!==e.closest(t),o=t=>"string"==typeof t&&t.length>0?{"ion-color":!0,["ion-color-"+t]:!0}:void 0,r=t=>{const e={};return(t=>{if(void 0!==t){return(Array.isArray(t)?t:t.split(" ")).filter(t=>null!=t).map(t=>t.trim()).filter(t=>""!==t)}return[]})(t).forEach(t=>e[t]=!0),e},a=/^[a-z][a-z0-9+\-.]*:/,s=async(t,e,n)=>{if(null!=t&&"#"!==t[0]&&!a.test(t)){const i=document.querySelector("ion-router");if(i)return null!=e&&e.preventDefault(),i.push(t,n)}return!1}},606:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return i}));const i=()=>{const t=window.TapticEngine;t&&t.selection()},o=()=>{const t=window.TapticEngine;t&&t.gestureSelectionStart()},r=()=>{const t=window.TapticEngine;t&&t.gestureSelectionChanged()},a=()=>{const t=window.TapticEngine;t&&t.gestureSelectionEnd()}}}]);