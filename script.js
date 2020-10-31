import cards from './cards.js';

window.onload = function App() {
  const mainBlock = document.createElement('div');
  mainBlock.classList.add('main');
  document.body.append(mainBlock);

  const header = document.createElement('header');

  const iconMenu = document.createElement('div');
  iconMenu.classList.add('icon-menu');

  let num = 0;

  header.append(iconMenu);
  iconMenu.innerHTML = '<span></span><span></span><span></span>';
  const nav = document.createElement('nav');
  header.append(nav);
  const menu = document.createElement('ul');
  menu.classList.add('menu');
  nav.append(menu);

  const clickHandler = function () {
    if (num === 0) {
      menu.style.transform = 'translateX(250px)';
      iconMenu.classList.add('check');
      num = 1;
    } else {
      menu.style.transform = 'translateX(-250px)';
      iconMenu.classList.remove('check');
      num = 0;
    }
    if (num === 1) {
      document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !iconMenu.contains(event.target)) {
          menu.style.transform = 'translateX(-250px)';
          iconMenu.classList.remove('check');
          num = 0;
        }
      });
    }
  };
  iconMenu.addEventListener('click', clickHandler);
  const content = document.createElement('div');
  content.classList.add('content');

  const clickLink = function () {
    window.location.href = this.href;
    content.innerHTML = '';
    allCards = new AllCards(cards);
    menu.style.transform = 'translateX(-250px)';
    iconMenu.classList.remove('check');
    menu.querySelectorAll('a').forEach((el) => el.classList.remove('active'));
    this.classList.add('active');
    num = 0;
  };

  for (let i = 0; i < 9; i += 1) {
    const link = document.createElement('a');
    link.classList.add('link-menu');
    menu.append(link);
    if (i === 0) {
      link.innerText = 'Main Page';
      link.classList.add('active');
      link.href = '#/';
    } else {
      link.innerText = cards[0][i - 1];
      link.href = `#/cards${i}`;
    }
    link.addEventListener('click', clickLink);
  }

  const switchMenu = document.createElement('div');
  switchMenu.classList.add('switch-menu');
  header.append(switchMenu);
  switchMenu.innerHTML = `<label class="switch">
    <input type="checkbox" id="checkBox">
    <span class="slider"></span>
  </label>`;

  const check = switchMenu.querySelectorAll('input')[0];

  const clickSwitch = function () {
    if (check.checked === false) {
      check.checked = true;
      menu.style.background = 'linear-gradient(40deg,#ffd86f,#fc6262)';
      content.innerHTML = '';
      allCards = new AllCards(cards);
    } else {
      check.checked = false;
      menu.style.background = 'linear-gradient(40deg,#00bf82,#0099ae)';
      content.innerHTML = '';
      allCards = new AllCards(cards);
    }
  };
  switchMenu.addEventListener('click', clickSwitch);

  const stars = document.createElement('div');
  stars.classList.add('stars-block');
  if (stars.classList.contains('stars-content')) {
    stars.classList.remove('stars-content');
  }

  mainBlock.append(header, content);


  class AllCards {
    constructor(value) {
      this.value = value;
      this.createAllCards();
    }

    createAllCards() {
      for (let i = 0; i < 8; i += 1) {
        if (check.checked === false) {
          const clickCard = function () {
            window.location.href = this.href;
            content.innerHTML = '';
            allCards = new AllCards(cards);
            menu.querySelectorAll('a').forEach((el) => el.classList.remove('active'));
            menu.querySelectorAll('a').forEach((item) => {
              if (document.location.href === item.href) {
                item.classList.add('active');
              }
            });
          };
          let n = 0;
          const clickRotate = function () {
            n = 1;
          };
          const clickWord = function () {
            if (n === 1) {
              this.style.transform = 'rotateY(180deg)';
              this.addEventListener('mouseout', (event) => {
                this.style.transform = 'rotateY(0deg)';
              });
            } else {
              const audio = new Audio();
              audio.src = `audio/${this.textContent.match(/[a-z]/g).join('')}.mp3`;
              audio.autoplay = true;
            }

            n = 0;
          };
          if (document.location.hash === '' || document.location.hash === '#/') {
            const card = document.createElement('a');
            card.href = `#/cards${i + 1}`;
            card.classList.add('card');
            card.innerText = this.value[0][i];
            const img = document.createElement('img');
            img.src = `${this.value[i + 1][0].image}`;
            card.prepend(img);
            stars.innerHTML = '';
            content.prepend(stars);
            content.append(card);
            card.addEventListener('click', clickCard);
          } else {
            const cardCont = document.createElement('div');
            cardCont.classList.add('card-container');
            const card = document.createElement('div');
            card.classList.add('card-word');
            const front = document.createElement('div');
            const back = document.createElement('div');
            front.classList.add('front');
            back.classList.add('back');
            front.style.background = `url('${this.value[document.location.hash.slice(-1)][i].image}') no-repeat`;
            back.style.background = `url('${this.value[document.location.hash.slice(-1)][i].image}') no-repeat`;
            card.append(front);
            card.append(back);
            const { word } = this.value[document.location.hash.slice(-1)][i];
            const { translation } = this.value[document.location.hash.slice(-1)][i];
            const pWord = document.createElement('p');
            const pTrans = document.createElement('p');
            pWord.append(word);
            pTrans.append(translation);
            front.append(pWord);
            back.append(pTrans);
            const rotate = document.createElement('div');
            rotate.classList.add('rotate');
            rotate.addEventListener('click', clickRotate);
            card.append(rotate);
            stars.innerHTML = '';
            content.prepend(stars);
            cardCont.append(card);
            content.append(cardCont);
            card.addEventListener('click', clickWord);
          }
        } else {
          const clickCard = function () {
            window.location.href = this.href;
            content.innerHTML = '';
            allCards = new AllCards(cards);
            menu.querySelectorAll('a').forEach((el) => el.classList.remove('active'));
            menu.querySelectorAll('a').forEach((item) => {
              if (document.location.href === item.href) {
                item.classList.add('active');
              }
            });
          };
          if (document.location.hash === '' || document.location.hash === '#/') {
            const card = document.createElement('a');
            card.href = `#/cards${i + 1}`;
            card.classList.add('card');
            card.style.background = 'linear-gradient(180deg,#fd6a63,#feb46b 40%,#fff 0,#fff)';
            card.innerText = this.value[0][i];
            const img = document.createElement('img');
            img.src = `${this.value[i + 1][0].image}`;
            card.prepend(img);
            stars.innerHTML = '';
            content.prepend(stars);
            content.append(card);
            card.addEventListener('click', clickCard);
          } else {
            const cardCont = document.createElement('div');
            cardCont.classList.add('card-container');
            const card = document.createElement('div');
            card.classList.add('card-word');
            const front = document.createElement('div');
            front.classList.add('front-game');
            front.style.background = `url('${this.value[document.location.hash.slice(-1)][i].image}') no-repeat`;
            const { word } = this.value[document.location.hash.slice(-1)][i];
            front.append(word);
            card.append(front);
            stars.innerHTML = '';
            content.prepend(stars);
            cardCont.append(card);
            content.append(cardCont);
          }
        }
      }

      if (check.checked === true && document.location.hash.slice(-1) !== '/') {
        const buttonGame = document.createElement('div');
        buttonGame.classList.add('button-game');
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = 'Start game';
        buttonGame.append(btn);
        content.append(buttonGame);


        const arrayAudioWords = cards[document.location.hash.slice(-1)].map((item) => item.audioSrc);
        let random = Math.round(0 - 0.5 + Math.random() * (arrayAudioWords.length - 1 - 0 + 1));
        const cardGame = document.getElementsByClassName('front-game');


        let countWord = 0;
        let errors = 0;
        const starErr = document.createElement('div');
        starErr.classList.add('star-err');

        const cardGameClick = function () {
          if (this.innerText === cardGame[random].innerText) {
            cardGame[random].classList.add('inactive');
            cardGame[random].innerText = 'inactive';
            arrayAudioWords[random] = 0;
            random = Math.round(0 - 0.5 + Math.random() * (arrayAudioWords.length - 1 - 0 + 1));

            while (arrayAudioWords[random] === 0 && countWord !== 7) {
              random = Math.round(0 - 0.5 + Math.random() * (arrayAudioWords.length - 1 - 0 + 1));
            }

            countWord += 1;
            stars.insertAdjacentHTML('beforeEnd', "<div class='star-suc'></div>");
            const audioOne = new Audio();
            audioOne.src = 'audio/correct.mp3';
            audioOne.autoplay = true;

            if (countWord === 8) {
              const onMainPage = function () {
                const adress = menu.querySelectorAll('a');
                window.location.href = adress[0].href.slice(0, adress[0].href.length - 2);
              };
              if (errors === 0) {
                content.innerHTML = "<img src='img/success.jpg' alt='success'>";
                content.prepend(stars);
                stars.classList.add('stars-content');
                stars.innerText = 'Win!';
                audioOne.src = 'audio/success.mp3';
                audioOne.autoplay = true;
                setTimeout(onMainPage, 2500);
              } else {
                content.innerHTML = "<img src='img/failure.jpg' alt='success'>";
                content.prepend(stars);
                stars.classList.add('stars-content');
                stars.innerText = `${errors} errors`;
                audioOne.src = 'audio/failure.mp3';
                audioOne.autoplay = true;
                setTimeout(onMainPage, 2500);
              }
            }


            const timeAudio = function () {
              const audio = new Audio();
              audio.src = `${arrayAudioWords[random]}`;
              audio.autoplay = true;
            };

            setTimeout(timeAudio, 1000);
          } else if (this.innerText === 'inactive') {

          } else {
            const audio = new Audio();
            audio.src = 'audio/error.mp3';
            audio.autoplay = true;
            errors += 1;
            stars.insertAdjacentHTML('beforeEnd', "<div class='star-err'></div>");
          }
        };
        const btnClick = function () {
          btn.classList.add('btn-game');
          const audio = new Audio();
          audio.src = `${arrayAudioWords[random]}`;
          audio.autoplay = true;
          for (let i = 0; i < cardGame.length; i += 1) {
            cardGame[i].addEventListener('click', cardGameClick);
          }
        };
        btn.addEventListener('click', btnClick);
      }
    }
  }

  let allCards = new AllCards(cards);
};
