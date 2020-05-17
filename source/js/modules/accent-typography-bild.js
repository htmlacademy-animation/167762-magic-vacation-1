 export default class AccentTypographyBuild {
     constructor(elementSelector, timer, classForActivate, property) {
         this._TIME_SPACE = 100;
         this._elementSelector = elementSelector;
         this._timer = timer;
         this._classForActivate = classForActivate;
         this._property = property;
         this._element = document.querySelector('.' + this._elementSelector);
         this._timeOffset = 0;
         
         this.preTransformText();
     }
     preTransformText() {
        const arrWords = this._element.textContent.trim().split(' ').filter((word) => word !== ''); 
        
         const content = arrWords.reduce((nodeParent, word)=>{
             let arrLetterSpan = Array.from(word).reduce((nodeLetter, letter)=>{
                 let letterSpan = document.createElement('span');
                 letterSpan.textContent = letter ;
                 letterSpan.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`; 
                 this._timeOffset += 20; 
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
     
     runAnimation(){
         if(!this._element){
             return;
         }
         this._element.firstElementChild.classList.add(this._classForActivate);
     }
     destroyAnimation(){
         this._element.firstElementChild.classList.remove(this._classForActivate);
     }
 }