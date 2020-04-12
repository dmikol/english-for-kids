import cards from './cards.js';

window.onload = () => {
    const mainBlock = document.createElement('div');
    mainBlock.classList.add('main');
    document.body.append(mainBlock);

    const header = document.createElement('header');

    const iconMenu = document.createElement('div');
    iconMenu.classList.add('icon-menu');
    iconMenu.addEventListener('click', clickHandler);
    let num = 0;
    function clickHandler(){
        if(num == 0){
            menu.style.transform = "translateX(250px)";
            iconMenu.classList.add('check');
            num = 1;
        }else{
            menu.style.transform = "translateX(-250px)";
            iconMenu.classList.remove('check');
            num = 0;
        }
    }
    header.append(iconMenu);
    const span = document.createElement('span');
    iconMenu.innerHTML = "<span></span><span></span><span></span>";
    const nav = document.createElement('nav');
    header.append(nav);
    const menu = document.createElement('ul');
    menu.classList.add('menu');
    nav.append(menu);
    
    for(let i = 0; i < 9; i++){
        const link = document.createElement('a');
        link.classList.add('link-menu'); 
        menu.append(link);
        if(i == 0){
            link.innerText = "Main Page";
            link.classList.add('active');
            link.href = "#/";
        }else{
            link.innerText = cards[0][i-1];
            link.href = "#/cards"
        }   
    }

    const switchMenu = document.createElement('div');
    switchMenu.classList.add('switch-menu');
    header.append(switchMenu);
    switchMenu.innerHTML = `<label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>`


    const content = document.createElement('div');
    content.classList.add('content');

    mainBlock.append(header, content);
    class AllCards {
        constructor(value) {
            this.value = value;
            this.createAllCards();
        }
    
        createAllCards(){
            for(let i = 0; i < 8; i++){
                let card = document.createElement('a');
                card.classList.add('card');
                card.innerText = this.value[0][i];

                let img = document.createElement('img');
                img.src = `${this.value[i+1][i].image}`;
                card.prepend(img);
                
                content.append(card);
            }
        }
    }

    let allCards = new AllCards(cards);
}



