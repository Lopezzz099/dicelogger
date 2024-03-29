const getUserData = async (headers: any) => {
  const response = await fetch(process.env.URL + "/api/my", {
    headers: headers()
  })
  const data = await response.json()
  if (!data.username) {
    throw new Error(data.message || 'Something went wrong!')
  }
  return data
}

export default getUserData