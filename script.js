(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* Loop 1: vertical ticker, 2.5s */
  var tk=document.getElementById('tk'),n=tk.children.length-1,i=0,H=function(){return tk.children[0].offsetHeight};
  setInterval(function(){
    i++;tk.style.transition='transform .7s cubic-bezier(.22,1,.36,1)';tk.style.transform='translateY('+(-i*H())+'px)';
    if(i===n){setTimeout(function(){tk.style.transition='none';tk.style.transform='translateY(0)';i=0},750)}
  },2500);
  /* Loop 2: hero photo cycle: 0.5s fade in, ~2.5s hold, 0.5s fade out to gradient */
  var bg=[].slice.call(document.querySelectorAll('.hero .bg')),k=0;
  function step(){var el=bg[k];el.classList.add('on');setTimeout(function(){el.classList.remove('on')},3000);k=(k+1)%bg.length}
  step();setInterval(step,3500);
  /* Brand carousel */
  var car=[].slice.call(document.querySelectorAll('#car img')),c=0;
  setInterval(function(){car[c].classList.remove('on');c=(c+1)%car.length;car[c].classList.add('on')},3200);
  /* Bento: randomised bouncy scatter-in (replays on every re-entry) + parting on mouseleave */
  var bento=document.getElementById('bento'),cards=[].slice.call(bento.children),played=false;
  var rnd=function(a,b){return a+Math.random()*(b-a)};
  function scatter(){
    bento.classList.remove('parted');
    cards.forEach(function(el){
      el.style.transition='none';el.classList.add('pre');
      el.style.setProperty('--ex',rnd(-260,260)+'px');el.style.setProperty('--ey',rnd(60,240)+'px');el.style.setProperty('--er',rnd(-16,16)+'deg');
    });
    void bento.offsetWidth;cards.forEach(function(el){el.style.transition=''});
  }
  function play(){
    bento.classList.add('fly');
    cards.forEach(function(el){
      el.style.transitionDelay=Math.round(rnd(0,450))+'ms';
      if(!rm)el.style.transitionDuration=Math.round(rnd(800,1250))+'ms,600ms,350ms';
      el.classList.remove('pre');['--ex','--ey','--er'].forEach(function(p){el.style.removeProperty(p)});
    });
    setTimeout(function(){bento.classList.remove('fly');cards.forEach(function(el){el.style.transitionDelay='';el.style.transitionDuration=''})},1900);
  }
  scatter();
  new IntersectionObserver(function(es){var e=es[0];
    if(e.isIntersecting&&e.intersectionRatio>=.25&&!played){played=true;play()}
    else if(!e.isIntersecting&&played){played=false;scatter()}
  },{threshold:[0,.25]}).observe(bento);
  function nudge(on){
    cards.forEach(function(el){
      el.style.transitionDelay=Math.round(rnd(0,120))+'ms';
      if(!el.classList.contains('c')){if(on)el.style.setProperty('--er',rnd(-7,7)+'deg');else el.style.removeProperty('--er')}
    });
    setTimeout(function(){cards.forEach(function(el){el.style.transitionDelay=''})},700);
  }
  if(matchMedia('(hover:hover) and (min-width:821px)').matches){
    bento.addEventListener('mouseleave',function(){if(played){nudge(true);bento.classList.add('parted')}});
    bento.addEventListener('mouseenter',function(){nudge(false);bento.classList.remove('parted')});
  }

  /* Section 4: staggered reveal */
  var vis=document.getElementById('vision');
  new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();
    [].forEach.call(vis.querySelectorAll('.rv'),function(el,j){setTimeout(function(){el.classList.add('show')},j*350)})},{threshold:.3}).observe(vis);

  /* Section 6: scroll-driven close-up -> layout */
  var fs=document.getElementById('founder'),fin=fs.querySelector('.fsin'),fbg=document.getElementById('fbg'),fc=fs.querySelector('.fcon');
  fbg.src=document.getElementById('fpor').src;
  var sm=function(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
  function fp(){
    if(innerWidth<=820){fc.style.opacity='';fc.style.transform='';return}if(rm)return;
    var r=fs.getBoundingClientRect(),top=parseFloat(getComputedStyle(fin).top)||80,range=r.height-fin.offsetHeight,p=Math.min(1,Math.max(0,(top-r.top)/range));
    var z=sm(0,.6,p);
    fbg.style.transform='scale('+(3.2-2.15*z)+')';
    fbg.style.filter='blur('+(7-3*z)+'px)';
    fbg.style.opacity=(0.9-0.78*sm(.35,.8,p));
    fc.style.opacity=sm(.45,.8,p);fc.style.transform='translateY('+(24*(1-sm(.45,.8,p)))+'px)';
  }
  if(rm){fbg.style.cssText='opacity:.15;transform:none;filter:blur(4px)';fc.style.opacity=1}
  addEventListener('scroll',fp,{passive:true});addEventListener('resize',fp);fp();

  /* Contact form: opens the visitor's email app with the message filled in */
  var cf=document.getElementById('cf');
  cf.addEventListener('submit',function(e){e.preventDefault();var f=new FormData(cf);
    location.href='mailto:nmtheatreresidence26@gmail.com?subject='+encodeURIComponent('Message from '+f.get('n'))+'&body='+encodeURIComponent(f.get('m')+'\n\n'+f.get('n')+' ('+f.get('e')+')');
    document.getElementById('cs').textContent='Opening your email app. If nothing opens, please write to nmtheatreresidence26@gmail.com.'});

  /* Mobile menu */
  var nav=document.querySelector('.nav'),bb=nav.querySelector('.burger');
  function menu(o){nav.classList.toggle('open',o);bb.setAttribute('aria-expanded',o)}
  bb.addEventListener('click',function(e){e.stopPropagation();menu(!nav.classList.contains('open'))});
  [].forEach.call(nav.querySelectorAll('ul a'),function(a){a.addEventListener('click',function(){menu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))menu(false)});
  /* More Info: jump to the contact form with the program pre-filled */
  var fmsg=document.getElementById('fm');
  [].forEach.call(document.querySelectorAll('.pc .more'),function(b){b.addEventListener('click',function(e){
    e.stopPropagation();var hf=b.closest('.pc').dataset.href;if(hf){location.href=hf;return}fmsg.value='Hello, I would like more information about '+b.closest('.pc').dataset.prog+'.';
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});setTimeout(function(){fmsg.focus({preventScroll:true})},700)})});
})();
