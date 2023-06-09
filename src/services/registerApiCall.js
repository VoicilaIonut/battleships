const url = "https://react-labs.softbinator.com/auth";

export default async function register(obj) {
  try {
    const response = await fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    return false;
  }
}
