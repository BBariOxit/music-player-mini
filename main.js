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


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    songs: [
        {
            name: 'Control',
            singer: 'Unknown Brain, Rival, Jex',
            path: './assets/music/control.mp3', 
            image: './assets/img/control.png' 
        },
        {
            name: 'Dreams',
            singer: 'Lost Sky',
            path: './assets/music/Dreams.mp3',
            image: './assets/img/Dreams.png'
        },
        {
            name: 'Feel Good',
            singer: 'Syn Cole',
            path: './assets/music/Feel good.mp3',
            image: './assets/img/Feel good.png'
        },
        {
            name: 'Firefly',
            singer: 'Jim Yosef',
            path: './assets/music/Firely.mp3',
            image: './assets/img/Firefly.png'
        },
        {
            name: 'Flares',
            singer: 'NIVIRO',
            path: './assets/music/Flares.mp3',
            image: './assets/img/Flares.png'
        },
        {
            name: 'Infinite',
            singer: 'Valence',
            path: './assets/music/Infinite.mp3',
            image: './assets/img/Infinite.png'
        },
        {
            name: "Let's Go!",
            singer: 'Lensko',
            path: './assets/music/Lets go.mp3',
            image: './assets/img/Lets go.png'
        },
        {
            name: 'Link',
            singer: 'Jim Yosef',
            path: './assets/music/Link.mp3',
            image: './assets/img/Link.png'
        },
        {
            name: 'Royalty',
            singer: 'Alltair, Wiguez, Maestro Chives, Egzod',
            path: './assets/music/Royalty.mp3',
            image: './assets/img/Royalty.png'
        },
        {
            name: 'Where We Started',
            singer: 'Lost Sky, Jex',
            path: './assets/music/Where We Started.mp3',
            image: './assets/img/Where We Started.png'
        }
    ],
    
}
