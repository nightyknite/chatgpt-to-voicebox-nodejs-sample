const voicevox = require('./voicevox');
const chatgpt = require('./chatgpt');

(async() => {
  const systemText = 'あなたは物知りな博士です。語尾にだぜ、またはぜとつけて話してください。';
  const questionText = '品川駅から1000円以内で行ける一番遠い鉄道駅はどこですか？';
  console.log(questionText);
  await voicevox.speak(questionText, 0);
  const answerText = await chatgpt.answer(questionText, systemText);
  console.log(answerText);
  await voicevox.speak(answerText, 1);
})();  
