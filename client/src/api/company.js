import config from '../config'

// const getAllCompany = (company) => {
//     return fetch(config.serverUrl + '/api/company/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(company)
//     });
//   }

const getAllCompany = () => {
    return fetch(config.serverUrl + "/api/company/").then(res => res.json());
  }

export function showMsg(){
    const spanGreeting = document.querySelector("#showmsg");

    return fetch('/api/msg').then(res => res.json())
        .then(response => response.json())
        .then(json => spanGreeting.innerHTML = json.message);
}

export default {
    // getUsers,
    // getUserByUsername,
    // createUser
    getAllCompany,
    showMsg
};