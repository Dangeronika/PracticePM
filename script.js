let outputHeight;

let faceTracker;
let videoInput;

let imgMask;
let imgFace;
let imgFace1;
let imgFace2;
let imgBrovi;
let imgBrovi1;
let imgBrovi2;
let imgBrovi3;
let imgLips;

let selected = -1;

function preload() {
    imgMask = loadImage("https://img.icons8.com/officel/2x/user.png");
    imgFace = loadImage('img1.png');
    imgBrovi = loadImage('img4.png');
    imgLips = loadImage('img5.png');
    imgBrovi1 = loadImage('img7.png');
    imgBrovi2 = loadImage('img10.png');
    imgBrovi3 = loadImage('img11.png');
    imgFace1 = loadImage('img8.png');
    imgFace2 = loadImage('img9.png')
}

function setup() {

    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputHeight = maxWidth * 0.75;
    outputWidth = maxWidth;

    createCanvas(outputWidth, outputHeight);

    videoInput = createCapture(VIDEO);
    videoInput.size(outputWidth, outputHeight);
    videoInput.hide();

    const sel = createSelect();
    const selectList = ['Mask', 'Face','Brovi','Lips'];
    sel.option('Select filter', -1);
    const a = document.getElementById('1');
    
    console.log(a.children[a.children.length-1]);
    
    a.childNodes[a.childNodes.length-1].className = 'select-1';
  

    


    for(let i = 0; i <selectList.length; i++) {
        sel.option(selectList[i],i);
    }
    sel.changed(applyFilter);

    faceTracker = new clm.tracker();
    faceTracker.init();
    faceTracker.start(videoInput.elt);

    const sel1 = createSelect();
    const selectList1 = ['1', '2','3','4','5'];
    sel1.option('Select filter', -1);

    a.childNodes[a.childNodes.length-1].className = 'select-2';

    for(let i = 0; i < selectList1.length; i++) {
        sel1.option(selectList1[i],i);
    }
    sel1.changed(applyFilter1);
}

function applyFilter() {

    selected = this.selected();
}

function applyFilter1() {

    selected1 = this.selected();
}

function draw() {
    image(videoInput, 0, 0, outputWidth, outputHeight);

    switch (selected) {
        case '-1': break;
        case '0': drawMask(); break;
        case '1': drawFace(); break;
        case '2': drawBrovi(); break;
        case '3': drawLips(); break;
    }
}

function drawMask() {

    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        imgFace.filter(ERODE);
        const wx = Math.abs(positions[13] [0] - positions[1] [0]) * 1.2;
        const wy = Math.abs(positions[7] [1] - Math.min(positions[16] [1], positions[20] [1])) * 1.2;
        translate(-wx/2, -wy/2);
        image(imgMask, positions [62] [0], positions [62] [1], wx, wy);
        pop();
    }
}

function drawFace() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13] [0] - positions[1] [0]) * 1.2;
        const wy = Math.abs(positions[7] [1] - Math.min(positions[16] [1], positions[20] [1])) * 1.2;
        translate(-wx/2, -wy/2);
        switch (selected1) {
            case '-1': break;
            case '0': image(imgFace, positions [62] [0], positions [62] [1], wx, wy); break;
            case '1': image(imgFace1, positions [62] [0], positions [62] [1], wx, wy); break;
            case '2': image(imgFace2, positions [62] [0], positions [62] [1], wx, wy); break;
        }
        pop();
    }
}

function drawBrovi() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13] [0] - positions[1] [0]) * 1.2;
        const wy = Math.abs(positions[7] [1] - Math.min(positions[16] [1], positions[20] [1])) * 1.2;
        translate(-wx/2, -wy/2);
        switch (selected1) {
            case '-1': break;
            case '0': image(imgBrovi, positions [33] [0], positions [33] [1], wx, wy); break;
            case '1': image(imgBrovi1, positions [41] [0], positions [41] [1], wx, wy); break;
            case '2': image(imgBrovi2, positions [33] [0], positions [33] [1], wx, wy); break;
            case '3': image(imgBrovi3, positions [33] [0], positions [33] [1], wx, wy); break;
        }
        
        pop();
    }
}

function drawLips() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13] [0] - positions[1] [0]) * 1.2;
        const wy = Math.abs(positions[7] [1] - Math.min(positions[16] [1], positions[20] [1])) * 1.2;
        translate(-wx/2, -wy/2);
        image(imgLips, positions [47] [0], positions [47] [1], wx, wy);
        pop();
    }
}

function windowResized() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputHeight = maxWidth * 0.75;
    outputWidth = maxWidth;
    resizeCanvas ( );
}