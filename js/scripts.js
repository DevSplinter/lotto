(function(){
    var btnRand = document.querySelector(".btnRand"),
        output = document.querySelector(".showRandomNum"),
        output2 = document.querySelector(".showSelectedNum"),
        outputCredit = document.querySelector(".showCredit"),
        outputIncome = document.querySelector(".showIncome"),
        btnNum = document.querySelectorAll(".btnNum"),
        btnStart = document.querySelector(".btnStart"),
        btnNext = document.querySelector(".btnNext"),
        btnResults = document.querySelector(".btnResults"),
        board = document.querySelector(".board"),
        inputNick = document.querySelector(".inputNick"),
        errorMessage = document.querySelector(".errorMessage"),
        message = document.querySelector(".message"),
        resultsCont = document.querySelector(".resultsContainer"),
        results = document.querySelector(".results"),
        selectedNum = [],
        regex = /\W/g,
        count1 = 0,
        count2 = 0,
        count3 = 0,
        count4 = 0,
        count5 = 0,
        count6 = 0,
        cash = 100,
        income = 0,
        
        xhr = new XMLHttpRequest(),
        data = new FormData();
    

    function compare(){
        var randomNumbers = showRandomNumbers(),
            userNumbers = selectedNum,
            rightNumbers = 0;
            
        
        cash -=3;
        
        
        for(var i=0; i<randomNumbers.length; i++){
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
           case 3: message.value = "trafiłeś trójkę"; income+=15; count3++;
               break;
           case 4: message.value = "trafiłeś czwórkę"; income+=300; count4++;
               break;
           case 5: message.value = "trafiłeś piątkę"; income+=5000; count5++;
               break;
           case 6: message.value = "Gratulację! Wygrałeś główną nagrodę!"; income+=2000000; count6++;
               break;
           default: message.value = "Niestety nic nie trafiłeś!";
               break;
       }
        
        outputCredit.value = "Stan konta: " + cash + " zł";
        outputIncome.value = "Twoje wygrane: " + income + " zł";
        output.value = randomNumbers.join(", ");        
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
    board.addEventListener("click", function(e){
        
        
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
    
    btnStart.addEventListener("click", function(){
        
        var inputLength = inputNick.value.length;
        
        
        if(inputNick.value == "" || inputLength > 20){
            
            inputNick.classList.add("error");
            errorMessage.innerHTML = "Wpisz imię (max 20 znaków)";
            errorMessage.classList.add("showErrorMessage");
            
        }else if(inputNick.value.match(regex)){
            
            errorMessage.innerHTML = "Nie używaj symboli";
            errorMessage.classList.add("showErrorMessage");
            
        }else{
            inputNick.classList.remove("error");
            goOut();
             }
    }, false);
    
    btnNext.addEventListener("click", function(){
        goOut();
        output2.value = selectedNum.join(", ");
        
    }, false);
    
    
    btnResults.addEventListener("click", function(){
        var nick = inputNick.value;
        btnResults.parentNode.removeChild(btnResults);
        results.innerHTML = "";
        
        xhr.open("POST", "results.php", true);
    
        xhr.onreadystatechange = function(e){
        
        if(this.readyState === 4 && this.status === 200){
            
            var response = JSON.parse(this.response);
            var table = document.createElement("table");
            var header = document.createElement("h2");
            var link = document.createElement("a");
            var counter = 1;
            
            
            
            for(var i in response){
                
                var row = table.insertRow();
                var text = document.createTextNode(counter + ".");
                var cell = row.insertCell();
                cell.appendChild(text);
                counter++;
                
                for(var j in response[i]){
                    text = document.createTextNode(response[i][j]);
                    cell = row.insertCell();
                    cell.appendChild(text);
                }
            }
            
            header.appendChild(document.createTextNode("LISTA TOP 10"));
            link.appendChild(document.createTextNode("Zobacz statystyki!"));
            link.setAttribute("href", "statistics.php");
            link.classList.add("link");
            results.appendChild(header);
            results.appendChild(table);
            results.appendChild(link);
        }
    }
    
    data.append("nickName", nick);
    data.append("income", income);
        for(var i = 0; i < selectedNum.length; i++){
            var value = selectedNum[i],
                key = "selectedNum"+(i+1);
    data.append(key, value);
    }
    
    xhr.send(data);
        
    },false);
   
    
})()