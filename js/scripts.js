(function(){
    var btnRand = document.querySelector(".btnRand"),
        output = document.querySelector(".showRandomNum"),
        output2 = document.querySelector(".showSelectedNum"),
        outputCredit = document.querySelector(".showCredit"),
        btnNum = document.querySelectorAll(".btnNum"),
        btnStart = document.querySelector(".btnStart"),
        btnNext = document.querySelector(".btnNext"),
        message = document.querySelector(".message"),
        resultsCont = document.querySelector(".resultsContainer"),
        results = document.querySelector(".results"),
        selectedNum = [],
        count1 = 0,
        count2 = 0,
        count3 = 0,
        count4 = 0,
        count5 = 0,
        count6 = 0,
        cash = 100;
    

    function compare(){
        var randomNumbers = showRandomNumbers(),
            userNumbers = selectedNum,
            rightNumbers = 0;
            
        
        cash -=3;
        
        
        for(var i=0; i<randomNumbers.length; i++){
        console.log(randomNumbers[i]);
            for(var j=0; j<userNumbers.length; j++){
                if(randomNumbers[i] == parseInt(userNumbers[j])){
                    rightNumbers++;
                }
                
                
            }
        }
        
       switch(rightNumbers){
           case 1: message.value = "trafiłeś 1 liczbę";  count1++;
               break;
           case 2: message.value = "trafiłeś dwójkę"; count2++;
               break;
           case 3: message.value = "trafiłeś trójkę"; cash+=15; count3++;
               break;
           case 4: message.value = "trafiłeś czwórkę"; cash+=300; count4++;
               break;
           case 5: message.value = "trafiłeś piątkę"; cash+=5000; count5++;
               break;
           case 6: message.value = "Gratulację! Wygrałeś główną nagrodę!"; cash+=2000000; count6++;
               break;
           default: message.value = "Niestety nic nie trafiłeś!";
               break;
       }
        
        outputCredit.value = "Twój stan konta: " + cash + " zł";
        output.value = randomNumbers.join(", ");
        
        console.log(rightNumbers);
        
        console.log(cash);
        
    }
    
    
      function finishGame(){
          
        output.value = "brak gotówki!";
            output2.value = "brak gotówki!";
            resultsCont.classList.add("visible","animateIn");
            var countArray = [count1, count2, count3, count4, count5, count6];
          
            for(var i=0; i<6; i++){
                document.querySelector(".guess"+[i+1]).innerHTML = "Trafiłeś " + [i+1] + " - " + countArray[i] + " krotnie.";
            }
    }
    
    
    function getRandom(min,max){
        
        return Math.round(Math.random() * (max - min) + min);
    }
    
    function showRandomNumbers(){
         var numbers = [],
            random;
        
        for(var i= 0; i<6; i++){
            
            random = getRandom(1,49);
            
            while((numbers.indexOf(random) !== -1)){
                random = getRandom(1,49);
            }
            
            numbers.push(random);
            
        }
        return numbers;
    }
    
    function showNumbers(){
        if(cash>3){
            compare();
        }else{
            finishGame();
            }
        }
        
  
    
    btnRand.addEventListener("click", showNumbers, false);
    window.addEventListener("click", function(e){
        
        
        if(selectedNum.length < 6){
        if(e.target.value){
            
            e.target.classList.add("selected");
            selectedNum.push(e.target.value);
            e.target.setAttribute("disabled", "true");
            if(selectedNum.length == 6){
                btnNext.removeAttribute("disabled");
                for(var i= 0; i<btnNum.length; i++){
                    btnNum[i].setAttribute("disabled", "true");
            }
                
            }
        };
        
        
        }
        
    },false);
    
    
    // animations
    function goOut(){
        
       var visible =  document.querySelector(".visible");
        
        visible.classList.add("animateOut");
        setTimeout(function(){
            visible.classList.remove("visible");
            
                             },600);
        setTimeout(function(){visible.nextElementSibling.classList.add("visible", "animateIn")},600);
        visible.classList.remove("animateIn");
        
    };
    
    btnStart.addEventListener("click", goOut, false);
    
    btnNext.addEventListener("click", function(){
        goOut();
        output2.value = selectedNum.join(", ");
        
    }, false);
    resultsCont.addEventListener("click", function(){
        resultsCont.classList.remove("visible", "animateIn");
        
    }, false);
    
    

})()
