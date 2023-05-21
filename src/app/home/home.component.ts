import { Component } from '@angular/core';
import { GetApiService } from 'src/app/api-service/get-api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{

  // Variable declarations for the deck
  deckID: string = "";
  deck : any;

  // Variable declarations for the cards
  card: any;
  cardTwo: any;
  cardThree: any;

  firstCardID: string = "";
  firstCardValue: any;
  secondCardValue: string = "";
  thirdCardSuit: string = "";

  // Variable declarations for the deck
  colourResult: string = "";

  imageLinkColour: string = "";
  imageLinkValue: string = "";
  imageLinkSuit: string = "";

  valueResult: string = "";
  suitResult: string = "";

  // Get wins and losses numbers from localStorage
  getWins: any;
  getLosses: any;

  // Variables to display on HTML
  countWins = 0;
  countLosses = 0;

  constructor(private api: GetApiService, private httpClient: HttpClient, private router:Router) {
  }

  // On initialization, call Deck of Cards API to create deck. In addition, set the variables that will be displayed on the score counter.
  // The variables that will be used to change the score are also updated if there was a previous game.
  ngOnInit() {
    this.api.apiCall().subscribe((data) => {
      console.log(data);
      this.deck = data;
      this.deckID = this.deck.deck_id;
      console.log(this.deckID);

      if(localStorage.getItem("Wins") == null) {
        this.getWins = "0";
      } else {
        this.countWins = parseInt(localStorage.getItem("Wins")!);

        this.getWins = localStorage.getItem("Wins");
      }

      if(localStorage.getItem("Losses") == null) {
        this.getLosses = "0";
      } else {
        this.countLosses = parseInt(localStorage.getItem("Losses")!);
        this.getLosses = localStorage.getItem("Losses");
      }
    })
  }

  // Method to save the user input when they select their choice"s radio button for the colour part of the game
  onChangeColour(e: any) {
    this.colourResult= e.target.value;
  }

 // Method to save the user input when they select their dropdown choice for the value part of the game
  onChangeValue(e: any) {
    this.valueResult = e.target.value;
  }

  // Method to save the user input when they type in their choice for the suit part of the game
  onChangeSuit(e: any){
    this.suitResult = e.target.value;
  }

  // Method that handles the logic for the colour guessing part of the game
  drawCardColour() {
    if(this.colourResult) {
      this.httpClient.get("https://www.deckofcardsapi.com/api/deck/" + this.deckID + "/draw/?count=1").subscribe((result) => {
        console.log("get api data", result);
        this.card = result;
        this.firstCardID = this.card.cards[0].suit;
    
      this.setFirstCardValue(this.card.cards[0].value);
    
        this.imageLinkColour = this.card.cards[0].image;
    
        console.log(this.firstCardID);
        console.log(this.colourResult);
    
        var x = document.getElementById("colourCorrect");
        var y = document.getElementById("colourIncorrect");
    
        if(this.colourResult == "black") {
          if(this.firstCardID == "SPADES" || this.firstCardID == "CLUBS") {
            if(x != null) {
              x.style.display = "block";
            }
          } else {
            if(y != null) {
              y.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } else if (this.colourResult == "red"){
          if(this.firstCardID == "DIAMONDS" || this.firstCardID == "HEARTS") {
            if(x != null) {
              x.style.display = "block";
            }
          } else {
            if(y != null) {
              y.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        }
      });
    }
  }

  // Saves the first card value to use in the second part of the game
  setFirstCardValue(firstCardValue: string) {
    this.firstCardValue = firstCardValue
  }

  // Opens the second part of the game
  continueValue() {
    console.log(this.firstCardValue);
    
    var valueSection = document.getElementById("valueSection");
    if(valueSection != null) {
      valueSection.style.display = "table";
    }
  }

  // Opens the third part of the game
  continueSuits() {
    var suitSection = document.getElementById("suitSection");
    if(suitSection != null) {
      suitSection.style.display = "table";
    }
  }

  // Saves the current win number to localStorage
  saveToStorageWins() {
    localStorage.setItem("Wins", this.countWins.toString());
  }

  // Saves the current losses number to localStorage
  saveToStorageLosses() {
    localStorage.setItem("Losses", this.countLosses.toString());
  } 

  // Method that handles the logic for the colour guessing part of the game
  drawCardValue() {
    if(this.valueResult) {
      this.httpClient.get("https://www.deckofcardsapi.com/api/deck/" + this.deckID + "/draw/?count=1").subscribe((result) => {
        console.log(result);
        this.card = result;
        this.secondCardValue = this.card.cards[0].value;

        this.imageLinkValue = this.card.cards[0].image;
    
        var a = document.getElementById("valueCorrect");
        var b = document.getElementById("valueIncorrect");

        console.log(this.valueResult);
        console.log(this.secondCardValue);

        var dict : { [key: string]: any }  = {
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "JACK": 11,
            "QUEEN": 12,
            "KING": 13,
            "ACE": 14
        }

        if(this.valueResult == "higher") {
          if(dict[this.firstCardValue] < dict[this.secondCardValue]) {
            if(a != null) {
              a.style.display = "block";
            }
          } else {
            if(b != null) {
              b.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        }else if(this.valueResult == "lower") {
          if(dict[this.firstCardValue] > dict[this.secondCardValue]) {
            if(a != null) {
              a.style.display = "block";
            }
          } else {
            if(b != null) {
              b.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } else if(this.valueResult == "same") {
          if(dict[this.firstCardValue] == dict[this.secondCardValue]) {
            if(a != null) {
              a.style.display = "block";
            }
          } else {
            if(b != null) {
              b.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        }
      });
    }
  }

  // This method controls the suit phase of the game.
  drawCardSuit() {
    if(this.suitResult) {
      this.httpClient.get("https://www.deckofcardsapi.com/api/deck/" + this.deckID + "/draw/?count=1").subscribe((result) => {
        console.log(result);
        this.cardThree = result;
        this.thirdCardSuit = this.cardThree.cards[0].suit;
        this.imageLinkSuit = this.cardThree.cards[0].image;

        var c = document.getElementById("suitsCorrect");
        var d = document.getElementById("suitsIncorrect");

        this.suitResult = this.suitResult.toUpperCase();
        console.log(this.suitResult);
        console.log(this.thirdCardSuit);
        

        if(this.suitResult == "DIAMONDS") {
          if(this.thirdCardSuit == "DIAMONDS"){
            if(c != null) {
              c.style.display = "block";
            }
          } else {
            if(d != null) {
              d.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } else if(this.suitResult == "CLUBS") {
          if(this.thirdCardSuit == "CLUBS"){
            if(c != null) {
              c.style.display = "block";
            }
          } else {
            if(d != null) {
              d.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } else if(this.suitResult == "HEARTS") {
          if(this.thirdCardSuit == "HEARTS"){
            if(c != null) {
              c.style.display = "block";
            }
          } else {
            if(d != null) {
              d.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } else if(this.suitResult == "SPADES") {
          if(this.thirdCardSuit == "SPADES"){
            if(c != null) {
              c.style.display = "block";
            }
          } else {
            if(d != null) {
              d.style.display = "block";
              this.countLosses++;
              this.saveToStorageLosses();
              this.getLosses = localStorage.getItem("Losses");
            }
          }
        } 
      });
    }
  }

  // Adds 1 to the number of wins in localStorage and opens the congratulations page
  openCongratulations() {
      this.countWins++;
      this.saveToStorageWins();
      this.getLosses = localStorage.getItem("Losses");
      this.router.navigate(["congratulations"]);
  }

  // Reloads the page
  restartPage() {
    window.location.reload();
  }

}