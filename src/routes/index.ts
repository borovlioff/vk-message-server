import { Router } from "express";
const router = Router();

import * as VKController from "../controllers/VK";

const arr:any[] = [];
let log = [];
function setHandlerLog(fn:Function){
  const log = new Proxy(arr, {
    get(target, prop:any){
    return target[prop];
    },
    set(target, prop:any, value){
    fn(value);
    target[prop] = value;
    return true
    }
  })
  return log;
}



router.get("/", async (req, res) => {
  res.status(200).json({ message: 1 });
});

router.get("/account", async (req, res) => {
  try {
    let account = await  VKController.getAccount();
    res.status(200).json({ account });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


router.post("/account", async (req, res) => {
  const { username, password }:{ username: string; password: string }  = req.body;
  try {
    let response = await  VKController.addAccount({ username, password });
    res.status(200).json( response );
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
  
});

router.put("/account/:id", async (req, res) => {
  const { id }: { id:number } = req.body;
  try {
    let response = await  VKController.updateToken(id);
    res.status(200).json( response );
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
  
});

router.delete("/account/:id", async (req, res) => {
  const id = req.params.id;
  const idToNumber = parseInt(id);
  try {
      let response = await  VKController.deliteAccount(idToNumber);
      res.status(200).json({message: response})
 
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
  
});


router.post("/message", async (req, res) => {
  const { username, message, recipientId, proxy } = req.body;
  let response = await  VKController.sendMessage({ username, message, recipientId, proxy });
  log.push(response);
  res.status(200).json({ messageId:response });
});

router.post("/message/mailing", async (req, res) => {
  try {
    const { username, message, recipientId, proxy } = req.body;
    let result = VKController.mailing(username, message, recipientId, proxy);
    res.status(200).json({ message : "mailing"})
  } catch (error) {
    console.error(error);
  }
});

router.post("/message/ddos", async (req, res) => {
  try {
    let { username, message, recipientId, count, proxy } = req.body;
    VKController.ddos(username, message, recipientId,count, proxy);
    res.status(200).json({ message : "ddos"})
  } catch (error) {
    console.error(error);
  }
});

router.get(`/event`, async (req,res)=>{
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  let id = 0;
  log = setHandlerLog((value:string)=>{
    res.write(`${id++}:${value}`)
  })

  // setInterval(()=>{
  //   res.write(`event: message\nid: ${id++}\nretry: 5000\ndata: ss\n\n`)
  // }, 3000)
  req.on('close', () => {
    res.end()
    console.log('Client closed the connection.')
  })
})
export default router;
