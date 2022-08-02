const music = new Audio('audio/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    }
    else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});


let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let pop_song = document.getElementsByClassName('pop_song')[0];


pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let item = document.getElementsByClassName('item')[0];


pop_art_right.addEventListener('click', () => {
    item.scrollLeft += 330;
});
pop_art_left.addEventListener('click', () => {
    item.scrollLeft -= 330;
});



const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105,105,105, .0)';
    })
}


let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `audio/arjit/${index}.mp3`;
        poster_master_play.src = `img/arjit/${index}.jpg`;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href = `audio/arjit/${index}.mp3`;
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss => {
            let { songName } = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    });
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerHTML = `${min2}:${sec2}`;


    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;

    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;

    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
})

next.addEventListener('click', () => {
    index++;
    if(index >Array.from(document.getElementsByClassName('songItem')).length){
        index=1;
    }
    music.src = `audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;

    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
});


let shuffle =document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click' ,()=>{
    let a = shuffle.innerHTML;
    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
    
        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});




const repeat_music = () =>{
    //index++;
    music.src = `audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

const random_music = () =>{
    if(index == songs.length)
    {
        index=1;
    }
    else{
        index = Math.floor((Math.random() * songs.length)+1);
    }
    music.src = `audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}


const next_music = () =>{
    if(index == songs.length)
    {
        index=1;
    }
    else{
        index++;
    }
    music.src = `audio/arjit/${index}.mp3`;
    poster_master_play.src = `img/arjit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit/${index}.mp3`;
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

music.addEventListener('ended' ,()=>{
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            break;
        case 'next':
            next_music();
            break;
        case 'random':
            random_music();
            break;
    }
})


const songs = [
    {
        id: '1',
        songName: `Aa Zara<br>
        <div class="subtitle">Murder 2</div>`,
        poster: "img/arjit/1.jpg"
    },
    {
        id: '2',
        songName: `Nashe Si Chadh Gayi<br>
        <div class="subtitle">Befikre</div>`,
        poster: "img/arjit/2.jpg"
    },
    {
        id: "3",
        songName: `Channa Mereya<br>
        <div class="subtitle">Ae Dil Hai Mushkil</div>`,
        poster: "img/arjit/3.jpg"
    },

    {
        id: "4",
        songName: `Dil Royi Jaye<br>
        <div class="subtitle">De De Pyaar De</div>`,
        poster: "img/arjit/4.jpg"
    },
    {
        id: "5",
        songName: `Haan Tu Hain<br>
        <div class="subtitle">jannat</div>`,
        poster: "img/arjit/5.jpg"
    },
    {
        id: "6",
        songName: `Milne Hai Mujhse Aayi<br>
        <div class="subtitle">Aashiqui 2</div>`,
        poster: "img/arjit/6.jpg"
    },
    {
        id: "7",
        songName: `ijazat<br>
        <div class="subtitle">One Night Stand</div>`,
        poster: "img/arjit/7.jpg"
    },
    {
        id: "8",
        songName: `Phir Mohabbat<br>
        <div class="subtitle">Murder 2</div>`,
        poster: "img/arjit/8.jpg"
    },
    {
        id: "9",
        songName: `Ae Watan<br>
        <div class="subtitle">Raazi</div>`,
        poster: "img/arjit/9.jpg"
    },
    {
        id: "10",
        songName: `Tum Hi Ho<br>
        <div class="subtitle">Aashiqui 2</div>`,
        poster: "img/arjit/10.jpg"
    },
    {
        id: '11',
        songName: `Tera Fitoor<br>
        <div class="subtitle">Genius</div>`,
        poster: "img/arjit/11.jpg"
    },
    {
        id: '12',
        songName: `Aashiqui aa gayi<br>
        <div class="subtitle">Radhe Shyam</div>`,
        poster: "img/arjit/12.jpg"
    },
    {
        id: "13",
        songName: `Tumse Bhi Jyada<br>
        <div class="subtitle">Tadap</div>`,
        poster: "img/arjit/13.jpg"
    },

    {
        id: "14",
        songName: `Raaz Aankhein teri<br>
        <div class="subtitle">Raaz Reboot</div>`,
        poster: "img/arjit/14.jpg"
    },
    {
        id: "15",
        songName: `Yaad Hai na<br>
        <div class="subtitle">Raaz Reboot</div>`,
        poster: "img/arjit/15.jpg"
    },
    {
        id: "16",
        songName: `Naina<br>
        <div class="subtitle">Dangal</div>`,
        poster: "img/arjit/16.jpg"
    },
    {
        id: "17",
        songName: `Zaalima<br>
        <div class="subtitle">Raees</div>`,
        poster: "img/arjit/17.jpg"
    },
    {
        id: "18",
        songName: `Roke Na Ruke Naina<br>
        <div class="subtitle">Badrinath ki Dulhaniya</div>`,
        poster: "img/arjit/18.jpg"
    },
    {
        id: "19",
        songName: `Jo Bheji thi Dua<br>
        <div class="subtitle">Shanghai</div>`,
        poster: "img/arjit/19.jpg"
    },
    {
        id: "20",
        songName: `Ami je Tomar<br>
        <div class="subtitle">Bhool Bhulaiyaa 2</div>`,
        poster: "img/arjit/20.jpg"
    },
    {
        id: "21",
        songName: `Ve Maahi<br>
        <div class="subtitle">Kesari</div>`,
        poster: "img/arjit/21.jpg"
    },
    {
        id: "22",
        songName: `Bekhayali<br>
        <div class="subtitle">Kabir Singh</div>`,
        poster: "img/arjit/22.jpg"
    },
    {
        id: "23",
        songName: `Tujhe Kitna Chahne Lage<br>
        <div class="subtitle">Kabir Singh</div>`,
        poster: "img/arjit/23.jpg"
    },


]



Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});



