import { VK, getRandomId } from 'vk-io';
import textGenerator from '../utils/textGenerator';
const HttpsProxyAgent = require('https-proxy-agent');


export default async function VKSendMessage({ token , message , recipientId , proxy}:{ token:string, message: string, recipientId:number, proxy?:string}){
    try {
        let text = textGenerator({text:message})
        let agent;
        if(proxy){
            agent = HttpsProxyAgent(proxy);
        }
        const vk = new VK({ token: token, agent:agent  })
        const messageId = await vk.api.messages.send({
            user_id: recipientId,
            message: text,
            random_id: getRandomId()
        });
        return messageId;
    } catch (error) {
      console.error(error)
      return null;
    }
}