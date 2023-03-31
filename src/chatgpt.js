require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

exports.answer = async (requestText, systemText = "") => {
  const HISTORY_PATH = "history.log";
  let responseText = "";
  let historyLog = [];
  if (fs.existsSync(HISTORY_PATH)) {
    historyLog = JSON.parse(fs.readFileSync(HISTORY_PATH, "utf8"));
  } else {
    if (systemText) {
      historyLog.push({ role: "system", content: systemText });
    }
  }
  historyLog.push({ role: "user", content: requestText });
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: historyLog,
  });
  responseText = completion.data.choices[0].message.content;
  historyLog.push({ role: "assistant", content: responseText });
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(historyLog));
  return responseText;
};

if (require.main === module) {
  (async() => {
    const res = await this.answer("夜しっかり寝ても日中眠いのはなぜ？", "女の子2人の会話風に説明をしてください。無知なAの質問に対して博識なBが回答する形で話してください。Aの名前は△△△です。Bの名前は○○○です。");
    console.log(res);
  })();  
}