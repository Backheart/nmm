(function(){
  document.documentElement.classList.add('js');

  /* Mobile menu */
  var nav=document.querySelector('.nav'),bb=nav.querySelector('.burger');
  function menu(o){nav.classList.toggle('open',o);bb.setAttribute('aria-expanded',o)}
  bb.addEventListener('click',function(e){e.stopPropagation();menu(!nav.classList.contains('open'))});
  [].forEach.call(nav.querySelectorAll('ul a'),function(a){a.addEventListener('click',function(){menu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
  document.addEventListener('click',function(e){if(!nav.contains(e.target))menu(false)});

  /* Scroll reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  [].forEach.call(document.querySelectorAll('.rise'),function(el){io.observe(el)});

  /* Filmstrip: strips part outward when scrolled into view or hovered, close on mouse-leave */
  var st=document.getElementById('strips');
  new IntersectionObserver(function(es,o){if(es[0].isIntersecting){st.classList.add('open');o.disconnect()}},{threshold:.6}).observe(st);
  st.addEventListener('mouseenter',function(){st.classList.add('open')});
  st.addEventListener('mouseleave',function(){st.classList.remove('open')});
})();
