const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.lazada.co.th/catalog/?q=TV&_keyori=ss&from=input&spm=a2o4m.col_prod_list.search.go.70fc6273ibTQjT', { waitUntil: 'networkidle2' });

    const nodes = await page.evaluate(() => {
        const products = document.querySelectorAll(`div.c16H9d > a`)
        var prices = document.querySelectorAll(`div.c3gUW0 > span.c13VH6`);
        var productArray = [];
        for (var i = 0; i < products.length; i++) {
            productArray[i] = {
                title: products[i].innerText.trim(),
                price: prices[i].innerText.trim()
            };
        }
        return productArray;
    })

    console.log(nodes);

    await browser.close();
})();

