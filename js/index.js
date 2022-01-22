//====== Constants ======//
const R_EARTH = 1;                   //radius of the Earth (AU)
const R_MOON = 0.2727;               //normalized radius of the Moon
const S_SATELLITE = 0.45;            //normalized side dimension of the Satellite
const ALTITUDE = 0.4                 //normalized distance from Satellite to Earth
const DIST_EARTH_TO_MOON = 10;       //normalized distance from Earth to Moon
const ARCSEC = 2 * Math.PI / 60;
const ARCMSEC = 2 * Math.PI / 60000;

//======= Objects =======//
const scene = {
    originX: NaN,
    originY: NaN,
    pxpr: NaN            //pixels per Earth radius
}

const earth = {
    x: NaN,
    y: NaN,
    r: NaN
}

const moon = {
    x: NaN,
    y: NaN,
    r: NaN
}

const satellite = {
    x: NaN,
    y: NaN,
    s: NaN,
    r: NaN,              //radius of orbit around Earth
    theta: NaN           //angle relative to vertical (radians)
}

//======== Assets ========//
const imgEarth = new Image();
const imgMoon = new Image();
const imgSatelliteOn = new Image();
const imgSatelliteOff = new Image();
imgEarth.src = './img/earth.png';
imgMoon.src = './img/moon.png';
imgSatelliteOn.src = './img/hubble-on.png';
imgSatelliteOff.src = './img/hubble-off.png';

//========= Main =========//
const canvas = document.getElementById('space');

// check for canvas
if (!canvas.getContext) {
    // TODO: display message for browsers where canvas is not supported
    throw new Error('Browser does not support a canvas');
}

// get context
let ctx = canvas.getContext('2d');

// handle controls
let paused = true;
let instructions = true;
document.addEventListener('keydown', keyHandler, false);
document.addEventListener('click', clickHandler, false);

// handle canvas sizing
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize)

// initialize aladin
let redrawAladin = true;
let aladin = A.aladin('#snapshot', 
                        {
                            target: 'Bol 10',
                            survey: 'P/DSS2/color',
                            fov: 6,
                            showReticle: false,
                            showZoomControl: false,
                            showLayersControl: false,
                            showGotoControl: false,
                            showFrame: false
                        });
aladin.setFovRange(1, 12)

// set canvas and begin animation loop
resize();

//==== Event Handlers ====//
// start/stop live image when spacebar is pressed
function keyHandler(e) {
    if (e.code == 'Space') {
        snap()
    }
}

// start/stop live image when anything except aladin or links are clicked
function clickHandler(e) {
    let snapshotWindow = document.getElementById('snapshot');
    let contactLinks = document.getElementById('contact-links');
    if (e.target !== snapshotWindow && 
        e.target !== contactLinks && 
        !snapshotWindow.contains(e.target) && 
        !contactLinks.contains(e.target)) {
        snap()
    }
}

//======= Functions ======//
// converts polar to Cartesian coordinates
function pol2cart(r, theta) {
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

// snaps a photo at current location
function snap() {
    paused = !paused;
    if (instructions) {
        document.getElementById('instructions').style.visibility = "hidden";
    }
}

// updates Satellite position based on current time
function update() {
    // set angle around Earth
    const time = new Date();
    satellite.theta = ARCSEC * time.getSeconds() + ARCMSEC * time.getMilliseconds();

    // convert radius and angle to position
    const offsetXY = pol2cart(satellite.r, satellite.theta)
    satellite.x = earth.x + offsetXY[0]
    satellite.y = earth.y + offsetXY[1]
}

// draws objects on canvas
function draw() {
    // request another animation frame early
    window.requestAnimationFrame(draw)

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw earth
    ctx.drawImage(imgEarth, earth.x - earth.r, earth.y - earth.r, earth.r*2, earth.r*2);

    // draw moon
    ctx.drawImage(imgMoon, moon.x - moon.r, moon.y - moon.r, moon.r*2, moon.r*2);

    // draw satellite
    update()
    ctx.save();
    ctx.translate(earth.x, earth.y);
    ctx.rotate(satellite.theta);
    ctx.translate(0, -satellite.r);
    if (paused) {
        ctx.drawImage(imgSatelliteOff, -satellite.s/2, -satellite.s/2, satellite.s, satellite.s);
    } else {
        ctx.drawImage(imgSatelliteOn, -satellite.s/2, -satellite.s/2, satellite.s, satellite.s);
    }
    ctx.restore();

    // update aladin
    redrawAladin = !redrawAladin
    if (!paused && redrawAladin) {
        // const ra = 176 + Math.sign(satellite.theta-Math.PI) * 90;
        const ra = satellite.theta * 180/Math.PI;
        const dec = Math.cos(satellite.theta) * 90;
        aladin.gotoRaDec(ra, dec);
    }
}

// updates canvas when resized or orientation changed
function resize() {
    // update canvas and origin
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scene.originX = canvas.width/2;
    scene.originY = canvas.height/2;

    // turn up image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.oImageSmoothingEnabled = true;

    // set px per Earth radius and calculate size of objects
    scene.pxpr = Math.min(canvas.width, canvas.height) / (DIST_EARTH_TO_MOON - R_EARTH - R_MOON);
    earth.r = R_EARTH * scene.pxpr;
    moon.r = R_MOON * scene.pxpr;
    satellite.s = S_SATELLITE * scene.pxpr;
    satellite.r = ALTITUDE * scene.pxpr + earth.r;

    // determine new Earth and Moon positions
    const diag = Math.sqrt(canvas.width**2 + canvas.height**2);
    const radialOffset = DIST_EARTH_TO_MOON * scene.pxpr / 2;
    const offsetX = radialOffset / diag * canvas.width;
    const offsetY = radialOffset / diag * canvas.height;

    // set Earth and Moon positions
    earth.x = scene.originX - offsetX + earth.r;
    earth.y = scene.originY + offsetY - earth.r;

    moon.x = scene.originX + offsetX - moon.r;
    moon.y = scene.originY - offsetY + moon.r;

    // redraw
    draw();
}
