/*
 * 1. Render songs => ok
 * 2. Scroll top => ok
 * 3. Play / pause / seek => ok
 * 4. CD rotate => ok
 * 5. Next / prev => ok
 * 6. Random 
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'phanbao'
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
  currentIndex: 0,
  isPLaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Infinite",
      singer: "Valence",
      path: "./assets/music/Infinite.mp3",
      image: "./assets/img/Infinite.jpg",
    },
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
      path: "./assets/music/Firefly.mp3",
      image: "./assets/img/Firefly.jpg",
    },
    {
      name: "Flares",
      singer: "NIVIRO",
      path: "./assets/music/Flares.mp3",
      image: "./assets/img/Flares.jpg",
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
  setConfig: function (key,value) {
    this.config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
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
    playlist.innerHTML = htmls.join("");
  },

  handleEvents: function() {
    const _this = this

    //====================================================
    //=====================play-pause=====================
    //====================================================

    //xử lý play song
    playBtn.onclick = () => {
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
      cdThumbAnimate.play() //cho cd rotate
    }

    // khi song đc tắt
    audio.onpause = () => {
      _this.isPLaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause() //dung cd rotate
    }

    //====================================================
    //===================progress bar=====================
    //====================================================

    let isSeeking = false;

    //khi bắt đầu sờ vào thanh trượt(progress)
    progress.onmousedown = () => {
      isSeeking = true
    }
    progress.ontouchstart = () => {
      isSeeking = true
    }

    //khi tiến độ bài hát thay đổi
    audio.ontimeupdate = () => {
      if (audio.duration && !isSeeking) {
        const progressPercent = (Math.floor(audio.currentTime / audio.duration * 100))
        progress.value = progressPercent
      }
    }

    //xử lý khi tua song
    progress.onchange = (e) => {
      const seek = e.target.value / 100 * audio.duration
      audio.currentTime = seek
      isSeeking = false
    }

    //====================================================
    //===================progress bar=====================
    //====================================================

    //xử lý cd quay và dừng
    const cdThumbAnimate = cdThumb.animate([
      {transform: 'rotate(360deg)'}
    ],{
      duration: 10000,
      iterations: Infinity
    })
    cdThumbAnimate.pause()

    //====================================================
    //===================next, pre song===================
    //====================================================

    //xử lý khi nhấn nút next
    nextBtn.onclick = () => {
      if(_this.isRandom) {
        _this.randomSong()
      }else {
        _this.nextSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //khi ấn nút pre
    preBtn.onclick = () => {
      if(_this.isRandom) {
        _this.randomSong()
      }else {
        _this.preSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    //====================================================
    //===================random song======================
    //====================================================

    //khi ấn nút random
    //CACH1
    // randomBtn.onclick = () => {
    //   if(_this.isRandom) {
    //     randomBtn.classList.remove('active')
    //     _this.isRandom = false
    //   }
    //   else {
    //     _this.isRandom = true
    //     randomBtn.classList.add('active')
    //   }
    // }

    //CACH 2
    randomBtn.onclick = () => {
      _this.isRandom = !_this.isRandom
      _this.setConfig('isRandom', _this.isRandom)
      randomBtn.classList.toggle('active', _this.isRandom)
    }

    //====================================================
    //================next-repeat at end==================
    //====================================================

    //xử lý khi end song
    audio.onended = () => {
      if(_this.isRepeat) {
        audio.play()
      } else {
        nextBtn.click()
      }
    }

    //xử lý nút repeat
    repeatBtn.onclick = () => {
      _this.isRepeat = !_this.isRepeat
      _this.setConfig('isRepeat', _this.isRepeat)
      repeatBtn.classList.toggle('active', _this.isRepeat)
    }

    //handle-song-selection
    playlist.onclick = (e) => {
      const songNode = e.target.closest('.song:not(.active)')
      if (songNode || e.target.closest('.option')){
        //xử lý khi click vào xong
          if (songNode){
            _this.currentIndex = Number(songNode.dataset.index)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
          }

          //xử lý khi nhấn vào nút option
          if(e.target.closest('.option')){

          }
      }
    }
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {       //Object.defineProperty(obj, prop, descriptor)
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },

  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }, 300)
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  loadConfig: function() {
    this.isRandom = this.config.isRandom
    this.isRepeat = this.config.isRepeat
  },

  displayActivebtn: function() {
    repeatBtn.classList.toggle('active', this.isRepeat)
    randomBtn.classList.toggle('active', this.isRandom)
  },

  nextSong: function() {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  preSong: function() {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },

  randomSong: function() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },

  start: function() {
    //gán cấu hình config
    this.loadConfig()
    this.displayActivebtn()
    //định nghĩa các thuộc tính của obj
    this.defineProperties()

    //lắng nghe xử lý các sự kiện (DOM event )
    this.handleEvents()

    //render playlist trước để có DOM .song
    this.render()

    //tải thông tin bài hát đầu tiên khi chạy
    this.loadCurrentSong()
  },
}
app.start()
