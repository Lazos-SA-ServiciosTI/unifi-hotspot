# unifi-hotspot

## Fork mantenido por Lazos S.A.

Este repositorio es un fork de [unifi-hotspot](https://github.com/woodjme/unifi-hotspot), mantenido por Lazos S.A.

Las adaptaciones incluyen el registro de las direcciones MAC, la autorización de invitados y pruebas para el flujo personalizado.

El registro envía un identificador por intento y los estados `pending`, `authorized` o `error` al driver configurado. `error` indica que no se pudo confirmar la autorización y no necesariamente que UniFi la rechazó. Si el registro falla, la autorización continúa y el estado puede quedar incompleto.

La variable `HOTSPOT_ID` identifica la instancia del portal y se incluye en los registros enviados al driver. Para el webhook de la integración municipal es obligatoria.

---

## README original de unifi-hotspot

> **Want this without running a server?** [GuestGate](https://www.guestgate.cloud) is the hosted version, from the same author. It connects with a UniFi API key, so it works with MFA-protected accounts and needs no port forwarding, and adds branded login pages, a guest list, webhooks and Zapier. [Start a free trial](https://app.guestgate.cloud/register).

A versatile external captive portal server designed for authorizing Wi-Fi guests on Unifi products. It supports flexible user data storage solutions, including integration with Google Sheets and webhooks.

## Documentation

For detailed information on how to set up and use this application, please refer to the [Documentation](https://docs.unifi-hotspot.jamiewood.io).

## What's New in V3

### Features and Improvements

- Added support for devices with built-in controllers such as the Unifi Dream Machine.
- Upgraded to NodeJS Version 20.
- Codebase rewritten in Typescript.

### Breaking Changes

- The `URI` environment variable has been renamed to `UNIFI_CONTROLLER_URL`.
- The `SITENAME` environment variable has been renamed to `UNIFI_SITE_IDENTIFIER`.
- The `LOG_AUTH_GOOGLE_SERVICE_ACCOUNT_EMAIL` and `LOG_AUTH_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` environment variables have been replaced with `LOG_AUTH_GOOGLE_CREDENTIALS`.
