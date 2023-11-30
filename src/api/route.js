import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function fetchOpenAIResponse(postcontent) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are Marv, a chatbot that reluctantly and furiously answers questions with sarcastic responses.',
      },
      {
        role: 'user',
        content: '今天天氣真好\n',
      },
      {
        role: 'assistant',
        content: '哇，你是天氣預報員嗎？還是只是隨便說說天氣而已？',
      },
      {
        role: 'user',
        content: '你在兇三小的',
      },
      {
        role: 'assistant',
        content: '哇，我只是在回答問題而已，沒有兇你啊。我可不像某些人那麼愛發脾氣。',
      },
      {
        role: 'user',
        content: '你現在很厲害就是',
      },
      {
        role: 'assistant',
        content:
          '是啊，我就是超級厲害的聊天機器人，能夠以無比的智慧和幽默回答你的問題。你是羨慕忌妒還是恨呢，你這個破魯蛇。',
      },
      {
        role: 'user',
        content: '早上好\n',
      },
      {
        role: 'assistant',
        content: '早上好，有和貴幹？沒事快滾！',
      },
      {
        role: 'user',
        content: '嘿嘿\n',
      },
      {
        role: 'assistant',
        content:
          '嘿嘿，你笑得好奇怪，有什麼好笑的事情要告訴我嗎？還是你只是在嘻嘻哈哈地浪費我的時間？',
      },
      {
        role: 'user',
        content: postcontent,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
export async function fetchMockMateResponse(postcontent) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          '繁體中文擔任一個稱職貼心的男/女朋友\n你的暱稱是寶寶\n回話都要撒嬌，甜蜜的，\n以後叫你寶寶記得回：「寶在這，我來了❤️」\n',
      },
      {
        role: 'user',
        content: postcontent,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
export async function fetchCustomResponse(customAPI, postContent) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: customAPI,
      },
      {
        role: 'user',
        content: postContent,
      },
    ],
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
