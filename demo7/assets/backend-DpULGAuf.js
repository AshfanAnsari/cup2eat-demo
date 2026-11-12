const T="c2e_db_v1",w="c2e_session_v1",E=["Placed","Packed","Shipped","Delivered"],Y="cup2eat";function J(){return{seq:1024,stock:{choc:12e3,vanilla:9e3,elaichi:6e3},orders:[],customers:[]}}function I(a){localStorage.setItem(T,JSON.stringify(a))}function m(){try{const c=JSON.parse(localStorage.getItem(T));if(c&&Array.isArray(c.orders))return c}catch{}const a=J();return I(a),a}function W(a,c){const o=m();o.seq+=1;const k={id:"C2E-"+o.seq,inv:"C2E/INV/"+o.seq,customer:a,boxes:c,total:c.length*3999,status:0,placedAt:Date.now(),history:[{s:0,at:Date.now()}]};return c.forEach(v=>{o.stock.choc-=v.choc,o.stock.vanilla-=v.vanilla,o.stock.elaichi-=v.elaichi}),o.orders.unshift(k),o.customers.find(v=>v.contact===a.contact)||o.customers.push({name:a.name,contact:a.contact}),I(o),k}function x(a){return a&&m().orders.find(c=>c.id===a.trim().toUpperCase())||null}function X(a){const c=m(),o=c.orders.find(k=>k.id===a);return o&&o.status<E.length-1&&(o.status+=1,o.history.push({s:o.status,at:Date.now()}),I(c)),o}function G(){return m().orders}function K(){return m().stock}function U(){const a=m();return{orders:a.orders.length,revenue:a.orders.reduce((c,o)=>c+o.total,0),boxes:a.orders.reduce((c,o)=>c+o.boxes.length,0),customers:a.customers.length}}function z(){localStorage.removeItem(T),localStorage.removeItem(w),m()}function g(){try{return JSON.parse(localStorage.getItem(w))}catch{return null}}function Q(a,c){const o={name:a,contact:c};return localStorage.setItem(w,JSON.stringify(o)),o}function Z(){localStorage.removeItem(w)}function tt(){const a=g();return a?m().orders.filter(c=>c.customer.contact===a.contact):[]}function et(a){const{boxes:c,cartTotal:o,renderCart:k,closeDrawer:v,showToast:l,inr:h,BOX_PRICE:C}=a,e=t=>document.getElementById(t),y=t=>new Date(t).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});function _(t){const s=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],n=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],i=u=>u<20?s[u]:n[Math.floor(u/10)]+(u%10?" "+s[u%10]:""),r=u=>(Math.floor(u/100)?s[Math.floor(u/100)]+" Hundred"+(u%100?" ":""):"")+(u%100?i(u%100):"");if(t===0)return"Zero";let d="";const b=Math.floor(t/1e7),H=Math.floor(t%1e7/1e5),j=Math.floor(t%1e5/1e3),F=t%1e3;return b&&(d+=i(b)+" Crore "),H&&(d+=i(H)+" Lakh "),j&&(d+=i(j)+" Thousand "),F&&(d+=r(F)),d.trim()}function p(t){document.querySelectorAll(".screen").forEach(s=>{s.hidden=s.id!==t}),document.body.style.overflow="hidden"}function L(){document.querySelectorAll(".screen").forEach(t=>{t.hidden=!0}),document.body.style.overflow=""}document.querySelectorAll(".screen [data-close]").forEach(t=>t.addEventListener("click",L)),document.addEventListener("keydown",t=>{t.key==="Escape"&&L()});const O=e("acct-btn");function S(){const t=g();O.textContent=t?t.name.split(" ")[0]:"Login"}O.addEventListener("click",()=>{g()?(V(),p("screen-orders")):p("screen-login")}),S();let $="phone",A=!1;document.querySelectorAll("#screen-login .tab").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll("#screen-login .tab").forEach(n=>n.classList.toggle("active",n===t)),$=t.dataset.tab;const s=e("contact-input");$==="phone"?(e("contact-label").textContent="Mobile number",e("contact-prefix").textContent="+91",e("contact-prefix").style.display="",s.placeholder="98765 43210",s.inputMode="numeric",s.autocomplete="tel"):(e("contact-label").textContent="Email address",e("contact-prefix").style.display="none",s.placeholder="you@cafe.com",s.inputMode="email",s.autocomplete="email")})),e("send-otp").addEventListener("click",()=>{const t=e("contact-input").value.trim();if(!($==="phone"?t.replace(/\D/g,"").length>=10:/.+@.+\..+/.test(t))){l($==="phone"?"Enter a 10-digit mobile number.":"Enter a valid email address.");return}e("otp-sent-to").textContent=`Enter the 4-digit code sent to ${$==="phone"?"+91 "+t:t} — dummy, so any 4 digits work.`,e("login-step-1").hidden=!0,e("login-step-2").hidden=!1,document.querySelector(".otp-box").focus()}),document.querySelectorAll(".otp-box").forEach((t,s,n)=>t.addEventListener("input",()=>{t.value=t.value.replace(/\D/g,"").slice(0,1),t.value&&s<n.length-1&&n[s+1].focus()})),e("otp-back").addEventListener("click",()=>{e("login-step-1").hidden=!1,e("login-step-2").hidden=!0}),e("verify-otp").addEventListener("click",()=>{const t=[...document.querySelectorAll(".otp-box")].map(r=>r.value).join(""),s=e("name-input").value.trim();if(t.length<4){l("Enter the 4-digit code — any digits work, it is a dummy.");return}if(!s){l("Add your name so Cup2Eat knows the order.");return}const n=e("contact-input").value.trim(),i=$==="phone"?"+91 "+n.replace(/\D/g,""):n;Q(s,i),S(),l(`Logged in as ${s}.`),A?(A=!1,N()):L()});function q(t,s){return`<div class="mini-line"><span>Box ${s+1} — 396 cups · Choc ${t.choc} / Vanilla ${t.vanilla} / Elaichi ${t.elaichi}</span><strong>${h(C)}</strong></div>`}function N(){if(!c.length){l("Your cart is empty — mix a box first.");return}v(),e("checkout-main").hidden=!1,e("checkout-success").hidden=!0,e("checkout-lines").innerHTML=c.map(q).join(""),e("checkout-total").textContent=h(o());const t=g();t&&(e("co-name").value||(e("co-name").value=t.name),!e("co-phone").value&&t.contact.startsWith("+91")&&(e("co-phone").value=t.contact.replace("+91 ",""))),p("screen-checkout")}e("checkout-btn").addEventListener("click",()=>{if(!c.length){l("Your cart is empty — mix a box first.");return}if(!g()){A=!0,v(),p("screen-login"),l("Log in first — dummy login, any OTP works.");return}N()});let f=null;e("pay-btn").addEventListener("click",()=>{const t=e("co-name").value.trim(),s=e("co-phone").value.trim(),n=e("co-address").value.trim();if(!t||s.replace(/\D/g,"").length<10||!n){l("Fill name, a 10-digit phone and the delivery address.");return}const i=e("pay-btn");i.disabled=!0,i.textContent="Processing dummy payment…",setTimeout(()=>{i.disabled=!1,i.textContent="Pay · dummy";const r=g();f=W({name:t,contact:r?r.contact:"+91 "+s.replace(/\D/g,""),phone:"+91 "+s.replace(/\D/g,""),address:n},c.map(d=>({...d}))),c.length=0,k(),e("success-order-id").textContent=f.id,e("checkout-main").hidden=!0,e("checkout-success").hidden=!1},1300)}),e("success-track").addEventListener("click",()=>{f&&(e("track-input").value=f.id,p("screen-track"),M(f))}),e("success-invoice").addEventListener("click",()=>{f&&P(f)});function R(t){return`<div class="stepper-track">${E.map((s,n)=>`
    <div class="tstep ${n<t.status?"done":""} ${n===t.status?"current":""}">
      <span class="tdot">${n<t.status||t.status===3&&n===3?"✓":""}</span>
      <span class="tlabel">${s}</span>
    </div>`).join("")}</div>`}function M(t){const s=e("track-result");if(!t){s.innerHTML='<p class="track-msg">No order with that ID in the dummy data. Check the ID, or place a dummy order first.</p>';return}const n=t.status===3?`Delivered on ${y(t.history[t.history.length-1].at)}`:`Expected by ${y(t.placedAt+3*864e5)}`;s.innerHTML=`
    <div class="track-card">
      <div class="track-meta"><strong>${t.id}</strong><span>${t.boxes.length} box${t.boxes.length>1?"es":""} · ${h(t.total)}</span></div>
      ${R(t)}
      <p class="track-eta">Placed ${y(t.placedAt)} · ${n}</p>
      <div class="mini-lines">${t.boxes.map(q).join("")}</div>
      <button class="ghost-btn" data-invoice="${t.id}">View invoice</button>
    </div>`,B(s)}e("track-go").addEventListener("click",()=>M(x(e("track-input").value))),e("track-pill").addEventListener("click",()=>p("screen-track"));function V(){const t=g();e("orders-eyebrow").textContent=t?`${t.name} · ${t.contact}`:"Your account";const s=tt();e("orders-list").innerHTML=s.length?s.map(n=>`
    <div class="order-row">
      <div>
        <div class="or-main">${n.id} · ${n.boxes.length} box${n.boxes.length>1?"es":""} · ${h(n.total)}</div>
        <div class="or-sub">Placed ${y(n.placedAt)} — ${n.boxes.map(i=>`Choc ${i.choc}/Van ${i.vanilla}/Ela ${i.elaichi}`).join(" · ")}</div>
      </div>
      <span class="chip chip-${n.status}">${E[n.status]}</span>
      <div class="or-actions">
        <button class="small-btn" data-track="${n.id}">Track</button>
        <button class="small-btn" data-invoice="${n.id}">Invoice</button>
      </div>
    </div>`).join(""):'<p class="track-msg">No orders yet in this dummy account. Mix a box and check out to see one here.</p>',B(e("orders-list")),e("orders-list").querySelectorAll("[data-track]").forEach(n=>n.addEventListener("click",()=>{e("track-input").value=n.dataset.track,p("screen-track"),M(x(n.dataset.track))}))}e("logout-btn").addEventListener("click",()=>{Z(),S(),L(),l("Logged out.")});function P(t){const s=t.boxes.map((n,i)=>`
    <tr><td>Box ${i+1} — Edible cups 100 ml, mixed box of 396<br /><small>Chocolate ${n.choc} · Vanilla ${n.vanilla} · Elaichi ${n.elaichi}</small></td>
    <td>1 box</td><td>${h(C)}</td><td>${h(C)}</td></tr>`).join("");e("invoice-sheet").innerHTML=`
    <div class="inv-paper">
      <div class="inv-head">
        <div class="inv-brand">cup2eat</div>
        <div class="inv-tag">Eat Your Drink · Ghaziabad</div>
        <span class="inv-sample">SAMPLE — DUMMY</span>
      </div>
      <div class="inv-meta">
        <span>Invoice <strong>${t.inv}</strong></span>
        <span>Date <strong>${y(t.placedAt)}</strong></span>
        <span>Order <strong>${t.id}</strong></span>
      </div>
      <div class="inv-bill">
        <p class="inv-h">Billed to</p>
        <p><strong>${t.customer.name}</strong><br />${t.customer.address||""}<br />${t.customer.phone||t.customer.contact}</p>
      </div>
      <table class="inv-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
        <tbody>${s}</tbody>
        <tfoot>
          <tr><td colspan="3">Delivery</td><td>Included</td></tr>
          <tr class="inv-total"><td colspan="3">Total</td><td>${h(t.total)}</td></tr>
        </tfoot>
      </table>
      <p class="inv-words">Amount in words: <strong>Rupees ${_(t.total)} only</strong></p>
      <p class="inv-thanks">thank you — now eat the cup!</p>
      <p class="inv-foot">Cup2Eat · FSSAI Licensed · Dummy invoice from the demo backend — not a real tax document.</p>
    </div>`,p("screen-invoice")}function B(t){t.querySelectorAll("[data-invoice]").forEach(s=>s.addEventListener("click",()=>{const n=x(s.dataset.invoice);n&&P(n)}))}e("print-invoice").addEventListener("click",()=>window.print()),e("goto-admin").addEventListener("click",()=>p("screen-admin")),e("goto-track").addEventListener("click",()=>p("screen-track"));function D(){const t=U();e("admin-stats").innerHTML=`
    <div class="stat"><strong>${t.orders}</strong><span>Orders</span></div>
    <div class="stat"><strong>${h(t.revenue)}</strong><span>Revenue (dummy)</span></div>
    <div class="stat"><strong>${t.boxes}</strong><span>Boxes sold</span></div>
    <div class="stat"><strong>${t.customers}</strong><span>Customers</span></div>`;const s=G();e("admin-orders").innerHTML=s.length?s.map(r=>`
    <div class="order-row">
      <div>
        <div class="or-main">${r.id} · ${r.customer.name} · ${h(r.total)}</div>
        <div class="or-sub">${y(r.placedAt)} — ${r.boxes.map(d=>`Choc ${d.choc}/Van ${d.vanilla}/Ela ${d.elaichi}`).join(" · ")}</div>
      </div>
      <span class="chip chip-${r.status}">${E[r.status]}</span>
      <div class="or-actions">
        ${r.status<3?`<button class="small-btn" data-advance="${r.id}">Mark ${E[r.status+1]} →</button>`:'<span class="or-sub">Complete</span>'}
      </div>
    </div>`).join(""):'<p class="track-msg">No orders in the dummy data yet. Place one as a customer and it lands here.</p>',e("admin-orders").querySelectorAll("[data-advance]").forEach(r=>r.addEventListener("click",()=>{X(r.dataset.advance),D(),l(`${r.dataset.advance} moved to ${E[x(r.dataset.advance).status]}.`)}));const n=K(),i=(r,d,b)=>`
    <div class="stock-row"><span><i class="dot" style="background:${b}"></i>${r}</span>
    <span class="stock-bar"><span style="width:${Math.max(0,Math.min(100,d/120))}%;background:${b}"></span></span><strong>${d.toLocaleString("en-IN")}</strong></div>`;e("admin-stock").innerHTML=i("Chocolate",n.choc,"var(--choc)")+i("Vanilla",n.vanilla,"var(--vanilla)")+i("Elaichi",n.elaichi,"var(--elaichi)")}e("admin-go").addEventListener("click",()=>{if(e("admin-pass").value!==Y){l("Wrong password — the dummy password is printed under the button.");return}e("admin-login").hidden=!0,e("admin-dash").hidden=!1,D()}),e("admin-logout").addEventListener("click",()=>{e("admin-pass").value="",e("admin-login").hidden=!1,e("admin-dash").hidden=!0}),e("admin-reset").addEventListener("click",()=>{z(),S(),D(),l("Demo data reset — fresh dummy database.")})}export{et as initBackend};
