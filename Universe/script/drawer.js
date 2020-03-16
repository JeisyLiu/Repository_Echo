import * as THREE from '../externsrc/build/three.module.js';

import { OrbitControls } from '../externsrc/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from '../externsrc/jsm/renderers/CSS2DRenderer.js';

var camera, scene, renderer, labelRenderer;

var clock = new THREE.Clock();
var textureLoader = new THREE.TextureLoader();
var stargeometry;
var particleSystem;
var particles = 100000;

var sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune, pluto;
var saturnring;

// Universal Data
// radius ( unit is mile )
var TRUE_SUN_RADIUS = 432376;
var TRUE_MERCURY_RADIUS = 1516;
var TRUE_VENUS_RADIUS = 3760;
var TRUE_EARTH_RADIUS = 3959;
var TRUE_MOON_RADIUS = 1080;
var TRUE_MARS_RADIUS = 2106;
var TRUE_JUPITER_RADIUS = 43441;
var TRUE_SATURN_RADIUS = 36184;
var TRUE_URANUS_RADIUS = 15759;
var TRUE_NEPTUNE_RADIUS = 15299;
var TRUE_PLUTO_RADIUS = 736;
// rotation and revolution speed (unit is (earthday)/round)
var MERCURY_ROTATION = 59;
var MERCURY_REVOLUTION = 88;
var VENUS_ROTATION = 243;
var VENUS_REVOLUTION = 224;
var EARTH_ROTATION = 1;
var EARTH_REVOLUTION = 365;
var MOON_ROTATOIN = 27;
var MOON_REVOLUTION = 27;
var MARS_ROTATION = 1;
var MARS_REVOLUTION = 686;
var JUPITER_ROTATION = .5;
var JUPITER_REVOLUTION = 12;
var SATURN_ROTATION = .5;
var SATURN_REVOLUTION = 29;
var URANUS_ROTATION = .8;
var URANUS_REVOLUTION = 30660;
var NEPTUNE_ROTATION = .7;
var NEPTUNE_REVOLUTION = 60115;
var PLUTO_ROTATION = 6;
var PLUTO_REVOLUTION = 90520;
// distance to sun
var MERCURY_PERIHELION = 3;
var VENUS_PERIHELION = 7;
var EARTH_PERIHELION = 10;
var MARS_PERIHELION = 14;
var JUPITER_PERIHELION = 50;
var SATURN_PERIHELION = 90;
var URANUS_PERIHELION = 182;
var NEPTUNE_PERIHELION = 298;
var PLUTO_PERIHELION = 340;

initplanets();
animate();
// 1 AU == 929560000 miles

function normalizeDistance(x) { // unit is Astronomical unit, transfer it to mile/ earth
    return x * 92956 / 100000;
}

function normalizeRadius(x) { // unit is mile transfer it to / earth
    return x / (TRUE_EARTH_RADIUS * 10);
}

