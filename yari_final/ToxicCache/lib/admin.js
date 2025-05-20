const puppeteer = require('puppeteer');

module.exports = {
    func: async () => {
        let browser;
        try {
            browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            const setCookie = {
                name: 'cibrx-session',
                value: '4ec57727abee4a22bba6fb0fb414dd67',
                path: '/',
                domain: 'localhost',
                secure: false,
                httpOnly: false
            };
            await page.setCookie(setCookie);
            /*    
            await page.setExtraHTTPHeaders({
                'ngrok-skip-browser-warning': "69420",
            });
            */
            await page.goto('http://localhost:3000/blog');
                // Çerezleri kontrol et
    
            const cookies = await page.cookies();
            console.log('Çerezler:', cookies[1].name);
    
        } catch (err) {
            console.error(err);
        } finally {
            if (browser) {
                setTimeout(async () => {
                    await browser.close()
                }, 10_000)
            }
        }
        module.exports.called = true;
    
    },
    called: false,
}
