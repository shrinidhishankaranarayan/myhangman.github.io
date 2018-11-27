import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-hangman';
  private imageSourcesList=[
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Hangman-0.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/30/Hangman-1.png',
    'https://upload.wikimedia.org/wikipedia/commons/7/70/Hangman-2.png',
    'https://upload.wikimedia.org/wikipedia/commons/9/97/Hangman-3.png',
    'https://upload.wikimedia.org/wikipedia/commons/2/27/Hangman-4.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6b/Hangman-5.png',
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Hangman-6.png'

  ]
  private imageSource =this.imageSourcesList[0];
  guesses=[
    {name:"Rambo",
    type:"Movie"},
    {
      name:"Ferrari",
      type:"Car"
    },
    {
      name:"Ankitha",
      type:"Girls Name"
    }
  ];
  //To be added in object
  private randomWord;
  private dummContent:any=[];
  private nameFromList;
  private typeFromList;
  private inputText;
  private nameStringArray;
  private count=0;
  private gameOver:boolean=false;
  private gameWon : boolean=false;
  choice;
  private missedList=[];
  private missedString='';
  private displaySameCharmsg=false;
  private provideChar=false;

  ngOnInit(){
    this.initialize()
  }
 
  initialize(){

    this.randomWord =this.guesses[Math.floor(Math.random()*this.guesses.length)];
    for(let i=0;i<this.randomWord.name.length;i++){
      this.dummContent.push("-");
    }
    this.nameFromList=this.randomWord.name;
    this.typeFromList=this.randomWord.type;
    this.nameStringArray=this.randomWord.name.split('');

  }
  
  displayGuesses(){

    if(this.choice){
      this.provideChar=false;
      if((this.nameStringArray.includes(this.choice) || this.nameStringArray.includes(this.choice.toUpperCase()))&&
    !this.dummContent.includes(this.choice.toUpperCase())){
        console.log(this.choice);
        this.displaySameCharmsg=false;
        for(let i=0;i<this.nameStringArray.length;i++){
          
          if(this.choice === this.nameStringArray[i] ||this.choice.toUpperCase()===this.nameStringArray[i]){
            this.nameStringArray.splice(i,1,'-');
            if(this.choice === this.nameStringArray[i]){
              this.dummContent.splice(i,1,this.choice);
            }else{
              this.dummContent.splice(i,1,this.choice.toUpperCase());
            }
            
          }
          
    
        }
        this.choice='';
  
        if(! (this.dummContent.includes('-'))){
          this.gameOver=true;
          this.gameWon=true;
        }
        
        
        
      }


    else{
      if(this.dummContent.includes(this.choice.toUpperCase()) || this.missedList.includes(this.choice)){
        console.log('Character already guessed');
        this.displaySameCharmsg=true;
      }
      else{
        if(this.count<5){
          this.count+=1;
          this.imageSource=this.imageSourcesList[this.count];
          if(!this.missedList.includes(this.choice)){
            this.missedList.push(this.choice);
            this.displaySameCharmsg=false;
          }else{
            this.displaySameCharmsg=true;
            console.log('User Previously guessed the same wrong choice');
          }
          
          
        }else{
          this.imageSource=this.imageSourcesList[this.count+1];
          this.gameOver=true;
        }


      }
     
      this.choice='';
      this.missedString='';
      this.missedList.forEach((element,index) => {
        if(element!==''){
          if(index===0){
            this.missedString= this.missedString+element;
           }
           else{
             console.log(this.missedString);
             this.missedString=this.missedString+','+element;
           }
        }
       
        
      });
      console.log(this.missedString);
    }

    }

    else{
      this.provideChar=true;
    }
    
   

    console.log(this.choice);
    
    
  }

  closeBackdrop(){
    this.gameOver=false;
  }
}
