// We use SDXL because it's reliable on the free tier. Flux is often too heavy.
const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

// Helper to wait
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateSpecimenImage(prompt: string): Promise<string | null> {
  let attempts = 0;
  const maxAttempts = 3; // Retry up to 3 times

  while (attempts < maxAttempts) {
    try {
      console.log(`[Attempt ${attempts + 1}] Contacting Visual Cortex...`);
      
      const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: {
             // SDXL specific best settings
             negative_prompt: "blur, low quality, distortion, watermark, text, signature",
             num_inference_steps: 25,
             guidance_scale: 7.5
          }
        }),
      });

      // --- HANDLE "MODEL LOADING" (503) ---
      if (response.status === 503) {
        const errorData = await response.json();
        const waitTime = errorData.estimated_time || 20; // Default to 20s if undefined
        
        console.log(`Model is cold. Warming up... waiting ${waitTime}s`);
        await sleep(waitTime * 1000); // Wait exactly as long as HF asks
        attempts++;
        continue; // Try again
      }

      if (!response.ok) {
        throw new Error(`HF Error: ${response.status} ${response.statusText}`);
      }

      // Success!
      const imageBlob = await response.blob();
      const arrayBuffer = await imageBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString("base64");
      return `data:image/jpeg;base64,${base64}`;

    } catch (error) {
      console.error("Visual Cortex Connection Failed:", error);
      // Only return null if we've exhausted retries
      if (attempts === maxAttempts - 1) return null;
      attempts++;
    }
  }

  return null;
}