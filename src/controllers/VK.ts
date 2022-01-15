import * as AccountService from "../services/VKAccount";
import VKSendMessage from "../services/VKSendMessage"
import VKAutchService from "../services/VkAuth"
    
    export async function sendMessage({username, message,recipientId, proxy}:{username:string, message:string, recipientId:number, proxy?:string}){
       try {
           let account = await AccountService.getByName(username);
           if(!account){ return {type:"Error", message:"Not fount account", code:404} }
        
            let message_response =  await VKSendMessage({token: account.token , message:message, recipientId:recipientId , proxy:proxy});
            if(!message_response){
               return {type:"Error", message:"Problem sending message"}
            }
            return message_response;
       } catch (error) {
           console.error(error)
           return {type:"Error", message:"Programm error"}
       }
    }

    export async function addAccount({username, password}:{username:string, password:string}){
        if(!username){ return  {message:"Useraname = null"} }
        if(!password){ return {message: "Password = null"}}
        try {
            let token = await VKAutchService({email:username, password:password}) as string;
            if(!token){ return {message:"Ошибка авторизации"} }
            let account = await AccountService.creat({username, password, token});
            return account
        } catch (error) {
            console.error(error)
        }
    }

    export async function updateToken(id:number){
        let user = await AccountService.getById(id);
        if(user){
            let token:string  = await VKAutchService({email: user.username, password: user.password}) as string;
            if(token){
                let account = await AccountService.update(id, {token})
                return account;
            }
        }
    }

    export async function deliteAccount(id:number){
        try {
            let account = await AccountService.remove(id);
            return account
        } catch (error) {
            console.error(error)
        }
    }

    export async function getAccount(){
        try {
            return await AccountService.get();
        } catch (error) {
            console.error(error);
        }
    }

    export async function mailing(username: string[], message: string, recipientId: number[], proxy?: string){
        let userIndex = 0;
        for (
            let recipientIndex = 0;
            recipientIndex < recipientId.length;
            recipientIndex++
          ) {
            let recipient = recipientId[recipientIndex];
            if (userIndex >= username.length) {
              userIndex = 0;
            }
            let user = username[userIndex];
      
            let response = await  sendMessage({
              username: user,
              message,
              recipientId: recipient,
              proxy:proxy,
            });
            userIndex++;
          }
    }
    export async function ddos(username: string[], message: string, recipientId: number, count:number, proxy?: string){
        try {
            if(!count){ count = 3}
            let startCount = 0;
            for (let userIndex = 0; startCount < count; userIndex++) {
            if(userIndex == username.length){ userIndex = 0;}
            let user = username[userIndex];
            let response = await  sendMessage({
                username: user,
                message,
                recipientId: recipientId,
                proxy: proxy,
            });
            startCount++;
            }
        } catch (error) {
            console.error(error)
        }
        
    }
