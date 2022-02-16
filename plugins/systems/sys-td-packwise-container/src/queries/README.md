## Authentication

All request made to the Packwise GraphQL API require passing-in 2 headers:

1. An 'Authentication' header of type Basic Auth (Bearear Token)
2. An 'x-api-key' header with the Packwise token

## Requests

There are 3 possible ways of passing graphql queries in an HTTP request.

5. POST with query in body as graphql

**Example:**

```curl
curl --location --request POST 'https://packwiseflow.de/api/data' \
--header 'x-api-key: dQzy4M4MwI1DRYqZ2Bk6a8PbvGI4E9bV7RJEAMwg' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNjBlYzJkZmU0YTA1YzQwMDA4OTA0NDZkIiwibWZhIjpmYWxzZSwiaWF0IjoxNjI2MDkxMDA2fQ.D1m95nHJ3sMCgDHDcEOxwWRyIaiT7Xn6dv3FI_TKmoc' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query {\n  getCompany(_id: \"60b8ddc15751ba0009f707c4\") {\n    name\n  }\n}\n","variables":{}}'
```

1. POST with query in body as json

Use vscode 'GraphQL to REST' extension to convert graphql query syntax to valid JSON

**Example:**

```curl
curl --location --request POST 'https://packwiseflow.de/api/data' \
--header 'x-api-key: dQzy4M4MwI1DRYqZ2Bk6a8PbvGI4E9bV7RJEAMwg' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNjBlYzJkZmU0YTA1YzQwMDA4OTA0NDZkIiwibWZhIjpmYWxzZSwiaWF0IjoxNjI2MDkxMDA2fQ.D1m95nHJ3sMCgDHDcEOxwWRyIaiT7Xn6dv3FI_TKmoc' \
--header 'Content-Type: application/json' \
--data-raw '{"query": "query { getCompany(_id: \"60b8ddc15751ba0009f707c4\") { name } }"}'
```

3. GET with query in URL query string (URL-encoded string)

IMPORTANT: it expects GET and not POST request

NOTE: use https://meyerweb.com/eric/tools/dencoder/ to encode/decode
graphql queries into valid URL query strings
see https://dgraph.io/docs/graphql/api/requests/

**Decoded:** { getCompany(\_id: "60b8ddc15751ba0009f707c4") { name } }

**Encoded:** %7B%20getCompany(\_id%3A%20%2260b8ddc15751ba0009f707c4%22)%20%7B%20name%20%7D%20%7D%0A

**URL:** GET 'https://packwiseflow.de/api/data?query=<ENCODED_QUERY>'

**Example:**

```curl
curl --location --request GET 'https://packwiseflow.de/api/data?query=%7B%20getCompany(_id%3A%20%2260b8ddc15751ba0009f707c4%22)%20%7B%20name%20%7D%20%7D%0A' \
--header 'x-api-key: dQzy4M4MwI1DRYqZ2Bk6a8PbvGI4E9bV7RJEAMwg' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoiNjBlYzJkZmU0YTA1YzQwMDA4OTA0NDZkIiwibWZhIjpmYWxzZSwiaWF0IjoxNjI2MDkxMDA2fQ.D1m95nHJ3sMCgDHDcEOxwWRyIaiT7Xn6dv3FI_TKmoc'
```

## Responses

GraphQL responses are in JSON. Every response is a JSON map, and will include JSON keys for "data", "errors", or "extensions" following the GraphQL specification. They follow the following formats.

Successful queries are in the following format:

```json
{
  "data": { ... },
  "extensions": { ... }
}
```

Queries that have errors are in the following format.

```json
{
  "errors": [ ... ],
}
```

All responses, including errors, always return HTTP 200 OK status codes. An error response will contain an "errors" field.
