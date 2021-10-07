window.onload = () => {
  setBg();
  getPicsPositionRight();

  document.addEventListener("click", function(e){
    if(e.target === document.getElementById("menu-items")){
      const el = document.querySelectorAll("#menu ul li");
      const d = window.getComputedStyle(el[0]).getPropertyValue("visibility");
      if(d == 'hidden'){
        setTimeout(function(){
          Array.from(el).forEach(e => {
            e.style.visibility = 'visible';
          })
        }, 100);
      }else{
        Array.from(el).forEach(e => {
          e.style.visibility = 'hidden';
        })
      }
    }
  });
};

window.onresize = () => {
  setBg();
  getPicsPositionRight();
};

window.onscroll = () => {
  const s = window.scrollY;
  const i = document.getElementsByClassName('fa-bars')[0];

  if(s >= 300){
    i.style.color = "black";
  }else{
    i.style.color = "white";
  }
}

const setBg = () => {
  const w = window.screen.width;
  document.getElementById("menu-items").disabled = w >= 900;
};

const getPicsPositionRight = () => {
  if(!document.querySelector('meta[name="pagename"]')){
    return;
  }

  if(document.querySelector('meta[name="pagename"]').content != 'wishlist'){
    return;
  }

  if(window.screen.width >= 900){
    return;
  }

  const wrappers = document.getElementsByClassName('pic-wrapper');

  Array.from(wrappers).forEach(wrapper => {
    wrapper.parentElement.querySelector('.info').before(wrapper);
  });
}

const sendWppMessage = input => {
  if(!input.value){
    input.style.borderColor = 'red';

    const warning = document.createElement('small')
    warning.innerText = "* Preencha o campo."
    warning.id = 'warning';
    warning.style.cssText = 'display: block; margin: 8px 0; text-align: left; color: red; font-style: italic; transition: all .5s;'

    if(!document.getElementById('warning')){
      input.after(warning)
    }

    setTimeout(() => {
      input.style.borderColor = '#84824a';
      warning.style.opacity = 0;
    }, 2000);

    setTimeout(() => {
      warning.remove();
    }, 2750);

    return;
  }

  const name = input.value;
  
  const text = window.encodeURIComponent(`Olá, noivos ❤ \nEstou confirmando a minha presença no casamento mais lindo do século! \nMeu nome de convidado: ${name}`);

  const url = `https://api.whatsapp.com/send?phone=5512997658181&text=${text}`;

  window.open(url);

  setTimeout(() => {
    document.getElementById('thanks-wrapper').style.display = 'block';
    document.getElementById('thanks-wrapper').style.opacity = 1;
  }, 1000);
}

const openModal = (event, target) => {
  event.preventDefault();
  
  const modal = document.getElementById(target);

  modal.addEventListener('click', function(e){
    if(e.target == modal){
      closeModal(modal);
    }
  });

  modal.style.display = 'flex';
  setTimeout(function() {
    modal.style.opacity = 1;
    modal.querySelector('.modal-content').style.margin = 0;
  }, 100);

  modal.querySelector('.modal-header span').addEventListener('click', function(){
    closeModal(modal);
  });

  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closeModal(modal);
    }
  });
}

const closeModal = modal => {
  modal.style.opacity = 0;
  modal.querySelector('.modal-content').style.marginTop = '-100px';
  
  setTimeout(function() {
    modal.style.display = 'none';
  }, 100);
}