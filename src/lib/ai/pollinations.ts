// Robust Pollinations.ai Integration
// Handles server-side generation with smart retries and fallbacks

interface ImageGenOptions {
  prompt: string;
}

// Helper: Wait for X ms
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generatePolImage({ prompt }: ImageGenOptions): Promise<string | null> {
  const seed = Math.floor(Math.random() * 1000000);
  const encodedPrompt = encodeURIComponent(`${prompt} highly detailed, cinematic, specimen archive`);

  // Fallback Strategy: 
  // 1. Flux (Best Quality)
  // 2. Turbo (Fastest / Most Reliable)
  // 3. Turbo Low-Res (Last Resort)
  const strategies = [
    { 
      name: "Flux (1024px)", 
      url: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux` 
    },
    { 
      name: "Turbo (1024px)", 
      url: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=turbo` 
    },
    { 
      name: "Turbo (512px)", 
      url: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true&model=turbo` 
    }
  ];

  for (const strategy of strategies) {
    try {
      console.log(`[Visual Cortex] Manifesting via ${strategy.name}...`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(strategy.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'SpecimenAI/1.0' }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Example: ${response.status} ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Convert to Base64
      return `data:image/jpeg;base64,${buffer.toString('base64')}`;

    } catch (error) {
      console.warn(`[Visual Cortex] Strategy ${strategy.name} failed:`, error);
      await delay(1000); // Brief pause before retry
    }
  }

  console.error("[Visual Cortex] All strategies exhausted.");
  return null;
}
