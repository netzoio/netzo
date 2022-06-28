<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/sources/source-openapi-google-cloud-run/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">source-openapi-google-cloud-run</h1>
</div>

An open-source source plugin for Cloud Run Admin API apps and data tables.

Google Cloud Run Admin API is a widespread low-code application development system that connects to your Google Workspace apps.

During the Service configuration, you will require a Google Cloud Run Admin API `ApplicationAccessKey`.

If you are an Admin, you may find your keys by navigating to `Manage > Integration > IN: from cloud services to your app`

Here you will find your:

- `AppId`
- `ApplicationAccessKey`

You will also require:

- `tableName`: You may find available tableNames by navigating to `Data`

#### Important

- Be sure to pass tableNames in URLencoded format, e.g `"my Table" = "my%20Table"`
- `tableNames` are also case-sensitive

### Links

- [Marketplace](https://app.netzo.io/marketplace/source-openapi-google-cloud-run)
- [Cloud Run Admin API Reference for Developers](https://cloud.google.com/run/docs/apis)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgements
