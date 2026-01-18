# KMP Horren - Deployment Guide

Deze handleiding beschrijft hoe je de KMP Horren webapplicatie deployt naar Railway.

## Inhoudsopgave

1. [Vereisten](#vereisten)
2. [Railway Setup](#railway-setup)
3. [Environment Variabelen](#environment-variabelen)
4. [Custom Domain](#custom-domain)
5. [Monitoring](#monitoring)
6. [Troubleshooting](#troubleshooting)

---

## Vereisten

Voordat je begint, zorg dat je het volgende hebt:

- [ ] Een [Railway](https://railway.app) account
- [ ] Een [Supabase](https://supabase.com) project (voor database en auth)
- [ ] Een [Mollie](https://mollie.com) account (voor betalingen)
- [ ] Een [Resend](https://resend.com) account (voor e-mails)
- [ ] Je code in een GitHub repository

---

## Railway Setup

### Stap 1: Project Aanmaken

1. Ga naar [railway.app](https://railway.app) en log in
2. Klik op **"New Project"**
3. Selecteer **"Deploy from GitHub repo"**
4. Autoriseer Railway om toegang te krijgen tot je GitHub
5. Selecteer de repository met je KMP Horren code

### Stap 2: Build Configuratie

Railway detecteert automatisch dat het een Next.js project is. De configuratie wordt gelezen uit:

- `railway.toml` - Railway-specifieke instellingen
- `nixpacks.toml` - Build system configuratie

De standaard instellingen zijn:
- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm run start`
- **Node Version:** 20 LTS

### Stap 3: Deploy Trigger

Na het koppelen van je repository:
1. Railway start automatisch een build
2. Elke push naar de `main` branch triggert een nieuwe deploy
3. Je kunt ook handmatig deployen via het Railway dashboard

---

## Environment Variabelen

Ga naar je project in Railway → **Variables** tab en voeg de volgende variabelen toe:

### Verplichte Variabelen

| Variabele | Beschrijving | Voorbeeld |
|-----------|--------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGciOiJI...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGciOiJI...` |
| `MOLLIE_API_KEY` | Mollie API key (live) | `live_xxx...` |
| `RESEND_API_KEY` | Resend API key | `re_xxx...` |
| `EMAIL_FROM` | Afzender e-mailadres | `Info@kozijnmontagepartners.nl` |
| `NEXT_PUBLIC_APP_URL` | Publieke URL van je app | `https://kmp-horren.nl` |

### Optionele Variabelen

| Variabele | Beschrijving | Default |
|-----------|--------------|---------|
| `GOOGLE_AI_API_KEY` | Google Gemini API key | - |
| `MOLLIE_WEBHOOK_URL` | Mollie webhook URL | `{APP_URL}/api/webhooks/mollie` |
| `NODE_ENV` | Environment | `production` |

### Variabelen Instellen

```bash
# Via Railway CLI (optioneel)
railway variables set NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
# etc.
```

Of via het Railway Dashboard:
1. Ga naar je project
2. Klik op **Variables**
3. Klik op **+ New Variable**
4. Voer de naam en waarde in
5. Klik op **Add**

---

## Custom Domain

### Stap 1: Domain Toevoegen

1. Ga naar je project in Railway
2. Klik op **Settings** → **Domains**
3. Klik op **+ Custom Domain**
4. Voer je domein in: `kmp-horren.nl`

### Stap 2: DNS Configuratie

Voeg de volgende DNS records toe bij je domeinprovider:

**Voor root domain (kmp-horren.nl):**
```
Type: CNAME
Name: @
Value: <railway-provided-value>.up.railway.app
```

**Voor www subdomain:**
```
Type: CNAME
Name: www
Value: <railway-provided-value>.up.railway.app
```

### Stap 3: SSL Certificaat

Railway genereert automatisch een SSL certificaat via Let's Encrypt. Dit kan enkele minuten duren na DNS propagatie.

---

## Monitoring

### Health Check

De applicatie heeft een ingebouwde health check endpoint:

```
GET /api/health
```

Response voorbeeld:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "0.1.0",
  "environment": "production",
  "uptime": 3600,
  "checks": {
    "server": "ok",
    "database": "ok"
  },
  "responseTimeMs": "12.34"
}
```

Railway gebruikt dit endpoint automatisch voor health monitoring.

### Logs Bekijken

1. Ga naar je project in Railway
2. Klik op **Deployments**
3. Selecteer een deployment
4. Bekijk de **Build Logs** of **Deploy Logs**

### Metrics

Railway biedt ingebouwde metrics:
- CPU gebruik
- Memory gebruik
- Network traffic
- Request count

---

## Troubleshooting

### Build Faalt

**Probleem:** Build faalt met "npm ci" errors

**Oplossing:**
1. Controleer of `package-lock.json` in de repository zit
2. Verwijder `node_modules` en run `npm install` lokaal
3. Commit de bijgewerkte `package-lock.json`

---

**Probleem:** TypeScript errors tijdens build

**Oplossing:**
1. Run lokaal `npm run typecheck` om errors te vinden
2. Fix de TypeScript errors
3. Push de fixes naar GitHub

---

### App Start Niet

**Probleem:** App crashed bij opstarten

**Oplossing:**
1. Controleer de deploy logs in Railway
2. Verifieer dat alle environment variabelen correct zijn ingesteld
3. Check of `NEXT_PUBLIC_APP_URL` correct is (inclusief `https://`)

---

**Probleem:** "Module not found" errors

**Oplossing:**
1. Verifieer dat alle dependencies in `package.json` staan
2. Run `npm ci` lokaal om te testen
3. Check of het een dev dependency is die in productie nodig is

---

### Database Connectie

**Probleem:** Database connection errors

**Oplossing:**
1. Controleer `NEXT_PUBLIC_SUPABASE_URL` en keys
2. Verifieer dat je Supabase project actief is
3. Check de Supabase logs voor meer details

---

### Betalingen Werken Niet

**Probleem:** Mollie betalingen falen

**Oplossing:**
1. Verifieer dat je een **live** API key gebruikt (niet test)
2. Controleer of `MOLLIE_WEBHOOK_URL` correct is
3. Test de webhook URL handmatig

---

## Rollback

Als een deployment problemen veroorzaakt:

1. Ga naar **Deployments** in Railway
2. Vind een werkende vorige deployment
3. Klik op de drie puntjes (...)
4. Selecteer **Rollback**

---

## Support

- **Railway Docs:** https://docs.railway.app
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs

---

## Checklist voor Go-Live

- [ ] Alle environment variabelen ingesteld
- [ ] Custom domain geconfigureerd
- [ ] SSL certificaat actief
- [ ] Health check endpoint werkt (`/api/health`)
- [ ] Mollie webhook URL geconfigureerd
- [ ] E-mail versturen werkt (test via contact formulier)
- [ ] Betalingen werken (test met echte betaling)
- [ ] Supabase database tabellen aangemaakt
- [ ] Admin account aangemaakt
