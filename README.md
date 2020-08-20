# Open Trigger Cmd API


### Users

<details>
  - Create

  ```shell
    curl -kv -H 'Content-Type: application/json' -d '{"email": "root@root.com", "password": "123456"}' -X 'POST' "http://localhost:3333/api/v1/users/" | jq
  ```

  - status_code: 201 Created

  - return:

  ```json
  {
    "id": 11,
    "email": "rootTeste@root.com"
  }
  ```

</details>
