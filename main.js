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

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playbtn = $('.btn-toggle-play')
const player = $('.player')

const app = {
  currentIndex: 0,
  isPLaying: false,
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

  handleEvents: function() {
    const cdWidth = cd.offsetWidth
    const _this = this
    
    //xử lý phóng to thu nhỏ cd
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth / cdWidth
    } 

    //xử lý play song
    playbtn.onclick = () => {
      if (_this.isPLaying) {
        audio.pause()
      }
      else {
        audio.play()
      }
    }

    //khi song đc play
    audio.onplay = () => {
      _this.isPLaying = true
      player.classList.add('playing')
    }

    // khi song đc tắt
    audio.onpause = () => {
      _this.isPLaying = false
      player.classList.remove('playing')
    }
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {       //Object.defineProperty(obj, prop, descriptor)
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },

  loadCurrentSong: function() {

    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  start: function() {
    //định nghĩa các thuộc tính của obj
    this.defineProperties()

    //lắng nghe xử lý các sự kiện (DOM event )
    this.handleEvents()

    //tải thông tin bài hát đầu tiên khi chạy
    this.loadCurrentSong()

    //render playlist
    this.render()
  },
}
app.start()