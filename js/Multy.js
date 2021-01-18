//import UOKCollege from "../include/class.request.js";


//the odlphin dance global variables
var isRrotatedX = true;
var rotationAngle = 0.005;

// snow flakes make pic Global Variables
var snowflakes = []; // array to hold snowflake objects
var Y_AXIS = 1;
var easing = 0.05;
var secondDisplay = true;

// snow flakes make pic Global Variables
var imageIndex = 1;
var images = [];
var walk = [];
var jump = [];
var kick = [];
var cars = [];
var colleges = [];
var WALK = true;
var boyTimer = 1;
var BACKGROUND = true;
var SHOWCAR = true;
var ADDFOG = false;
var ADDSNOW = false;
var THEME = 1;
var boyX = -300;
var boyY = 150;
var backgroundX = 0;
var carX = -600;
var carY = 265;
var carTimer = 1;
var carsTimer = 1;
var carsIndex = 0;
var carsX = 900;
var carsY = 220;
var boyInBack = true;
var amp, vol, dance = 0;
var bgImgWidth;
var myWidth = screen.width - 250;
var menuDisplayed = false;
var collegeIndex = 2;
var content1;
var uokCollege = {};
var loggedIn = false;


function preload() {
    //load image for snowflakes make pic
    bgImg = loadImage('images/singlePageBG/uokColleges.jpg');
    img2 = loadImage('cars/Car.png');
    theme0 = loadSound('sounds/Intrusión.ogg');
    theme1 = loadSound('sounds/JungleBell.ogg');
    themeSound = theme0;
    for (var i = 0; i < 6; i++) {
        prefix = 'cars/';
        mypic = prefix + i + '.png';
        mytext = prefix + '1' + i + '.png';
        cars[i] = loadImage(mypic);
        colleges[i] = loadImage(mytext);
    }
    for (var i = 1; i < 30; i++) {
        if (i < 10) {
            prefix = 'walk/a_0000';
        } else {
            prefix = 'walk/a_000';
        }
        walk[i] = loadImage(prefix + i + '.png');
    }
    images = walk;
}

function setup() {
    bgImgWidth = bgImg.width;
    width = screen.width - 80;
    height = 400;
    createCanvas(width, height);
    setupGradient();
    frameRate(29);
    themeSound.play();
    themeSound.onended(playNextTheme);
    amp = new p5.Amplitude();
}
playNextTheme = function() {
    console.log("Playing theme:  " + THEME);
    if (THEME == 0) {
        theme0.play();
        themeSound = theme0;
        ADDSNOW = false;
        ADDFOG = false;
        THEME = 1;
    } else {
        if (THEME == 1) {
            theme1.play();
            themeSound = theme1;
            ADDSNOW = true;
            ADDFOG = true;
            THEME = 2;
        } else {
            if (THEME == 2) {
                theme0.play();
                themeSound = theme0;
                ADDSNOW = true;
                ADDFOG = false;
                THEME = 0;
            }
        }
    }
    console.log("Next theme:  " + THEME);
    themeSound.onended(playNextTheme);
}

function draw() {
    drawImage(bgImg, true);
    if (SHOWCAR) drawCar(img2);
    if (boyInBack) {
        drawBoy();
        showCars();
    } else {
        showCars();
        drawBoy();
    }
    if (ADDFOG) drawGradient(-10, 0, width + 10, height + 50, startColor, endColor, 1);
    if (ADDSNOW) drawSnowflakes();
    vol = amp.getLevel();

}

function windowResized() {
    if (windowWidth < (screen.width - 50)) {
        resizeCanvas(windowWidth - 80, 400);
        myWidth = windowWidth - 250;
        menuItems = document.getElementsByClassName('pullButton');
    } else {
        resizeCanvas(screen.width - 80, 400);
        myWidth = screen.width - 250;
        menuItems = document.getElementsByClassName('pullButton');
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].style.textAlign = 'right';
        }

    }
    document.getElementById('adminAdd').style.transform = 'translateX(' + myWidth + 'px)';
    document.getElementById('editThis').style.transform = 'translateX(' + myWidth + 'px)';
    document.getElementById('mainDisplay').style.transform = 'translateY(-900px)';
    menuDisplayed = false;
}

function drawBoy() {
    dance = Math.ceil(vol * 120);
    if ((!WALK) && (boyTimer > 30)) {
        images = walk;
        themeSound.setVolume(1);
    }
    if (imageIndex > 29) imageIndex = 1;
    boyY = 165 - dance;
    if (dance > 30) boyX--;
    drawImage(images[imageIndex++], false);
}

function drawImage(pic, BACKGROUND) {
    if (BACKGROUND) {
        if (backgroundX < (bgImgWidth - width) * -1) {
            backgroundX = 0;
        }
        image(pic, backgroundX--, 0);
    } else {
        if (boyX > width - 300) boyX = -300;
        image(pic, boyX++, boyY);
    }
    boyTimer++;
}

function drawCar(pic) {
    if (carTimer < 800) {
        if (carX < 200) {
            carX = carX + 5;
        } else if (carX < 400) {
            carX = carX + 10;
        } else {
            carX = carX + 15;
        }
        image(pic, carX++, carY);
        carTimer++;
    } else {
        SHOWCAR = false;
        carTimer = 1;
        carX = 0;
    }
}

