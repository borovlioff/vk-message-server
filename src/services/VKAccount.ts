import * as AccountRepository from "../repository/VK";

export async function creat({
  username,
  password,
  token,
}: {
  username: string;
  password: string;
  token?: string;
}) {
  let response = await AccountRepository.creat({ username, password, token });
  if (!response) {
    return { message: "Не удалось сохранить аккаунт" };
  }
  let id = response[0];
  return { id, username };
}

export async function get() {
  let response = await AccountRepository.get();
  let accounts = response.map((account) => {
    return { username: account.username, id: account.id };
  });
  return accounts;
}

export async function getById(id: number) {
  return await AccountRepository.getById(id);
}

export async function getByName(username: string) {
  return await AccountRepository.getByName(username);
}

export async function update(id: number, option: Record<string, any>) {
  return await AccountRepository.update(id, option);
}

export async function remove(id: number) {
  return await AccountRepository.remove(id);
}
