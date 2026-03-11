import { GoogleGenAI, ThinkingLevel } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAIClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === '__GEMINI_API_KEY_PLACEHOLDER__') {
      throw new Error("GEMINI_API_KEY is missing. Please ensure it is set in your Cloud Run environment variables.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function analyzeImage(
  fileData: string,
  mimeType: string,
  prompt: string,
  model: string = "gemini-3.1-pro-preview",
  useAgenticVision: boolean = false,
  useCodeExecution: boolean = false
) {
  try {
    const client = getAIClient();
    const config: any = {};
    if (useAgenticVision) {
      config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      config.systemInstruction = "You are an expert Schneider Electric systems engineer and diagnostic agent. Analyze the provided diagram step-by-step. Identify all components, trace connections, deduce the system's overall function, and point out any potential failure points or optimizations.";
    }
    if (useCodeExecution) {
      config.tools = [{ codeExecution: {} }];
    }

    const response = await client.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              data: fileData,
              mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: Object.keys(config).length > 0 ? config : undefined,
    });
    
    let fullText = "";
    const parts = response.candidates?.[0]?.content?.parts || [];
    
    for (const part of parts) {
      if (part.text) {
        fullText += part.text + "\n\n";
      }
      if (part.executableCode) {
        fullText += `**Generated Code:**\n\`\`\`${part.executableCode.language || 'python'}\n${part.executableCode.code}\n\`\`\`\n\n`;
      }
      if (part.codeExecutionResult) {
        fullText += `**Execution Output (${part.codeExecutionResult.outcome}):**\n\`\`\`text\n${part.codeExecutionResult.output}\n\`\`\`\n\n`;
      }
      if (part.inlineData) {
        fullText += `![Generated Image](data:${part.inlineData.mimeType};base64,${part.inlineData.data})\n\n`;
      }
    }
    
    return fullText.trim() || response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}