function initplanets() {

    camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 5, 20);

    scene = new THREE.Scene();

    var sunlight = new THREE.HemisphereLight(0xCE2029);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);

    // var axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // stargeometry and material
    // sun
    var sunGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_SUN_RADIUS) / 5, 32, 32);
    var sunMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/sun_1277.png'),
        normalMap: textureLoader.load('../texture/planets/sun_normalmap.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // mercury
    var mercuryGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_MERCURY_RADIUS), 16, 16);
    var mercuryMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/mercury.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    scene.add(mercury);

    // venus
    var venusGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_VENUS_RADIUS), 16, 16);
    var venusMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/venus.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    venus = new THREE.Mesh(venusGeometry, venusMaterial);
    scene.add(venus);

    // earth
    var earthGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_EARTH_RADIUS), 32, 32);
    var earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/earth_atmos_2048.jpg'),
        specularMap: textureLoader.load('../texture/planets/earth_specular_2048.jpg'),
        normalMap: textureLoader.load('../texture/planets/earth_normal_2048.jpg'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // moon
    var moonGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_MOON_RADIUS), 16, 16);
    var moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load('../texture/planets/moon_1024.jpg')
    });
    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    // mars
    var marsGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_MARS_RADIUS), 16, 16);
    var marsMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/mars.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);

    // jupiter
    var jupiterGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_JUPITER_RADIUS), 16, 16);
    var jupiterMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/jupiter.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    scene.add(jupiter);

    // saturn
    var saturnGeometry = new THREE.SphereBufferGeometry(normalizeRadius(TRUE_SATURN_RADIUS), 16, 16);
    var saturnMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/saturn.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    scene.add(saturn);
    // saturn rings
    var saturnringGeometry = new THREE.RingBufferGeometry(normalizeRadius(TRUE_SATURN_RADIUS) * 1.1, normalizeRadius(TRUE_SATURN_RADIUS) * 1.5,
        100, 10, 0, 10);
    var saturnRingMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load('../texture/planets/saturnring.png'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    saturnring = new THREE.Mesh(saturnringGeometry, saturnRingMaterial);
    scene.add(saturnring);

    // stars
    var uniforms = {
        pointTexture: { value: new THREE.TextureLoader().load("../texture/sprites/spark1.png") }
    };
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
    });
    stargeometry = new THREE.BufferGeometry();
    var radius = 200;
    var positions = [];
    var colors = [];
    var sizes = [];
    var color = new THREE.Color();
    for (var i = 0; i < particles; i++) {
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);
        positions.push((Math.random() * 2 - 1) * radius);
        color.setHSL(i / particles, 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
        sizes.push(20);
    }
    stargeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    stargeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    stargeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
    particleSystem = new THREE.Points(stargeometry, shaderMaterial);
    scene.add(particleSystem);

    // label and div

    // sun div
    var sunDiv = document.createElement('div');
    sunDiv.className = 'label';
    sunDiv.textContent = 'Sun';
    sunDiv.style.marginTop = '-1em';
    var sunLabel = new CSS2DObject(sunDiv);
    sunLabel.position.set(0, normalizeRadius(TRUE_SUN_RADIUS) / 10, 0); // the sun is too large so I have to divide 10
    sun.add(sunLabel);
    // mercury div
    var mercuryDiv = document.createElement('div');
    mercuryDiv.className = 'label';
    mercuryDiv.textContent = 'mercury';
    mercuryDiv.style.marginTop = '-1em';
    var mercuryLabel = new CSS2DObject(mercuryDiv);
    mercuryLabel.position.set(0, normalizeRadius(TRUE_MERCURY_RADIUS), 0);
    mercury.add(mercuryLabel);
    // venus div
    var venusDiv = document.createElement('div');
    venusDiv.className = 'label';
    venusDiv.textContent = 'venus';
    venusDiv.style.marginTop = '-1em';
    var venusLabel = new CSS2DObject(venusDiv);
    venusLabel.position.set(0, normalizeRadius(TRUE_VENUS_RADIUS), 0);
    venus.add(venusLabel);
    // earth div
    var earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = 'Earth';
    earthDiv.style.marginTop = '-1em';
    var earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(0, normalizeRadius(TRUE_EARTH_RADIUS), 0);
    earth.add(earthLabel);
    // moon div
    var moonDiv = document.createElement('div');
    moonDiv.className = 'label';
    moonDiv.textContent = 'Moon';
    moonDiv.style.marginTop = '-1em';
    var moonLabel = new CSS2DObject(moonDiv);
    moonLabel.position.set(0, normalizeRadius(TRUE_MOON_RADIUS), 0);
    moon.add(moonLabel);
    // mars div
    var marsDiv = document.createElement('div');
    marsDiv.className = 'label';
    marsDiv.textContent = 'mars';
    marsDiv.style.marginTop = '-1em';
    var marsLabel = new CSS2DObject(marsDiv);
    marsLabel.position.set(0, normalizeRadius(TRUE_MARS_RADIUS), 0);
    mars.add(marsLabel);
    // jupiter div
    var jupiterDiv = document.createElement('div');
    jupiterDiv.className = 'label';
    jupiterDiv.textContent = 'jupiter';
    jupiterDiv.style.marginTop = '-1em';
    var jupiterLabel = new CSS2DObject(jupiterDiv);
    jupiterLabel.position.set(0, normalizeRadius(TRUE_JUPITER_RADIUS), 0);
    jupiter.add(jupiterLabel);
    // saturn div
    var saturnDiv = document.createElement('div');
    saturnDiv.className = 'label';
    saturnDiv.textContent = 'saturn';
    saturnDiv.style.marginTop = '-1em';
    var saturnLabel = new CSS2DObject(saturnDiv);
    saturnLabel.position.set(0, normalizeRadius(TRUE_SATURN_RADIUS), 0);
    saturn.add(saturnLabel);
    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = 0;
    document.body.appendChild(labelRenderer.domElement);

    var controls = new OrbitControls(camera, labelRenderer.domElement);
}

