export async function callTTS ({ data }) {
  return fetch('/api/tts', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(async response => {
    const data = await response.json()
    if (response.status === 200) {
      return {
        audioDataURL: `data:${data.format};base64,${data.audio}`
      }
    } else {
      throw new Error(data.message)
    }
  })
}
