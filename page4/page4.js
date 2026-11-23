/* Page 3 (MNFPAC) scripts: mobile menu, scroll reveal, clapperboard tap/keyboard toggle */
(function(){
  document.documentElement.classList.add('js');

  /* Mobile menu */
  var nav=document.querySelector('.nav'),bb=nav.querySelector('.burger');
  function menu(o){nav.classList.toggle('open',o);bb.setAttribute('aria-expanded',o)}
  bb.addEventListener('click',function(e){e.stopPropagation();menu(!nav.classList.contains('open'))});
  [].forEach.call(nav.querySelectorAll('ul a'),function(a){a.addEventListener('click',function(){menu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))menu(false)});

  /* Scroll reveal for every .rise element */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  [].forEach.call(document.querySelectorAll('.rise'),function(el){io.observe(el)});

  /* Clapperboard: hover/focus is pure CSS; touch screens and keyboard toggle with a class */
  var c=document.getElementById('clap');
  if(c){
    c.addEventListener('click',function(){if(!matchMedia('(hover:hover)').matches)c.classList.toggle('on')});
    c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();c.classList.toggle('on')}});
  }
})();
