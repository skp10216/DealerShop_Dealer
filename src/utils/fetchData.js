export async function fetchData(url, data = {}, method = 'GET') {
  const headers = { 'Content-Type': 'application/json' };
    const config = { method, headers };
    
    if (method !== 'GET') {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);
        const responseData = await response.json(); // JSON 응답을 가정
        return { ok: response.ok, status: response.status, data: responseData };
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
