
import listTags from "./listTags";
// const fs = require('fs');

// const orderhive = new Orderhive({
//     db: {
//         host: "34.68.67.204",
//         port: 3306,
//         username: "vivoserver",
//         password: "5RnS=23a?m_Kd9n8MPGh",
//         database: "logistics",
//         encryptionKey: "umC2VAFvTnjaWpiYViPgkZWmtqt2KBQxfSkcCH4CjiYL2Ae2hdcUi7VzqKg7sz53rz28hnmhnDuU3Z6D9hSRjx5RSCDx39H5qm7qMA4dZfc9RW56buCMyg52TPjag7zG",
//         logging: false,
//     },
//     idToken: "eyJraWQiOiJkQlVPdGIyWnJNN1Jab1lHR2FUdDZaS25pemJpYUk2XC9rXC80dHNBUDZwdXc9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIyNmU5Mzc2Mi1lNThkLTQ0NzMtYTMyYi0zNjRiNDUxNDMwN2MiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1c1ZlJrQmdMaCIsImNvZ25pdG86dXNlcm5hbWUiOiI1MzI4MTIwMTktNDE2LTE1NTgwMTI0MDI2ODZAZGV2b3JkZXJoaXZlLmNvbSIsImN1c3RvbTp1c2VySWQiOiI1NDM4OCIsImN1c3RvbTp0ZW5hbnRJZCI6IjUzMjgxIiwiYXVkIjoiNWY1b2FiMmpuNTdsdGhkNW12Z3QyY2w0N3IiLCJldmVudF9pZCI6ImI0ZTM3NGNmLTJkOTktNGQ2ZS04ODBiLWRhMDE2ZjQ1YjI1OCIsImN1c3RvbTphcHBJZCI6IjIwMTktNDE2LTE1NTgwMTI0MDI2ODYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1NjAwMjM3MiwiZXhwIjoxNjU2MDA1OTcyLCJpYXQiOjE2NTYwMDIzNzIsImVtYWlsIjoiNTMyODEyMDE5LTQxNi0xNTU4MDEyNDAyNjg2QGRldm9yZGVyaGl2ZS5jb20ifQ.bJ55l_h5XAfeDAwc5zl1WZ785-23D_Z7CaY60MbldD--xHC9ER1SIE_J3hbG6N3TEeG_tiBjQjbND0fB7sz6pq6hoKN2oyqPiw00g7BnVUZ0l-cC_nccRmB4F342jhfwna7DYgNkB4Cpe9TWHq0KhHpp81-0qNeKOXh_ei_vM7dqBruzwMXYx8W-DvgXXvJ-kkqZsx86hTbrqwoAdigceerQ1XjGy0jQS9fQKfGdGe758mZxqFxY-YMRO00VybPPKYLHSPyPvX5EFyvJ7uqbsLiccA3WctezSQPDrpyrmU-fpd8l9H_PU1rk5cZzlRJ8ZbHTEH_YYjsuChsruIDjuQ",
//     refreshToken: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.fay_mkh6IE9UNCBfv-rizuOnnyaqQ1QBBOcWPhLoPoakaR9heQMXSme1tXcRGximmIvBWFXMJNcrvdx-stjbPyrPAvIOMi1mY64s1PDCCLuPJ84ppuqO-NrWLkstVbAAk9QHWPyFoN7f_HeOdghC2rJ0DsqLBdRVoWOhyfeTsxSYRohVbu3JK6ERzK_APWl1SHI06D4FkRr3Xr6WZ6jGI6A2PmfHC5TgGljYJ7a-SWx5W7vhi-zLoClZii8jRKZfzZzwVOTaNa8crdPcdUAGXqOQVQuK-YBZ3gVL-JGSAnLe0ZQCN_oUPlQj3jKS2-nQNHEjwrBGncltmciLH4b1Bg.9UM0STTh5YeC6fF_.q3oK7jY2pmgE0OeNJOCTp9V1OdZ8L-3kiytTXkoQ8BMoVWuTM1van02hjVz7vxkaKIDtWAY-4DLfk7LPSMXVJp9m3xz_u2pMQt7Fz5qugvR27cxx-AQr5YeJHGiJnn4vGJnrqF6ENRAQp4kahWudwQK1EDtvTAFF0KePRcH3ywN0FCdR5nK9JKrhCagHkc48tzfPGrjtgDpBdoHVHLvTnR1eChoHzzWE6YQ8oLW5aF6Uz6G9VSuhIsp8M5kzv0t9BaAtliSWvIpc3sN5MrTXDvLEGcOmba1MLU4oOABOlKCU53W_KnXDYcf2FoMokcSYp-cup8sUH4MGMqYvy-QKQtaD-UWmbL-97neI8oUyj74fMuojk034rfilN4MTFjW5o3Ql88Eq7bE3Taf8KNvU5uds8vACg7xGgQg9pXTkGOqZZwaymdfHB-W4b0EFRS6JLNRj5u98CSYJl6eSgDW-sPRP8OKUut3b4gv2S7grt7QoW7X3OD0DKBgIDdEmlxewQA59Lg-vcHVY687qoS2I_Xn-_UCMRMj5uzbl_YtztTihXHV1RLQPORzhwaRGxa1PvHdXIuldBfbruuePtGIc5k0Whc69uHGj6JHAhDTm0TnnvUvG-_08wyIqeCJM_fhwpHUW2OiMpu1mGzYn6YjRYUnuhLxlR-9YEkSnPOrsufSq9VqtppSzjLKKPrRZz6y0qPHmEIJ_1nRBnkNpZXIB3_sNujtxkaDo39wwowPHW1ooqMew4IUHk0ETllgUcQDmoxgbueAsENUUhqgEDusg0Zlrt2YQgNv7BGuMOICHIOR3T4fVOa3rqKft-x1JmaOZV5tDDMooya5kNoONka_Ay1X0u5wrBD87NTsiIbbCW0DK76OMXnp1tG-3I5t-E9r1RXNMDQBYeXxNGJMnKhcz6_MMwIUgvaRy6J-46r72d_1FS3kASQ6G-5-VQofwGLicThIAn4b-SXJ3GTynebeSSWiSzGYCU9bwyQdJuBXy6iFacAoEl9xkArF-Jc2K5vJ4tmLuge69IurDlV0iWX2Y47LZ56RlGyO7yvUSBkKtBPi7MhkiHadV5pUtiJwirWk-BnTbygGMl5mtszB-hlDE1EcmjWFY-F-PugeVIW7YwOxCoOBFCGE2-Fz0kD9UZbHnzWFFU46lnpE7IvXgy2FR_MRGdo5fuqz3UeXeKnJUiP2PQuSUoRg3GFJXh4hikZQoOtTH1c4jCaxIBz8gBpgneIElJpPvaWBqCefcg1qj-z8PRdwSjvmlo7cU0EVI85o7rXp3V2qCKvCnVGoxR5GJYWPrj2Vjt6SikbEYkghL-b43ByO-aagoCnVgU3BZI9LlS5eavqo9.eJoyVU8Qknj9MmvAz1e24w"
//     ,
// });

export const getAllTags = async () => {

    const tagTypes:any = ["sales_order",
    "item",
    "customer",
    "company",
    "purchase_order"]

    const allTags: any = {}

    for (let i = 0 ; i < tagTypes.length ; i++) {
        console.log(i);
        const res = await listTags(tagTypes[i]);
        allTags[tagTypes[i]] = res;
    }

    return allTags;

    //console.log(allTags);

    // const jsonString = JSON.stringify(allTags);
    // fs.writeFile('tags.json', jsonString, (err:any) => { 
    //     if (err) { 
    //         console.log('Error writing file', err) 
    //     } else { 
    //         console.log('Successfully wrote file') 
    //     } 
    // });
}

