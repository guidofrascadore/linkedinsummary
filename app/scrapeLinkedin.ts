import { PuppeteerCrawler, Dataset } from 'crawlee';

interface LinkedInExperience {
    title: string;
    company: string;
    duration: string;
    description: string;
}

const crawler = new PuppeteerCrawler({
    async requestHandler({ page, request, log }) {
        log.info(`Processing ${request.url}...`);

        // Attendi il caricamento del contenuto
        await page.waitForSelector('.pvs-list__container');

        const experiences: LinkedInExperience[] = await page.evaluate(() => {
            const items = document.querySelectorAll('.pvs-list__container .artdeco-list__item');
            return Array.from(items).map(item => {
                const title = item.querySelector('span[aria-hidden="true"]')?.textContent?.trim() || '';
                const company = item.querySelectorAll('span[aria-hidden="true"]')[1]?.textContent?.trim() || '';
                const duration = item.querySelector('span.t-normal')?.textContent?.trim() || '';
                const description = item.querySelector('.pvs-list__outer-container .pvs-list__item-container')?.textContent?.trim() || '';

                return { title, company, duration, description };
            });
        });

        log.info('Extracted experiences:', experiences);

        // Salva i risultati
        await Dataset.pushData({
            url: request.url,
            experiences: experiences,
        });
    },
    failedRequestHandler({ request, log }) {
        log.error(`Request ${request.url} failed too many times`);
    },
});

// Funzione principale
async function extractLinkedInExperiences(profileUrl: string) {
    await crawler.run([
        `${profileUrl}/details/experience/`,
    ]);

    const dataset = await Dataset.open();
    const { items } = await dataset.getData();
    console.log('Extracted data:', items);
}

// NON eseguire questa funzione senza autorizzazione esplicita
// runCrawler('https://www.linkedin.com/in/username');

export { extractLinkedInExperiences };