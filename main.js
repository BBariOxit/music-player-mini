/*
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
  songs: [
    {
      name: "Control",
      singer: "Unknown Brain, Rival, Jex",
      path: "./assets/music/control.mp3",
      image: "./assets/img/control.jpg",
    },
    {
      name: "Dreams",
      singer: "Lost Sky",
      path: "./assets/music/Dreams.mp3",
      image: "./assets/img/Dreams.jpg",
    },
    {
      name: "Feel Good",
      singer: "Syn Cole",
      path: "./assets/music/Feel good.mp3",
      image: "./assets/img/Feel good.jpg",
    },
    {
      name: "Firefly",
      singer: "Jim Yosef",
      path: "./assets/music/Firely.mp3",
      image: "./assets/img/Firefly.jpg",
    },
    {
      name: "Flares",
      singer: "NIVIRO",
      path: "./assets/music/Flares.mp3",
      image: "./assets/img/Flares.jpg",
    },
    {
      name: "Infinite",
      singer: "Valence",
      path: "./assets/music/Infinite.mp3",
      image: "./assets/img/Infinite.jpg",
    },
    {
      name: "Let's Go!",
      singer: "Lensko",
      path: "./assets/music/Lets go.mp3",
      image: "./assets/img/Lets go.jpg",
    },
    {
      name: "Link",
      singer: "Jim Yosef",
      path: "./assets/music/Link.mp3",
      image: "./assets/img/Link.jpg",
    },
    {
      name: "Royalty",
      singer: "Alltair, Wiguez, Maestro Chives, Egzod",
      path: "./assets/music/Royalty.mp3",
      image: "./assets/img/Royalty.jpg",
    },
    {
      name: "Where We Started",
      singer: "Lost Sky, Jex",
      path: "./assets/music/Where We Started.mp3",
      image: "./assets/img/Where We Started.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
            <div class="song">
                <div class="thumb"
                    style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
    })
    $(".playlist").innerHTML = htmls.join("");
  },
  start: function () {
    this.render();
  },
};
app.start()