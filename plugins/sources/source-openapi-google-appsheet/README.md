<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/sources/source-openapi-google-appsheet/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">source-openapi-google-appsheet</h1>
</div>

An open-source source plugin for AppSheet apps and data tables.

Google AppSheet is a widespread low-code application development system that connects to your Google Workspace apps.

During the Service configuration, you will require a Google AppSheet `ApplicationAccessKey`.

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

- [Marketplace](https://app.netzo.io/marketplace/source-openapi-google-appsheet)
- [AppSheet for Developers](https://support.google.com/appsheet/answer/10105398?hl=en&ref_topic=10105767)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgements
