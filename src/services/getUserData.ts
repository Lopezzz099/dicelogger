const getUserData = async (cookies: any) => {
  const session = cookies().get("Session")?.value
  const response = await fetch(process.env.URL + "/api/my", {
    headers: {
      'Cookie': `Session=${session}`
    }
  })
  const data = await response.json()
  if (!data.username) {
    throw new Error(data.message || 'Something went wrong!')
  }
  return data
}

export default getUserData