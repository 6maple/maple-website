import { ProxyAgent, setGlobalDispatcher } from 'undici';

// 设置你的代理地址
const proxyAgent = new ProxyAgent('http://127.0.0.1:7890');
setGlobalDispatcher(proxyAgent);
