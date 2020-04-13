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
            link.href = `#/cards${i}`;
        }   
        link.addEventListener('click', clickLink);
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
                
                if(document.location.hash == "" || document.location.hash == "#/"){
                    let card = document.createElement('a');
                    card.href = `#/cards${i+1}`;
                    card.classList.add('card');
                    card.innerText = this.value[0][i];
                    let img = document.createElement('img');
                    img.src = `${this.value[i+1][0].image}`;
                    card.prepend(img);
                    content.append(card);
                    card.addEventListener('click', clickCard);
                }else{
                    let cardCont = document.createElement('div');
                    cardCont.classList.add('card-container');
                    let card = document.createElement('div');
                    card.classList.add('card-word');
                    let front = document.createElement('div');
                    let back = document.createElement('div');
                    front.classList.add('front');
                    back.classList.add('back');
                    front.style.background = `url('${this.value[document.location.hash.slice(-1)][i].image}') no-repeat`;
                    back.style.background = `url('${this.value[document.location.hash.slice(-1)][i].image}') no-repeat`;
                    card.append(front);
                    card.append(back);
                    let word = this.value[document.location.hash.slice(-1)][i].word;
                    let translation = this.value[document.location.hash.slice(-1)][i].translation;
                    let pWord = document.createElement('p');
                    let pTrans = document.createElement('p');
                    pWord.append(word);
                    pTrans.append(translation);
                    front.append(pWord);
                    back.append(pTrans);
                    let rotate = document.createElement('div');
                    rotate.classList.add('rotate');
                    rotate.addEventListener('click', clickRotate);
                    card.append(rotate);
                    cardCont.append(card);
                    content.append(cardCont);
                    card.addEventListener('click', clickWord);
                   
                }

                function clickCard(){
                    window.location.href = this.href;
                    content.innerHTML = "";
                    allCards = new AllCards(cards);  
                    menu.querySelectorAll('a').forEach(el => el.classList.remove('active'));
                    menu.querySelectorAll('a').forEach(function(item){
                    if(document.location.href === item.href){
                        item.classList.add('active');
                    }  
                    });
                    
                }
                let n = 0;
                function clickRotate(){
                    n = 1;
                }
                function clickWord(){
                    if(n == 1){
                        this.style.transform = 'rotateY(180deg)';  
                        this.addEventListener('mouseout', (event) => {
                            this.style.transform = 'rotateY(0deg)';
                          });                    
                    }else{
                        let audio = new Audio();
                        audio.src = `audio/${this.textContent.match(/[a-z]/g).join('')}.mp3`;
                        audio.autoplay = true;
                    }

                    n = 0;
                }
            }
        }
    }

    let allCards = new AllCards(cards);

    function clickLink(){
        window.location.href = this.href;
        content.innerHTML = "";
        allCards = new AllCards(cards); 
        menu.style.transform = "translateX(-250px)";
        iconMenu.classList.remove('check');
        menu.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        num = 0;   
    }
    
  
}