function animate() {

    requestAnimationFrame(animate);

    var elapsed = clock.getElapsedTime() / 10;

    // sun
    sun.rotation.y = 3 * elapsed;
    sun.rotation.x = 2 * elapsed;
    sun.rotation.z = elapsed;
    // mercury
    mercury.position.set(Math.sin(50 * elapsed / MERCURY_REVOLUTION) * normalizeDistance(MERCURY_PERIHELION),
        0, Math.cos(50 * elapsed / MERCURY_REVOLUTION) * normalizeDistance(MERCURY_PERIHELION));
    mercury.rotation.y = 50 * elapsed / MERCURY_ROTATION;
    // venus
    venus.position.set(Math.sin(50 * elapsed / VENUS_REVOLUTION) * normalizeDistance(VENUS_PERIHELION),
        0, Math.cos(50 * elapsed / VENUS_REVOLUTION) * normalizeDistance(VENUS_PERIHELION));
    venus.rotation.y = 50 * elapsed / VENUS_ROTATION;
    // earth
    earth.position.set(Math.sin(50 * elapsed / EARTH_REVOLUTION) * normalizeDistance(EARTH_PERIHELION), 0, Math.cos(50 * elapsed / EARTH_REVOLUTION) * normalizeDistance(EARTH_PERIHELION));
    earth.rotation.x = .3;
    earth.rotation.y = 50 * elapsed;
    // moon
    moon.position.set(Math.sin(50 * elapsed / MOON_REVOLUTION) * .3 + Math.sin(50 * elapsed / EARTH_REVOLUTION) * normalizeDistance(EARTH_PERIHELION),
        0, Math.cos(50 * elapsed / MOON_REVOLUTION) * .3 + Math.cos(50 * elapsed / EARTH_REVOLUTION) * normalizeDistance(EARTH_PERIHELION));
    moon.rotation.y = elapsed;
    // mars
    mars.position.set(Math.sin(50 * elapsed / MARS_REVOLUTION) * normalizeDistance(MARS_PERIHELION),
        0, Math.cos(50 * elapsed / MARS_REVOLUTION) * normalizeDistance(MARS_PERIHELION));
    mars.rotation.y = 50 * elapsed / MARS_ROTATION;
    // jupiter 
    jupiter.position.set(Math.sin(50 * elapsed / JUPITER_REVOLUTION) * normalizeDistance(JUPITER_PERIHELION),
        0, Math.cos(50 * elapsed / JUPITER_REVOLUTION) * normalizeDistance(JUPITER_PERIHELION));
    jupiter.rotation.y = 50 * elapsed / JUPITER_ROTATION;
    // saturn
    saturn.position.set(Math.sin(50 * elapsed / SATURN_REVOLUTION) * normalizeDistance(SATURN_PERIHELION),
        0, Math.cos(50 * elapsed / SATURN_REVOLUTION) * normalizeDistance(SATURN_PERIHELION));
    saturn.rotation.y = 50 * elapsed / SATURN_ROTATION;
    saturnring.position.set(Math.sin(50 * elapsed / SATURN_REVOLUTION) * normalizeDistance(SATURN_PERIHELION),
        0, Math.cos(50 * elapsed / SATURN_REVOLUTION) * normalizeDistance(SATURN_PERIHELION));
    // stars
    var time = Date.now() * 0.005;
    particleSystem.rotation.z = 0.001 * time;
    var sizes = stargeometry.attributes.size.array;
    for (var i = 0; i < particles; i++) {
        sizes[i] = 2 * (1 + Math.sin(0.01 * i + time));
    }
    stargeometry.attributes.size.needsUpdate = true;

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}
