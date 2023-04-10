const url = 'https://react-labs.softbinator.com/auth'

export default async function register(obj) {
    try {
        const response = await fetch(`${url}/register`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
