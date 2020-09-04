# Open Trigger Cmd API

## Summary

This is a API to store users, sessions and triggers, to authenticate and get results on web, desktop and mobile apps
i initialize this project inspiring myself on Trigger CMD, but on all development i code everything by my own
if you like it, enjoy, fork, clone and fun yourself with this crazy code!

## Requests

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

### Triggers

<details>
  <summary>Get</summary>

  - curl:
    ```shell
      curl -kv -H 'Content-Type: application/json' -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk4NTY2MzE3LCJleHAiOjE1OTg1Njk5MTd9.liza4XVdSDHQ1c3cGw7qjk1FcsXz0wHKtjcH2kHv8A4' -X 'GET' "http://localhost:3333/api/v1/triggers/" | jq
    ```

    - status_code: 200 Ok

    - return:
      ```json
      [
        {
          "id": 2,
          "name": "testing",
          "command": "sudo apt-get upgrade",
          "voice": "testing",
          "userId": 1,
          "createdAt": "2020-08-25T01:22:41.823Z",
          "updatedAt": "2020-08-25T01:22:41.823Z"
        }
      ]
      ```
</details>

<details>
  <summary>Create</summary>

  - curl:
    ```shell
      curl -kv -H 'Content-Type: application/json' -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk4MzAxMzEyLCJleHAiOjE1OTgzMDQ5MTJ9.Si37s1JBHJLB1kX2VGKZKRFA2X3jsLDXSIvqD9Is9xk' -d '{ "name": "testing", "voice": "testing", "command": "sudo apt-get upgrade" }' -X 'POST' "http://localhost:3333/api/v1/triggers" | jq
    ```

  - status_code: 201 Created

  - return
    ```json
    {
      "id": 3,
      "name": "testing",
      "voice": "testing",
      "command": "sudo apt-get upgrade",
    }
    ```
</details>

<details>
  <summary>Update</summary>

  - curl:
    ```shell
    curl -kv -H 'Content-Type: application/json' -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MDg1OTY1LCJleHAiOjE1OTkwODk1NjV9.MjjfrROX4vVZoaeu2qhOGmivcRSdwt4n7QyuCnR3jfc' -d '{ "name": "testing", "command": "sudo apt-get upgrade", "voice": "testing" }' -X 'PUT' "http://localhost:3333/api/v1/triggers/2" | jq
    ```

  - status: 202 accepted

  - return:
    ```json
    {  
      "name": "testing",
      "command": "sudo apt-get upgrade",
      "voice": "testing"
    }
    ```
</details>

<details>
  <summary>Delete</summary>

  - curl:
    ```shell
    curl -kv -H 'Content-Type: application/json' -H 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk5MTY5Mzg1LCJleHAiOjE1OTkxNzI5ODV9.LMDdwsxBSKm6-WsVHhRtcQ11y8VjC5kXaop0lc0xKiM' -X 'DELETE' "http://localhost:3333/api/v1/triggers/4" | jq
    ```

  - status: 204 no content
</details>
