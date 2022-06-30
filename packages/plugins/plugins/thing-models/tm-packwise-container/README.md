<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/packages/plugins/plugins/thing-models/tm-packwise-container/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1>tm-packwise-container</h1>
</div>

An open source thing model for the Netzo WoT platform.

## What you will need

This TM contains the following

- **Placeholders:**

  - **ContainerName**: Packwise Containers are bounded to a specific Device. Give your Container a name to identify it.

- **Security schema:**

  - **API Key**:
  - **Bearer**:

## Before you start

**Basic guide**:

- Get AccessToken with Basic Authentication (Follow the step by step guide below)

## Step by Step Guide

Please follow this simplified guide to setup your Packwise Containers or Devices with Netzo.

Before you can interact with you Packwise SmartCap devices and their Containers create an API key by following the steps described below.

1. Log into your [Packwise Flow](https://packwiseflow.de/).
2. After Login, navigate the the Admin Settings.
3. Go to API Management and create a new key.
4. Define a role for your key depending on your requirements.
5. Be sure to annotate your credentials, you will not be able to access them again. The Packwise token correspond to the following when provisioning devices with Netzo.

- **API Key** = {{ xApiKey }}
- **Bearer** = {{ Token }}

SUCCESS: You have all you need to connect your Packwise devices with Netzo.

### Creating New Queries to the Packwise API

NOTE: Packwise API design pattern is built using GraphQL. This means, queries to the API must be converted from the GraphQL body to a URL Query String in order to better align with Web of Things standards.

1. For the following steps you will need to download [Postman](https://www.postman.com/). Setup is easy, even for beginners. A Packwise Postman collection is available for fast setup.
2. Download the [Packwise Postman Collection](plugins/thing-models/tm-packwise-container/packwise-postmann-collection.json) and import it into your Postman client.
3. Navigate into the collection settings by hovering over the collection and clicking on the 3 dots. Go to Edit > Variables and fill out the initial values with your security credentials

SUCCESS: You have sucessfully created a new query string to fetch data from the Packwise API via a Web of Things standard Thing description.

### Links

- [App](https://app.netzo.io)
- [Website](https://netzo.io)
- [Docs](https://docs.netzo.io)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgements
