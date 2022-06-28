<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/sources/source-soap-wansoft/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">source-soap-wansoft</h1>
</div>

An open-source source plugin for Wansoft Restaurant Management API.

Wansoft is a widespread restaurant management system in Mexico. The original API is based on SOAP standards.

You will require 3 parameters to use this plugin, your Wansoft support team is responsible for enabling the API service and should give you the following:

- Id of the subsidiary (`subsidiaryId`)
- Name of the subsidiary (`subsidiaryName`)
- Password to the web service (`pwdWebService`)

Depending on the API calls you make you will make use of the given parameters.

#### Important
- Many fields require the paramter `operationDate` in DateTime format (YYYY-MM-DD HH:MM:SS)
- For ease of use and real-time records we recommend setting up a local variable `currentDateTime = ${new Date(Date.now()).toISOString()}` when building your queries.

### Links

- [Marketplace](https://app.netzo.io/marketplace/source-soap-wansoft)
- [Wansoft for Developers](https://wansoft.net/public/docs/integracionerp.html)
- [Wansoft Integration Service API Endpoints](https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx)
- [Wansoft Integration Service WDSL (SOAP Original)](https://www.wansoft.net/wansoft.web/API/IntegrationService.asmx?WSDL)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgements
