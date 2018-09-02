
class Portfolio  {

    constructor() {

        this.el = {

            topAnimated: document.getElementById('top-animated'),
            bottomAnimated: document.getElementById('bottom-animated'),
            contentAnimated: document.getElementById('content-animated'),
            menuAnimated: document.getElementById('menu-animated'),
            mainContainer: document.getElementById('main-bg-container'),
            topDistance: 0,
            bottomDistance:0,
            modals: document.querySelectorAll('[modal]'),
            modalTriggers: document.querySelectorAll('[target]'),
            modalCloseTriggers: document.querySelectorAll('[close-modal]'),
            toggleImg: document.querySelectorAll('[toggle-img]')
        }
    }

    calculateDistance() {
      this.el.topDistance = this.el.topAnimated.clientHeight;
      this.el.bottomDistance = this.el.bottomAnimated.clientHeight;

      //set distances of the main cointainer
      this.el.mainContainer.style.paddingTop = this.el.topDistance + 'px';
      this.el.mainContainer.style.marginBottom = this.el.topDistance + 'px';
    }

    setProperDistance() {
      this.calculateDistance();
      window.addEventListener('resize', () => {
        this.calculateDistance();
      })
    }
     
    animationEnter(slideTime, opacityTransitionTime) {
      
      //menu container animation
      this.el.menuAnimated.style.transition = `transform .${slideTime}s`;
      this.el.menuAnimated.style.transform = `translateY(${this.el.bottomDistance}px)`;

      //works svg animation
      this.el.bottomAnimated.style.transition = `transform .${slideTime}s`;
      this.el.bottomAnimated.style.transform = `translateY(${this.el.bottomDistance}px)`;

      //about svg animation
      this.el.topAnimated.style.transition = `transform .${slideTime}s`;
      this.el.topAnimated.style.transform = `translateY(-${this.el.topDistance}px)`;

      //content svg animation
      this.el.contentAnimated.style.transition = `opacity .${opacityTransitionTime}s`;
      this.el.contentAnimated.style.transitionDelay = `.${slideTime}s`;
      this.el.contentAnimated.style.opacity = 1;
      }

    animationLeave(slideTime, opacityTransitionTime) {

      //menu container animation
      this.el.menuAnimated.style.transition = `transform .${slideTime}s`;
      this.el.menuAnimated.style.transitionDelay = `.${opacityTransitionTime}s`;
      this.el.menuAnimated.style.transform = `translateY(0px)`;

      //works svg animation
      this.el.bottomAnimated.style.transition = `transform .${slideTime}s`;
      this.el.bottomAnimated.style.transitionDelay = `.${opacityTransitionTime}s`;
      this.el.bottomAnimated.style.transform = `translateY(0px)`;

      //about svg animation
      this.el.topAnimated.style.transition = `transform .${slideTime}s`;
      this.el.topAnimated.style.transitionDelay = `.${opacityTransitionTime}s`;
      this.el.topAnimated.style.transform = `translateY(0px)`;

      //content svg animation
      this.el.contentAnimated.style.transition = `opacity .${opacityTransitionTime}s`;
      this.el.contentAnimated.style.transitionDelay = `0s`;
      this.el.contentAnimated.style.opacity = 0;
      }

    animation() {
      const slideTime = 3;
      const opacityTransitionTime = 6;

      
      document.addEventListener('DOMContentLoaded', () => {
        this.animationEnter(slideTime, opacityTransitionTime)
      })

      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
          this.animationLeave(slideTime, opacityTransitionTime)
        } else {
          this.animationEnter(slideTime, opacityTransitionTime)
        }
      })

    }

    modalStateOpen() {
      Array.from(this.el.modalTriggers).forEach(trigger => {

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const target = trigger.getAttribute('target');
          const triggerTopDist = trigger.getBoundingClientRect().top;
          const svgTxt = document.querySelector(`[modal="${target}"]`).querySelector('[title-svg]');

          svgTxt.style.transition = 'transform .8s, opacity .1s';
          svgTxt.style.opacity = '0';
          svgTxt.style.transform = `translateY(${triggerTopDist - 80}px)`;

          document.querySelector(`[modal="${target}"]`).classList.add('open');
          
          setTimeout(() => {
            svgTxt.style.opacity = '1';
            svgTxt.style.transform = `translateY(0px)`;
          } , 400)
                    


        })

      })
    }


    modalStateClose() {
      const _that = this;

      Array.from(this.el.modalCloseTriggers).forEach(trigger => {

        trigger.addEventListener('click', function(e) {

          e.preventDefault();

          
          let modalName = this.closest('[modal]').getAttribute('modal');
          let svgTxt = this.closest('[modal]').querySelector('[title-svg]');
          let theTrigger;

          Array.from(_that.el.modalTriggers).forEach(trigger => {
            if (trigger.getAttribute('target') === modalName) {
              theTrigger = trigger;
            }
          })


          svgTxt.style.transition = 'transform .2s, opacity .1s';
          svgTxt.style.transform = `translateY(${theTrigger.getBoundingClientRect().top - 80}px)`;
          setTimeout(() => {
            
              this.closest('[modal]').classList.remove('open');

          }, 200)

     

        })

      })
    }


    modals() {
      this.modalStateOpen();
      this.modalStateClose();

      // Array.from(this.el.modals).forEach(modal => {

      //   modal.addEventListener('scroll', function (e) {

      //     this.querySelector(`[fixed-container]`).style.top = this.scrollTop + 80 + 'px';

      //   })

      // })

    }

    toggleImg() {
      let allImg = Array.from(this.el.toggleImg);

      allImg.forEach(function(img, index) {


        img.addEventListener('click', function() {
          this.classList.add('toggle-img')
          
          allImg.forEach(function(item, i) {
             if(i !== index) {
               item.classList.remove('toggle-img')
             } 

          })
        })
      })
    }

    init() {
      this.setProperDistance();
      this.animation();
      this.modals();
      this.toggleImg()


     }
}


const instance = new Portfolio;
instance.init();

