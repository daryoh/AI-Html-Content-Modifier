import * as cheerio from "cheerio";
import { rewriteText, generateImage } from "./index";
import dotenv from "dotenv";

dotenv.config();

export const processContent = async (
  content: string,
  siteName: string,
  keywords: string[],
): Promise<string> => {
  const $ = cheerio.load(content);

  const htmlElements = $(
    "p, h1, h2, h3, h4, h5, h6, span, div, a, li, ul, ol, table, th, td",
  );
  for (const element of htmlElements) {
    const elementText = $(element).text();
    if (elementText) {
      const rewrittenText = await rewriteText(elementText, siteName, keywords);
      $(element).text(rewrittenText);
    }
  }

  const imageElements = $("img");
  for (const element of imageElements) {
    const altText = $(element).attr("alt") || "default image";
    if (altText) {
      const rewrittenImage = await generateImage(altText, siteName, keywords);
      $(element).attr("src", rewrittenImage);
    }
  }
  return $.html();
};
