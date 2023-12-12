import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const chunks = [];
    for (let i = 0; i < text.length; i += 1000) {
      const chunk = text.substring(i, i + 1000);
      chunks.push(chunk);
    }

    const embeddings = [] as number[];

    for (const chunk of chunks) {
      const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: chunk.replace(/\n/g, " "),
      });
      const result = await response.json();
      if (result) {
        result.data.forEach((embed: any) => {
          embeddings.push(embed.embedding);
        });
      }
    }

    return embeddings;
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
