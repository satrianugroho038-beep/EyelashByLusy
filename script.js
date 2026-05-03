// LOADER
window.addEventListener("load",()=>{
document.getElementById("loader").style.display="none";
});

// NAVBAR HIDE
let lastScroll=0;
const navbar=document.getElementById("navbar");

window.addEventListener("scroll",()=>{
let current=window.pageYOffset;

if(current>lastScroll){
navbar.classList.add("hide");
}else{
navbar.classList.remove("hide");
}

lastScroll=current;

// REVEAL
document.querySelectorAll(".reveal").forEach(el=>{
let top=el.getBoundingClientRect().top;
if(top<window.innerHeight-100){
el.classList.add("active");
}
});

});

// MOBILE MENU
const toggle=document.getElementById("menuToggle");
const nav=document.getElementById("navMenu");

toggle.onclick=()=>{
nav.classList.toggle("active");
};

// 3D FOLLOW MOUSE
document.querySelectorAll(".card.artis").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    let x = e.offsetX;
    let y = e.offsetY;
    let centerX = card.offsetWidth/2;
    let centerY = card.offsetHeight/2;

    let rotateX = ((y - centerY)/10);
    let rotateY = ((x - centerX)/10);

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// AUTO WHATSAPP
document.querySelectorAll(".card-btn").forEach(btn=>{
  btn.addEventListener("click", function(){
    let card = this.closest(".card");
    let name = card.dataset.name;
    let price = card.dataset.price;

    let pesan = `Halo kak, saya mau booking ${name} (Rp${price}) 😊`;

    window.open(`https://wa.me/6289653423409?text=${encodeURIComponent(pesan)}`);
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".gallery-item img").forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", ()=>{
  lightbox.style.display = "none";
});

// KOORDINAT SALON (GANTI SESUAI LOKASI KAMU)
const salonLat = -6.2383;
const salonLng = 106.9756;

// INIT MAP
const map = L.map('map').setView([salonLat, salonLng], 15);

// TILE
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// CUSTOM ICON
const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40,40]
});

// MARKER
L.marker([salonLat, salonLng], {icon}).addTo(map)
  .bindPopup("Eyelash by Lusi 💜")
  .openPopup();


// GET USER LOCATION
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      
      let userLat = pos.coords.latitude;
      let userLng = pos.coords.longitude;

      // MARKER USER
      L.marker([userLat, userLng]).addTo(map)
        .bindPopup("Lokasi kamu")
        .openPopup();

      // LINE KE SALON
      L.polyline([
        [userLat, userLng],
        [salonLat, salonLng]
      ]).addTo(map);

      // HITUNG JARAK
      let distance = map.distance(
        [userLat, userLng],
        [salonLat, salonLng]
      ) / 1000;

      document.getElementById("jarak").innerHTML =
        "📏 Jarak ke salon: " + distance.toFixed(2) + " km";

      // OPEN GOOGLE MAPS
      window.open(`https://maps.app.goo.gl/8qxG8aDtPKd8QzL27${userLat},${userLng}/${salonLat},${salonLng}`);

    });
  }
}