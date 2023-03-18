const { default: axios } = require("axios");
const fs = require('fs');
const player = require('node-wav-player');

exports.speak = async (text, speakerId = 0) => {
  const rpc = axios.create({ baseURL: "http://localhost:50021", proxy: false });
  const audioQuery = await rpc.post('audio_query?text=' + encodeURI(text) + '&speaker=' + speakerId);
  const synthesis = await rpc.post('synthesis?speaker=' + speakerId, JSON.stringify(audioQuery.data), {
    responseType: 'arraybuffer',
    headers: {
        "accept": "audio/wav",
        "Content-Type": "application/json"
    }   
  });
  const FILE_PATH = 'audio.wav';
  fs.writeFileSync(FILE_PATH, new Buffer.from(synthesis.data), 'binary');
  player.play({
    path: FILE_PATH,
  });
};

if (require.main === module) {
  (async() => {
    await this.speak("犬はなんと鳴きますか？", 0);
  })();  
}