Endpoints

| HTTP Method | Endpoint | Request JSON Body | Response JSON Body | Possible HTTP Status Codes |
|-------------|----------|------------------|--------------------|-----------------------------|
| **POST** | `/api/accounts` | `{ "owner": "string", "initialBalance": number }` | `{ "id": number }` | `200 OK`, `400 Bad Request` |
| **GET** | `/api/accounts` | — | `[ { "id": number, "owner": "string", "balance": number, "lastOutgoing": [ { "from": number, "to": number, "amount": number, "timestamp": "string" } ] } ]` | `200 OK` |
| **GET** | `/api/accounts/{id}` | — | `{ "id": number, "owner": "string", "balance": number, "lastOutgoing": [ { "from": number, "to": number, "amount": number, "timestamp": "string" } ] }` | `200 OK`, `404 Not Found` |
| **POST** | `/api/accounts/{id}/deposit` | `{ "amount": number }` | — | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/api/accounts/{id}/withdraw` | `{ "amount": number }` | — | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/api/transfer` | `{ "fromId": number, "toId": number, "amount": number }` | —  | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **GET** | `/api/accounts/{id}/transfers` | — | `[{ "from": number, "to": number, "amount": number, "timestamp": "string" }]` | `200 OK`, `404 Not Found` |

