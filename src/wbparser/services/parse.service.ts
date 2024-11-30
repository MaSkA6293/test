import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import Product from '../interfaces/Product.interface';
import puppeteer from 'puppeteer';

@Injectable()
export class PageParserService {
  constructor(private http: HttpService) {}

  async getData1(rivals) {
    const result = rivals.map(async (rival) => {
      const rivalData = rival.goods.map((goodId) => getCardData(goodId));

      const resultGoods = await Promise.all(rivalData).then((allGoods) => {
        console.log(allGoods);
        return { name: rival.name, cards: allGoods };
      });
      return resultGoods;
    });
    async function getCardData(pageId) {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      const url = `https://www.wildberries.ru/catalog/${pageId}`;
      await page.goto(url, { waitUntil: 'networkidle0' });

      const parsedCardDate = await page.evaluate(() => {
        const product = {} as Product;
        const finalPriceElement = document.querySelector(
          '.price-block__final-price',
        );
        const oldPriceElement = document.querySelector(
          '.price-block__old-price',
        );

        if (oldPriceElement && oldPriceElement.textContent)
          product.oldPrice = oldPriceElement.textContent.trim();

        if (finalPriceElement && finalPriceElement.textContent)
          product.finalPrice = finalPriceElement.textContent.trim();
        const date = new Date();
        const out = `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDay()}`;
        return { ...product, date: out };
      });

      await browser.close();
      return parsedCardDate;
    }
    return Promise.all(result);
  }
}
