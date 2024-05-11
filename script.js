// Add some interactivity to the website
const audioPlayer = document.getElementById("audioPlayer");
const playPauseButton = document.getElementById("play-pause-btn");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button");
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const coverImage = document.querySelector(".cover-image");
const playedTime = document.querySelector(".played-time");
const totalTime = document.querySelector(".total-time");
const progressBar = document.querySelector(".progress");

let currentSongIndex = 0;
let intervalId;
let currentTime = 0;

const playList = [
  {
    src: "music/lost-in-city-lights-145038.mp3",
    type: "audio/ogg",
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    cover: "images/cover-1.png",
  },
  {
    src: "music/forest-lullaby-110624.mp3",
    type: "audio/ogg",
    title: "Forest Lullaby",
    artist: "Lesfm",
    cover: "images/cover-2.png",
  },
];

function convertSecondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

const playPauseAudio = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.src = "images/pause_icon.svg";
  } else {
    audioPlayer.pause();
    playPauseButton.src = "images/play_icon.svg";
  }
};

const setSongAndPlay = (index) => {
  clearInterval(intervalId);
  currentTime = 0;
  audioPlayer.src = playList[index].src;
  audioPlayer.type = playList[index].type;
  songTitle.innerText = playList[index].title;
  songArtist.innerText = playList[index].artist;
  coverImage.src = playList[index].cover;
  audioPlayer.load(); // Load the new source
  setTimeout(() => {
    totalTime.innerText = convertSecondsToMinutes(
      Math.round(audioPlayer.duration)
    );
  }, 100);
};

const updateTimer = (duration) => {
  if (!audioPlayer.paused) {
    intervalId = setInterval(function () {
      currentTime++;
      playedTime.textContent = convertSecondsToMinutes(currentTime);

      updateProgressBar(currentTime, duration);
      if (currentTime === Math.round(duration)) {
        clearInterval(intervalId);
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
};

const updateProgressBar = (currentTime, duration) => {
  const progress = Math.round((currentTime / Math.round(duration)) * 100);
  progressBar.style.width = `${progress}%`;
};

const playNextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % playList.length;
  setSongAndPlay(currentSongIndex);
  playedTime.textContent = "00:00";
  progressBar.style.width = `0%`;
  playPauseButton.src = "images/pause_icon.svg";
  audioPlayer.play();
};
const playPreviousSong = () => {
  currentSongIndex = (currentSongIndex - 1 + playList.length) % playList.length;
  setSongAndPlay(currentSongIndex);
  playedTime.textContent = "00:00";
  progressBar.style.width = `0%`;
  playPauseButton.src = "images/pause_icon.svg";
  audioPlayer.play();
};

audioPlayer.addEventListener("playing", () => {
  updateTimer(audioPlayer.duration);
});
audioPlayer.addEventListener("pause", () => {
  clearInterval(intervalId);
});

audioPlayer.addEventListener("ended", () => {
  playNextSong();
});

const progress = document.querySelector(".progress-bar");
progress.addEventListener("click", (e) => {
  const progressPercentage = e.offsetX / progress.clientWidth;
  const duration = audioPlayer.duration;
  const seekTime = duration * progressPercentage;
  audioPlayer.currentTime = seekTime;
  currentTime = Math.ceil(seekTime);
  playedTime.textContent = convertSecondsToMinutes(Math.ceil(seekTime));
  progressBar.style.width = `${progressPercentage * 100}%`;
  clearInterval(intervalId);
});

playPauseButton.addEventListener("click", playPauseAudio);
nextButton.addEventListener("click", playNextSong);
previousButton.addEventListener("click", playPreviousSong);


setSongAndPlay(currentSongIndex);


