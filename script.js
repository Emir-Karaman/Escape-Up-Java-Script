var character = document.getElementById("character"); // Karakter elementini alır
var game = document.getElementById("game"); // Oyun alanı elementini alır
var interval;// Karakterin hareketini kontrol eden zaman aralığı değişkeni
var both = 0; // Klavye ve dokunmatik girişlerin aynı anda kullanılmasını kontrol eden değişken
var counter = 0; // Blok ve deliklerin sayısını sayan değişken
var currentBlocks = []; // Mevcut blokların indekslerini tutan dizi
var gamecounter = 0; // Oyunun başlamış olup olmadığını kontrol eden değişken




// Karakterin sola hareket etmesini sağlayan fonksiyon
function moveLeft(){
    var position = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (isChrome()) {
        // Chrome için kod burada çalışır
        if(position>0){
            character.style.left = position - 2 + "px";
        }
      } else if (isFirefox()) {
        // Firefox için kod burada çalışır
        if(position>0){
            character.style.left = position - 7 + "px";
        }
      }
    
}
// Karakterin sağa hareket etmesini sağlayan fonksiyon
function moveRight(){
    var position = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (isChrome()) {
        // Chrome için kod burada çalışır
        if(position<380){
            character.style.left = position + 2 + "px";
        }
      } else if (isFirefox()) {
        // Firefox için kod burada çalışır
        if(position<380){
            character.style.left = position + 7 + "px";
        }
      }
    
}
// Sağa ve sola hareketini mobil cihazlara uyumluluğunu sağlar
document.addEventListener("touchstart", event => {
    if(both==0){
        both++;
        if(event.touches[0].clientX < window.innerWidth / 2){
            interval = setInterval(moveLeft, 1);
        }
        
        if(event.touches[0].clientX >= window.innerWidth / 2){
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("touchend", event => {
    clearInterval(interval);
    both=0;
});

// Sağa ve sola hareket ettirmek için klavyedeki sağ ve saol ok tuşlarını kullanır
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"|| event.key === "Left"){
            interval = setInterval(moveLeft, 1);
        }
        
        if(event.key==="ArrowRight"|| event.key === "Right"){
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

//Blokların hepsinin farklı renk olması için rastgele renk üretimir 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    do {
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (color === '#000000'); // Siyah renk kontrolü
    return color;
}

// Chrome olduğunu kontrol eden fonksiyon
function isChrome() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /chrome/.test(userAgent);
  }
  
// Firefox olduğunu kontrol eden fonksiyon
function isFirefox() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /firefox/.test(userAgent);
}


// Oyunun içeriğindeki blokları üretir ve hareketini sağlar
var blocks = setInterval(function(){
    // Oyun başlamadan oyunun oynanışını açıklar
    if (gamecounter<= 0) {
    alert("Oyunu oynamak için klavyenizdeki sağ ve sol yön tuşlarını kullanarak veya ekranınızın sağ ve sol tarafına dokunarak karakteri hareket ettirin. Amaç, blokların arasındaki deliklerden geçerek mümkün olduğunca uzun süre hayatta kalmaktır.Hazırsanız başlayın!");
    gamecounter++;
    }
    // Son bloğun ve deliğin bilgilerini alır
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    var holetwoLast = document.getElementById("holetwo"+(counter-1));

    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        var holetwoLastTop = parseInt(window.getComputedStyle(holetwoLast).getPropertyValue("top"));

    }

    if (isChrome()){
        // Chrome için kod burada çalışır

        // Yeni blok ve deliğin oluşturulmasını sağlar
        if(blockLastTop<450||counter==0){
            var block = document.createElement("div");
            var hole = document.createElement("div");
            var holetwo = document.createElement("div");
            block.setAttribute("class", "block");
            hole.setAttribute("class", "hole");
            holetwo.setAttribute("class", "holetwo");

            block.setAttribute("id", "block"+counter);
            hole.setAttribute("id", "hole"+counter);
            holetwo.setAttribute("id", "holetwo"+counter);

            block.style.top = blockLastTop + 50 + "px";
            hole.style.top = holeLastTop + 50 + "px";
            holetwo.style.top = holetwoLastTop + 50 + "px";

            var random = Math.floor(Math.random() * 360);
            var randomtwo = Math.floor(Math.random() * 360);
            hole.style.left = random + "px";
            holetwo.style.left = randomtwo + "px";

            var randomColor = getRandomColor();
            block.style.backgroundColor = randomColor;
            game.appendChild(block);
            game.appendChild(hole);
            game.appendChild(holetwo);

            currentBlocks.push(counter);
            counter++;
        }
    
        // Karakterin koordinatlarını alır
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var characterPosition = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var drop = 0;
    
        // Karakterin oyun alanının en üstüne değmesi ile oyun biter
        if(characterTop <= 0){
            alert("Oyun Bitti. Puan: "+(counter-15));
            clearInterval(blocks);
            location.reload();
            
        }
    
        // Blokların hareketi ve karakterin çarpışma kontrolünü sağlar
        for(var i = 0; i < currentBlocks.length;i++){
            let current = currentBlocks[i];
            let iblock = document.getElementById("block"+current);
            let ihole = document.getElementById("hole"+current);
            let iholetwo = document.getElementById("holetwo"+current);

            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
            let iholetwoLeft = parseFloat(window.getComputedStyle(iholetwo).getPropertyValue("left"));

            iblock.style.top = (iblockTop - 0.5 )+ "px";
            ihole.style.top = (iblockTop - 0.5 )+ "px";
            iholetwo.style.top = (iblockTop - 0.5 )+ "px";

            // Oyun alanının üstüne gelen blokları yok eder
            if(iblockTop < 0){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
                iholetwo.remove();

            }
            // Karakter delikte ise düşmesi için drop değerini sıfırlar değil ise düşmemesi için drop değerini 1 arttırır
            if(iblockTop-20<characterTop && iblockTop>characterTop){
                drop++;
                if(iholeLeft<=characterPosition && iholeLeft+20>=characterPosition){
                    drop = 0;
                }
                if(iholetwoLeft<=characterPosition && iholetwoLeft+20>=characterPosition){
                    drop = 0;
                }
            }
        }
        // Karakterin düşme veya yükselme hareketini sağlar
        if(drop==0){
            if(characterTop < 480){
                character.style.top = characterTop + 2 + "px";
            }
        }else{
            character.style.top = characterTop - 0.5 + "px";
        }
        
    } else if (isFirefox()){
        // Firefox için kod burada çalışır

        // Yeni blok ve deliğin oluşturulmasını sağlar
        if(blockLastTop<450||counter==0){
            var block = document.createElement("div");
            var hole = document.createElement("div");
            var holetwo = document.createElement("div");
            block.setAttribute("class", "block");
            hole.setAttribute("class", "hole");
            holetwo.setAttribute("class", "holetwo");

            block.setAttribute("id", "block"+counter);
            hole.setAttribute("id", "hole"+counter);
            holetwo.setAttribute("id", "holetwo"+counter);

            block.style.top = blockLastTop + 50 + "px";
            hole.style.top = holeLastTop + 50 + "px";
            holetwo.style.top = holetwoLastTop + 50 + "px";

            var random = Math.floor(Math.random() * 360);
            var randomtwo = Math.floor(Math.random() * 360);
            hole.style.left = random + "px";
            holetwo.style.left = randomtwo + "px";

            var randomColor = getRandomColor();
            block.style.backgroundColor = randomColor;
            game.appendChild(block);
            game.appendChild(hole);
            game.appendChild(holetwo);

            currentBlocks.push(counter);
            counter++;
        }
    
        // Karakterin koordinatlarını alır
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var characterPosition = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var drop = 0;
    
        // Karakterin oyun alanının en üstüne değmesi ile oyun biter
        if(characterTop <= 0){
            alert("Oyun Bitti. Puan: "+(counter-15));
            clearInterval(blocks);
            location.reload();
            
        }
    
        // Blokların hareketi ve karakterin çarpışma kontrolünü sağlar
        for(var i = 0; i < currentBlocks.length;i++){
            let current = currentBlocks[i];
            let iblock = document.getElementById("block"+current);
            let ihole = document.getElementById("hole"+current);
            let iholetwo = document.getElementById("holetwo"+current);

            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
            let iholetwoLeft = parseFloat(window.getComputedStyle(iholetwo).getPropertyValue("left"));

            iblock.style.top = (iblockTop - 1.8 )+ "px";
            ihole.style.top = (iblockTop - 1.8 )+ "px";
            iholetwo.style.top = (iblockTop - 1.8 )+ "px";

            // Oyun alanının üstüne gelen blokları yok eder
            if(iblockTop < 0){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
                iholetwo.remove();

            }
            // Karakter delikte ise düşmesi için drop değerini sıfırlar değil ise düşmemesi için drop değerini 1 arttırır
            if(iblockTop-20<characterTop && iblockTop>characterTop){
                drop++;
                if(iholeLeft<=characterPosition && iholeLeft+20>=characterPosition){
                    drop = 0;
                }
                if(iholetwoLeft<=characterPosition && iholetwoLeft+20>=characterPosition){
                    drop = 0;
                }
            }
        } 
        // Karakterin düşme veya yükselme hareketini sağlar
        if(drop==0){
            if(characterTop < 480){
                character.style.top = characterTop + 5 + "px";
            }
        }else{
            character.style.top = characterTop - 1.6 + "px";
        }
    }   
},1);
