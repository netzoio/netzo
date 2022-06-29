<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/services/service-openapi-wansoft/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">service-openapi-wansoft</h1>
</div>

An open-source service plugin for Wansoft Restaurant Management API.

Wansoft is a widespread restaurant management system in Mexico. The original API is based on SOAP standards.

You will require 3 parameters to use this plugin, your Wansoft support team is responsible for enabling the API service, this will look something like the following:

- subsidiaryId = "1")
- password = "123sad3434ca"
- operationDate = (2020,01,01)

Recreation of the OpenAPI spec based on the Wansoft API WSDL file:

- 1. Navigate to the WSDL file for the Wansoft API [download](https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx?WSDL)
- 2. The first step was to automatically create an OpenAPI spec with help of [apimatic.io](apimatic.io), import the API via the WSDL files URL and export as OpenAPI 3.0.x spec
- 3. Import the generate OpenAPI spec into an API builder like [Postman](https://web.postman.co/)
- 2. Use [WSDL Analyzer](https://www.wsdl-analyzer.com/upload/doUploadWsdl) to analyze the SOAP envelopes required to send as part of the body in the OpenAPI spec


## Workarounds

- 1. Since paths in the WSDL file are not RESTful, but rather are performed as a query, the `baseURL` for the OpenAPI spec was extended to include: `?=op`

The result for is a `baseUrl` = `https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx?op=`

Through this workaround, we can complete the request based on the path `operation`. The `paths: {}` can now be built as follows:

```js
    paths:
      "/GetSaleByOrder":
        post:
          operationId: GetSaleByOrder
          summary: Get sale by order
          description: This endpoint returns the sales information by orders
          parameters:
            - name: operation
              in: query
              description: Operation to perform
```

### Links

- [Marketplace](https://app.netzo.io/marketplace/service-openapi-wansoft)
- [Wansoft for Developers](https://wansoft.net/public/docs/integracionerp.html)
- [Wansoft Integration Service API Endpoints](https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx)
- [Wansoft Integration Service WDSL (SOAP)](https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx?WSDL)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgments
