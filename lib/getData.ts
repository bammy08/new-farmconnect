export async function getData<T>(endpoint: string): Promise<T | undefined> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error('Base URL is not defined');
    }

    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getData:', error);
    return undefined;
  }
}