function drawCars(carsIndex) {
    if (carsX > 200) {
        carsX = carsX - random(5, 8);
    }
    if (carsX > 400) {
        carsX = carsX - random(5, 15);
    }
    if (carsX > 600) {
        carsX = carsX - random(5, 15);
    }
    carsX = carsX - random(2, 10);
    carsY = carsY - random(0, 3);
    if (((mouseX > carsX) && (mouseX < carsX + 200)) && ((mouseY > 250) && (mouseY < 400))) {
        carsX = carsX + 10;
    }
    image(colleges[carsIndex], carsX, carsY - 110);
    image(cars[carsIndex], carsX--, carsY);
    carsY = 220;
}

function showCars() {
    if (carsX < (width / 2) * -1) {
        carsIndex++;
        carsX = width + 30;
        boyInBack = !boyInBack;
    }
    if (carsIndex >= cars.length) {
        carsIndex = 0;
    }
    drawCars(carsIndex);
}
// add Snow Flakes
function drawSnowflakes() {
    var t = frameCount / 60; // update time
    fill(255);
    // create a random number of snowflakes each frame
    for (var i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (var flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

function drawMousePosition() {
    //mouse position
    var locX = mouseX - width / 2;
    var locY = mouseY - height / 2;
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow((width + 50) / 2, 2)));

    this.update = function(time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = (width + 50) / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function() {

        // the mouse play part
        var targetX = mouseX;
        var dx = targetX - this.posX;
        this.posX += dx * easing;

        //   var targetY = mouseY;
        //  dy = targetY - this.posY;
        //    this.posY += dy * easing;
        // end the mouse play part by karim
        noStroke();
        ellipse(this.posX, this.posY, this.size);
    };
}

function drawGradient(x, y, w, h, c1, c2, axis) {
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (var i = y; i <= y + h; i++) {
            var inter = map(i, y, y + h, 0, 1);
            var c = lerpColor(startColor, endColor, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (var i = x; i <= x + w; i++) {
            var inter = map(i, x, x + w, 0, 1);
            var c = lerpColor(startColor, endColor, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function setupGradient() {
    endRange = color(255);
    startRange = color(0);
    startColor = color(100, 102, 204, 0);
    endColor = color(255, 255, 255, 200);
}

function setupSnowflake() {
    noStroke();
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        boyX += 10;
    } else if (keyCode === LEFT_ARROW) {
        boyX -= 8;
        carX = -700;
        carY = 265;
        SHOWCAR = true;
        carTimer = 1;
        console.log("The car arrow..");
    } else if (keyCode === 16) {
        backgroundX -= 25;
        console.log("shift pressed..")
    }
}

function mousePressed() {

    if (mouseButton == LEFT) {
        if (!menuDisplayed) {
            if (((mouseX > carsX) && (mouseX < carsX + 200)) && ((mouseY > 250) && (mouseY < 400))) {
                collegeIndex = carsIndex;
                // uokCollege = collegeArray[collegeIndex];
                mytext = uokCollege.name;
                myImageSrc = uokCollege.logo;
                /*
                switch(collegeIndex)
                {
                  case 0:
                  Uokcollege
                  break;
                  case 1:
                    myText = "كلية الهندسة";
                    myImageSrc = "ENG.png"
                    break;
                  case 2:
                    myText = "كلية الصيدلة";
                    myImageSrc = "PHA.png"
                    break;
                  case 3:
                    myText = "كلية العمارة";
                    myImageSrc = "ARC.png"
                    break;
                  case 4:
                    myText = "كلية طب الأسنان";
                    myImageSrc = "DEN.png"
                    break;
                  case 5:
                    myText = "كلية العلوم";
                    myImageSrc = "SCI.png"
                    break;
                  default:
                    myText = "كلية لا شئ";
                    myImageSrc = "NOT.png"
                }
                */
                orderedPage = document.getElementById("mainDisplay");
                orderedPageTitle = document.getElementById("collegeTitle");
                orderedPageLogo = document.getElementById("collegeLogo");
                orderedPage.style.transform = 'translateY(0px)';
                menuDisplayed = true;
                orderedPageTitle.innerHTML = uokCollege.name;
                orderedPageLogo.src = uokCollege.logo;
            }
        }
    }
}

function slideItemRight(myElement) {
    myElement.parentNode.style.transform = 'translateX(' + myWidth + 'px)';
}

function mylog(text) {
    a = text.substring(0, 3);
    t = text.substring(4, text.length);
    if (a) {
        document.getElementById('pageContent').innerHTML = t;
        content1.innerHTML = t;
        //   document.getElementById('editor').innerHTML = t;
        document.getElementsByClassName('content1').innerHTML = document.getElementById('pageContent').innerHTML;
    }
    console.log('code: ' + a + '  $$$');
}

function displayPage(element, info) {
    document.getElementById('subPageTitle').innerHTML = element.innerHTML;
    document.getElementById('pageTitle').innerHTML = element.innerHTML;
    element.parentElement.style.transform = 'translateX(0px)';
}
