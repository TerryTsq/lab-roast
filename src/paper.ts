import fs from 'fs/promises';
import path from 'path';

/**
 * 提取论文内容
 */
export async function extractPaper(input: string): Promise<{
  title: string;
  abstract?: string;
  content: string;
}> {
  // arXiv URL
  if (input.includes('arxiv.org')) {
    return extractFromArxiv(input);
  }

  // 本地 PDF 文件
  if (input.endsWith('.pdf')) {
    return extractFromPdf(input);
  }

  // 本地文本文件
  if (await fileExists(input)) {
    const content = await fs.readFile(input, 'utf-8');
    return {
      title: path.basename(input),
      content,
    };
  }

  // 直接当作文本内容
  return {
    title: '未知论文',
    content: input,
  };
}

/**
 * 从 arXiv 提取论文
 */
async function extractFromArxiv(url: string): Promise<{
  title: string;
  abstract?: string;
  content: string;
}> {
  // 提取 arXiv ID
  const match = url.match(/arxiv\.org\/(?:abs|pdf)\/(\d+\.\d+)/);
  if (!match) {
    throw new Error(`无效的 arXiv URL: ${url}`);
  }

  const arxivId = match[1];
  const apiUrl = `https://export.arxiv.org/api/query?id_list=${arxivId}`;

  const response = await fetch(apiUrl);
  const xml = await response.text();

  // 简单解析 XML
  const titleMatch = xml.match(/<title>([\s\S]*?)<\/title>/);
  const abstractMatch = xml.match(/<summary>([\s\S]*?)<\/summary>/);

  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : `arXiv:${arxivId}`;
  const abstract = abstractMatch ? abstractMatch[1].trim().replace(/\s+/g, ' ') : undefined;

  return {
    title,
    abstract,
    content: abstract || title,
  };
}

/**
 * 从 PDF 提取论文
 */
async function extractFromPdf(filePath: string): Promise<{
  title: string;
  abstract?: string;
  content: string;
}> {
  try {
    // 动态导入 pdf-parse
    const pdfParse = (await import('pdf-parse')).default;
    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);

    return {
      title: path.basename(filePath, '.pdf'),
      content: data.text,
    };
  } catch (error) {
    throw new Error(`PDF 解析失败: ${error}`);
  }
}

/**
 * 检查文件是否存在
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
