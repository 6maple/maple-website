import './proxy-undici';

import { readFile, writeFile } from 'fs/promises';
import { GoogleGenAI } from '@google/genai';
import { createMD, setupMD } from '@repo/markdown-core';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: 'AIzaSyBFOtPQAT9VXyBgkAxVndyLP7mEwuFBPHQ',
});

run();

async function run() {
  const data = await readFile('./data.txt', 'utf8');
  const [systemInstruction, userInstruction] = data.split('>>>>>');
  const res = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInstruction,
    config: {
      systemInstruction,
    },
  });
  const jsonData = JSON.parse(res.text!);
  const md = createMD();
  setupMD(md);
  for (const item of jsonData) {
    item.question = await md.renderAsync(item.question);
    item.answer = await md.renderAsync(item.answer);
  }

  await writeFile('./output.json', JSON.stringify(jsonData, null, 2), {
    encoding: 'utf8',
  });
}
