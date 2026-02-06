// Pollinations.ai (Base64 Mode)
// We fetch the image server-side to prevent Browser 403/CORS errors.

export async function generateSpecimenImage({ prompt }: { prompt: string }) {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 1000000);
    
    // 1. Construct URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
    
    // 2. Fetch the image data on the server
    // We add a timeout signal to prevent the 502 hanging if the API is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(imageUrl, { 
      signal: controller.signal,
      headers: {
        'User-Agent': 'SpecimenAI/1.0' // Polite header to avoid 403
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Pollinations API Error: ${response.status}`);
    }

    // 3. Convert to Base64
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    
    // 4. Return Data URI
    return `data:image/jpeg;base64,${base64}`;

  } catch (error) {
    console.error("Visual Cortex Error:", error);
    // If it fails, return a fallback placeholder so the app doesn't crash
    return `https://placehold.co/1024x1024/000000/FFFFFF/png?text=DATA+CORRUPT`;
  }
}