import { Request, Response } from "express";
import { processContent } from "../services";

/**
 * @swagger
 * /process-content:
 *   post:
 *     tags: [Processor-Routes]
 *     summary: Process HTML content
 *     description: Rewrites the text and modifies images in the provided HTML content based on the site name and keywords.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcessHtmlRequest'
 *     responses:
 *       200:
 *         description: HTML content successfully processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProcessHtmlResponse'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
export const processContentController = async (req: Request, res: Response) => {
  const { content, siteName, keywords } = req.body;
  if (!content || !siteName || !keywords) {
    res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const processedContent = await processContent(content, siteName, keywords);
    res.status(200).json({ processedContent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to process content", details: error });
  }
};
