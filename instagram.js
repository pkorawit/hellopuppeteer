const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/explore/tags/phuket/', { waitUntil: 'networkidle2' });

    const nodes = await page.evaluate(() => {
        const images = document.querySelectorAll(`a > div > div.KL4Bh > img`)
        return [].map.call(images, img => img.src)
    })

    console.log(nodes);
    
    await browser.close();
})();

