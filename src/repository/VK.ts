import Account from "../models/Account";
import db from "../configs/knex";


export function get(){
  return db("account").select<Account[]>("*") ;
}

export function getById(id:number){
  return db("account").where<Account>("id",id).first();
}


export function getByName(username:string){
  return db("account").where<Account>("username",username).first();
}

export function creat({ username, password, token }: { username: string, password: string, token?:string}) {
  return db("account").insert({ username: username, password: password, token , type:"vk"})
}

export function remove(id:number) {
  return db("account").where("id",id).del();
}

export function update(id:number, option: {[key:string]: string}) {
  return db("account").where<Account>("id",id).update(option);
}