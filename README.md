# Scissors
A  URL Shortening app

## Requirements
- URL Shortening:
Scissor allows users to shorten URLs by pasting a long URL into the Scissor platform and a shorter URL gets automatically generated. The shortened URL is designed to be as short as possible, making it easy to share on social media or through other channels.
- Custom URLs:
Scissor also allows users to customize their shortened URLs. Users can choose their own custom domain name and customize the URL to reflect their brand or content. This feature is particularly useful for individuals or small businesses who want to create branded links for their 
- QR Code Generation:
Scissor allows users to also generate QR codes for the shortened URLs. Users can download the QR code image and use it 

## Base URL
- somehostsite.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  ObjectId |  required |
|  email     | string  |  optional |
|  password |   string |  required  |



### Url
| field  |  data_type | constraints  |
|---|---|---|
|  id |  ObjectId |  required |
|  full |  string |  required |
|  short | string  |  |
|  createdBy  |  ObjectId |  required  |
|  timestamps     | date  |   |



## APIs
---

### Signup User

- Route: /users/signup
- Method: POST
- Body: 
```
{
  "email": "johndoe@example.com",
  "password": "Password123",
}
```

- Responses

Success
```
{
    "message": "user profile created successfully",
    "user": {
        "email": "johndoe@example.com",
        "password": "password123",
        "shortUrl": [],
        "_id": "64988925b14186fbf0e4338e"
    }
}
```
---
### Login User

- Route: /users/login
- Method: POST
- Body: 
```
{
  "email": "johndoe@example.com",
  "password": "Password123"
}
```

- Responses

Success
```
{
    message: 'success',
    token: 'sjlkadfdfjklsfdsfjsd'
}
```

---
### Shorten Url

- Route: /snipper
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "full": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    "tag": "shortmoz"
}
```

- Responses

Success
```
{
    "status": true,
    "shortUrl": {
        "full": "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
        "short": "shortmoz",
        "createdBy": "64988925b14186fbf0e4338e",
        "_id": "64988b99b14186fbf0e43392",
        "createdAt": "2023-06-25T18:46:49.680Z",
        "updatedAt": "2023-06-25T18:46:49.680Z",
        "__v": 0
    },
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAANmSURBVO3BQW7dWAADwe6Hf/8rc7yYBVcCBMmxE7DKfGHmf4eZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5ny4SGVPykJb1K5IwlNpSWhqfxJSXjiMFMOM+UwUz68LAlvUnmTyh1JaCpPJOFNKm86zJTDTDnMlA/fTOWOJNyh0pLQVK4k4Y4kNJUnVO5Iwnc6zJTDTDnMlA//GJU7VFoS7kjCv+QwUw4z5TBTPvzjknCHSkvCFZWWhL/ZYaYcZsphpnz4Zkn4SSpXknBF5Tsl4Tc5zJTDTDnMlA8vU/lJSWgqLQlNpSWhqbQkNJU7VH6zw0w5zJTDTPnwUBJ+syQ0lSsqLQlN5Y4k/E0OM+UwUw4z5cNDKi0JTeVNSWhJuKLSktBUWhKaSkvCHSpvSsJ3OsyUw0w5zBTzhT9I5UoSnlBpSbii0pJwh0pLwt/sMFMOM+UwUz68TOUJlTuScEXlShLuUGlJaCotCXeotCQ0lStJeOIwUw4z5TBTzBf+Iip3JOEJlSeS0FRaEn6Tw0w5zJTDTDFfeEDlShKeUGlJuKJyRxLuUHkiCU3liSS86TBTDjPlMFM+/DCVK0m4onJHEprKHUloKleS0FRaEn6Tw0w5zJTDTPnwsiS8SaUloSWhqbQkXElCU7mi0pJwReVNKleS8MRhphxmymGmfPhmKi0JLQlNpSWhqdyh0pLQVK4k4Q6VloSm8psdZsphphxmyodvloSmciUJTaUl4Q6VO5LQVJ5QuaLymxxmymGmHGaK+cJfTOWOJLxJpSXhDpWWhCsqLQlvOsyUw0w5zJQPD6n8SUloSbii0lSuJOFNKi0JV1TuUGlJeOIwUw4z5TBTPrwsCW9SuaLSknBHEq6otCTckYQ7kvCTDjPlMFMOM+XDN1O5IwlvSkJTuSMJTeWKyhMqV5LQVFoSnjjMlMNMOcyUD/84lZaEpnJHEprKHUloKneofKfDTDnMlMNM+fCPUWlJuJKEpvJEEq6otCQ8ofKmw0w5zJTDTPnwzZLwnZLwhMqVJDSVJ5LQVFoSftJhphxmymGmfHiZyp+kckcSriShqbQk3KFyh8pPOsyUw0w5zBTzhZn/HWbKYaYcZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsp/osBjLYsH/aYAAAAASUVORK5CYII="
}
```
---

...

## Contributor
- Victor Abbah