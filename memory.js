// Create Cards

    // Deck Array

        const cardValues  = [
            "", "red", "red", "green", "green", 
            "blue", "blue", "purple", "purple", 
            "yellow", "yellow", "pink", "pink", 
            "brown", "brown", "grey", "grey"]

        const numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

        shuffle(numberArray);

        for(i = 0; i < 16; i++){                                            // create playing cards
            const cardNumber = numberArray[i];
            const cardCode = "<div class='flip-card' id='" + cardNumber + "' data-value='" + cardValues[cardNumber] + "'><div class='flip-card-inner'><div class='flip-card-front'></div><div class='flip-card-back'></div></div></div>";

            const setDiv = document.getElementById("board");
            setDiv.innerHTML += cardCode;
        }

        function shuffle(a) {                                               // Fisher–Yates shuffle algorithm
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

        const cards = document.querySelectorAll('.flip-card'); 

        cards.forEach(card => card.addEventListener('click', checkCard));


    // Start game

        let flips = 0;
        let tries = 0;
        let pairs = 0;
        let choices = [];

        const moves = document.getElementById("moves");                 
        moves.innerHTML = "0 Züge";                                         // update the move counter
        
        function checkCard(){
            
            if(!this.flipped){                                              // check if the clicked card is not flipped yet

                this.classList.toggle("flipped");                           // flip the card
                this.flipped = true;                                        // set the flipped state
                choices.push(this.dataset.value, this.id);                  // push the card ids into the array   
                flips++;                                                    
            }

            if(flips == 2){                                                 

                if(choices[0] == choices[2]){                               // check if card values are equal
                    pairs++;                                                
                    if(pairs == 8){alert("Gewonnen");}                      // check if the end of the game is reached     
                    choices = [];                                           // empty the card array
                    flips = 0;                                              
                    tries++;                                                
                    moves.innerHTML = tries + " Züge";                      // update the move counter
                    }

                else{
                    setTimeout(() => {
                    for(let i = 1; i < choices.length; i+=2){               
                        let remove = document.getElementById(choices[i]);   // select flipped cards in last move                       
                        remove.classList.toggle("flipped");                 // unflip cards
                        remove.flipped = false;                             // remove flipped state
                    }
                    choices = [];                                           // empty the card array
                    flips = 0;                                              
                    tries++;
                    moves.innerHTML = tries + " Züge";
                    }, 700);
                }
            }

        }


    // Button for restarting the game by refreshing the window

        const button = document.getElementById("reload");
        button.addEventListener('click', function(){
            location.reload(); 
        })