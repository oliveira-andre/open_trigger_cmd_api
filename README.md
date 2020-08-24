# Open Trigger Cmd API


### Users

<details>
  <summary>Create</summary>

  - curl:
    ```shell
      curl -kv -H 'Content-Type: application/json' -d '{"email": "root@root.com", "password": "123456"}' -X 'POST' "http://localhost:3333/api/v1/users/" | jq
    ```

  - status_code: 201 Created

  - return:
    ```json
    {
      "id": 11,
      "email": "root@root.com"
    }
    ```
</details>


### Sessions

<details>
  <summary>Create</summary>

  - curl:
    ```shell
      curl -kv -H 'Content-Type: application/json' -d '{"email": "root@root.com", "password": "123456"}' -X 'POST' "http://localhost:3333/api/v1/sessions/" | jq
    ```

  - status_code: 201 Created

  - return:
    ```json
    {
      "user": {
        "email": "root@root.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTU5Nzg4OTYwNiwiZXhwIjoxNTk3ODkzMjA2fQ.fWmdfQWT-6o6lmvWtIp4XofXwUor9GoOASUX9LXgIs4"
    }
    ```
</details>
