const url = "https://react-labs.softbinator.com/auth";

export default async function login(obj) {
  try {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    console.log(json);

    localStorage.setItem("accessToken", json["accessToken"]);
    localStorage.setItem("refreshToken", json["refreshToken"]);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}
