<div align="center">
  <a href="https://netzo.io" target="_blank" >
    <img height="50" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/icon.png" style="margin: 12px 0px" />
  </a>

  <h1 style="padding: 6px 0px 24px 0px">sys-td-philips-hue-white-light</h1>
</div>

An open source Thing Model plugin for the Netzo Web Platform.

## What you will need

This TM contains the following

- **Placeholders:**

  - **username**: Username generated after successful authentication with the Philips Bridge.
  - **id**: This is the ID of the lamp you want to control. Eg. Light 1 --> "1"

Note: You may retrieve the ID number of your connected HUE lights with a "GET Get All Lights" after you have authenticated (follow Step by Step Guide), alternativeley you may use the Hue App to verify your device id's.

- **Security schema:**

  - **Bearer**: This is your devices **AccessToken** (see below).

## Before you start

**Basic guide**:

- Get AccessToken with Basic Authentication (Follow the step by step guide below)

**Advanced guide**:

- Get Access Token with Digest Authentication
- Get Access Token with OAuth2.0

Please review [Remote Authentication and Controlling Philips Hue API using Postman](https://gotoguy.blog/2020/05/21/remote-authentication-and-controlling-philips-hue-api-using-postman/comment-page-1/).

## Step by Step Guide

Please follow this simplfied guide to setup your HUE devices with Netzo.

Before you can control your Philips Hue devices with Netzo you will need to create an authenticated {{username}} by following the steps described below. In order to do this we require to do some authentication steps to retireve the following variables:

- **username**: Username generated after by the Philips Bridge after successful authentication.
- **ClientId**: Hash value specific to the Hue Remote API app.
- **ClientSecret**: Hash value specific to the Hue Remote API app.
- **AppId**: Name specific to the Hue Remote API app.
- **DeviceId**: Any string that helps identify the app that will be communicating with the HUE devices (eg. netzo-app)
- **DeviceName**: Any string that helps identify the app that will be communicating with the HUE devices (eg. netzo)
- **AuthorizationCode**: Generated by posting a GET Authorization Request call.
- **AccessToken**: Generated by posting a POST Get Token (Basic).
- **RefreshToken**: Generated
- **ip**: The ip address of your Philips HUE Bridge in your network.

### Get Access Token with Basic Authentication

1. Create a free Hue Developer Account [https://developers.meethue.com/](https://developers.meethue.com/)
2. Navigate to your profile at the top left corner of the logged in user area and select **Remote Hue API appids**

<p align="center">
<img width="600" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/create-developer-hue-account.png" style="margin: 12px 0px" />
</p>

3. Create a new HUE Remote API app with the following configuration, since we will be using the Postman Desktop Client (see next step), we will setup our callback URL accordingly.

- If you're using the desktop app use - https://oauth.pstmn.io/v1/callback
- If you're using the web app use - https://oauth.pstmn.io/v1/browser-callback
<p align="center">
<img width="600" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/create-new-hue-remote-api-app.png" style="margin: 12px 0px" />
 </p>

Once you have created your Philips HUE API App you can review its credentials for the next steps. Here you will retrieve:

- **AppId** = {{ AppId }}
- **ClientId** = {{ ClientId }}
- **ClientSecret** = {{ ClientSecret }}

<p align="center">
<img width="600" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/create-new-hue-remote-api-app.png" style="margin: 12px 0px" />
</p>

4. For the following steps you will need to download [Postman](https://www.postman.com/). Setup is easy, even for beginners. You may use any other API request tool to fetch your tokens. For this we recommend checking out the [Official Philips HUE API Docs](https://developers.meethue.com/develop/hue-api/remote-authentication-oauth/) or the more advanced guides in the acknowledgements section.
5. Download the [Philips HUE Postman Collection](plugins/systems/sys-td-philips-hue-white-light/philips-hue-postmann-collection.json) and import it into your Postman client.
6. Navigate into the collection settings by hovering over the collection and clicking on the 3 dots. Go to Edit > Variables and fill out the initial values with the id's you have. In this step you should already be able to complete the value displayed in the image below.

<p align="center">
<img width="600" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/postman-add-variables.png" style="margin: 12px 0px" />
</p>

7. Go ahead and send a "GET Get Authorization Request" request (1) . If you have configured everything correctly you should recieve a response like the one below (2). However, Postman cannot read HTML. Try this workaround, find the "Code" button (3) and copy the request URL (eg. from the cURL). This should already contain the variables you set up before. Paste this in your browser and navigate to the link.

<p align="center">
<img width="1000" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/get-authorization-request-error.png" style="margin: 12px 0px" />
</p>

8. You wil now be asked to "Grant Permision to the previously configured API app to control your devices. Select "Yes" amd wait for the page to reload. You should recieve a verification like the one below. IMPORTANT: Now take a lok at the address bar in your browser and look for the **AuthorizationCode**. Copy the code and add it to your your Postman variables.

NOTE: Every time you send a "GET Authorization Request" request, a new AuthroizationCode will be created and you will have to update the Postman variables.

<p align="center">
<img width="600" src="https://raw.githubusercontent.com/netzoio/netzo/main/plugins/systems/sys-td-philips-hue-white-light/src/assets/get-authorization-code.png" style="margin: 12px 0px" />
</p>

9. Go ahead and send a "GET Get Token (Basic) request. If you have configured everything correctly you should recieve a response like the one below. Copy both **access_token** and **refresh_token** and add them to your Postman variables. You should only be missing {{ username }} and eventually your HUE Bridges IP address.

```json
{
  "access_token": "ACCESS_TOKEN",
  "access_token_expires_in": "xxxxxx",
  "refresh_token": "REFRESH_TOKEN",
  "refresh_token_expires_in": "xxxxxx",
  "token_type": "BearerToken"
}
```

10. Go ahead and retireve your HUE devices IP address. You may fin this in the HUE app, when you set up your device or may do an IP scan in your network. Add the IP address to the Postman variables.

11. Go ahead and send a "GET Get Token (Basic) request. If you have configured everything correctly you should recieve a response like the one below. Copy both **access_token** and **refresh_token** and add them to your Postman variables. You should only be missing {{ username }} and eventually your HUE Bridges IP address.

12. Find the folder "Remote Config" in the Postman Collection. Send a "PUT Put Enable Link Button". You should recieve the folowing payload. Alternativley, click the "Config" button in your HUE bridge to enable config. This state will only be active for 30 seconds.

```json
[
  {
    "success": {
      "/config/linkbutton": true
    }
  }
]
```

13. If you haven't tken more than 30 seconds after the last request, send a "POST Post Add Whitelist Identifier". The responde should contain your apps {{ username }}. Add this to your Postman config for safekeeping. You will need this username to setup your devices in the Netzo Web Platform.

```json
[
  {
    "success": {
      "username": "USERNAME_TOKEN"
    }
  }
]
```

14. Send a final "GET Get config" request to verify you are authenticated!

SUCCESS: You have sucessfully created a username for your remote API app and can control your Philips HUE devices from other apps.

### Useful Links

- [Review Authorized Devices](https://account.meethue.com/apps)

- [Philips HUE API Documentation](https://developers.meethue.com/develop/hue-api)

### Get it running

- Follow the Philips Philips HUE in-app guide to get your bridge started.
- Follow the [developer page](https://developers.meethue.com/develop/get-started-2/) to get an API Key
- The base URI is using our API Key and Light number, replace them with yours:
  - Look for the base URI in the TD
  - Replace the part between `/api/` and `/lights/` with your API key.
  - This TD is representing light number 1. You should replace the part after `/lights/` with your light's number.
  - This TD uses `Philips-hue` as hostname, in case you have multiple Philips HUE Bridges, you will need to change this in the base URI as well

### Links

- [App](https://app.netzo.io)
- [Website](https://netzo.io)
- [Docs](https://docs.netzo.io)

<div align="center">
  <h4>© Netzo Plugin</h4>
</div>

### Acknowledgements

We following list contains resources used to create this guide.

- [HueRemoteAPI-Postman-Collections](https://github.com/JanVidarElven/HueRemoteAPI-Postman-Collections)
- [Remote Authentication and Controlling Philips Hue API using Postman](https://gotoguy.blog/2020/05/21/remote-authentication-and-controlling-philips-hue-api-using-postman/comment-page-1/).