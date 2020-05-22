 export default class AccentTypographyBuild {
     constructor(elementSelector, timer, classForActivate, property) {
         this._TIME_SPACE = 100;
         this._elementSelector = elementSelector;
         this._timer = timer;
         this._classForActivate = classForActivate;
         this._property = property;
         this._element = document.querySelector('.' + this._elementSelector);
         this._timeOffset = 0;
         this.queueLetter = 1;
         this.step = 50;

         this.preTransformText();
     }
     preTransformText() {
         const arrWords = this._element.textContent.trim().split(' ').filter((word) => word !== '');

         const content = arrWords.reduce((nodeParent, word) => {
             let arrLetterSpan = Array.from(word).reduce((nodeLetter, letter) => {
                 let letterSpan = document.createElement('span');
                 letterSpan.textContent = letter;  

                 if (this.queueLetter === 1) {
                     this._timeOffset += this.step;
                 } else {
                     if (this.queueLetter % 2 === 0) {
                         if (this.queueLetter === 6) {
                             this._timeOffset -= this.step;
                             this.queueLetter = 1;
                         } else {
                             this._timeOffset += this.step * 2;
                         }
                     } else if (this.queueLetter === 5) {
                         this._timeOffset += this.step * 2;
                     } else {
                         this._timeOffset -= this.step;
                     }
                 }
                 console.log("this.queueLetter " + this.queueLetter);
                 console.log("this._timeOffset " + this._timeOffset);

                 this.queueLetter += 1;
                 
                 letterSpan.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
                 nodeLetter.appendChild(letterSpan);
                 return nodeLetter;
             }, document.createDocumentFragment());

             let wordSpan = document.createElement('span');
             wordSpan.classList.add('flying-text');
             wordSpan.appendChild(arrLetterSpan)
             nodeParent.appendChild(wordSpan);
             return nodeParent;
         }, document.createDocumentFragment());

         this._element.innerHTML = ' ';
         this._element.appendChild(content);

     }

     runAnimation() {
         if (!this._element) {
             return;
         }
         this._element.classList.add(this._classForActivate);
     }
     destroyAnimation() {
         this._element.classList.remove(this._classForActivate);
     }
 }
