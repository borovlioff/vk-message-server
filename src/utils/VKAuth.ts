import puppeteer from "puppeteer";

export default async function login({ email, password }: { email: string; password: string }) {
    try {
      const browser = await puppeteer.launch({});
      const page = await browser.newPage();

      await page.goto("https://vk.com/");

      await page.focus(`#index_email`);
      await page.keyboard.type(email);
      await page.focus(`#index_pass`);
      await page.keyboard.type(password);
      await page.click(`#index_login_button`);
      await page.waitForNavigation();

      await page.goto(
        `https://oauth.vk.com/authorize?client_id=6121396&scope=1073737727&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1`
      );
      await page.click(`button.button_indent`);

      let url = page.url();
      let urlToken = url.match(/access_token%253D.*%2526expires_in/);
      if(urlToken![0]){
        let token = urlToken![0];
        token = token.replace(`access_token%253D`, ``);
        token = token.replace(`%2526expires_in`, ``);
        return token;
      } else {
        throw new Error(`Token not found`)
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
