export const getIsUserSubscribed = async (cookies: any) => {
  const cookie = cookies().get("Session")?.value 
  if (!cookie) return false
  try {
    const res = await fetch(process.env.URL + "/api/my/subscribed", {
      headers: {
        Cookie: `Session=${cookie}`
      }
    });
    if (res.ok) {
      return true
    } else throw new Error("User is not subscribed");
  } catch (error: any) {
    return false
  }
};