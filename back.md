# Hack & Escape — Backend Reference (Full System)

## Overview

This backend is designed as a scalable, secure, bilingual (EN / AR) system for managing the Hack & Escape cybersecurity competition platform.

It acts as:

* Content Management System (CMS)
* Event management backend
* Sponsor & media platform
* API provider for frontend

---

## Core Goals

* Support bilingual content (English / Arabic)
* Provide clean REST APIs
* Manage event data, sponsors, and media
* Be scalable for future expansion
* Follow security best practices

---

## Architecture

* REST API
* Modular structure
* MVC pattern (Model / Controller / Route)
* Separation of concerns

---

## Tech Stack

* Node.js
* Express.js (or NestJS)
* MongoDB (Mongoose)

### Supporting Tools

* JWT (authentication)
* bcrypt (password hashing)
* Joi / Zod (validation)
* Helmet (security)
* CORS
* Winston (logging)

---

## Project Structure

backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── validators/
│   ├── config/
│   ├── utils/
│
├── uploads/
├── .env
├── app.js
├── server.js

---

## Localization System (EN / AR)

All text fields must support bilingual format:

{
title: {
en: "Hack & Escape",
ar: "هاك اند اسكيب"
}
}

---

## Authentication

### Roles

* Admin
* Organizer
* Media Manager

### Flow

1. User logs in
2. Receives JWT token
3. Sends token in headers:
   Authorization: Bearer TOKEN

---

## Modules

### 1. Event

Stores main event information.

Fields:

* name (EN/AR)
* date
* location
* venue
* description (EN/AR)

---

### 2. Statistics

Fields:

* participants
* teams
* universities
* attendees
* volunteers

---

### 3. Editions

Supports multiple years (2025, 2026)

Fields:

* year
* status (completed / upcoming)
* stats
* highlights (EN/AR)
* gallery
* videos

---

### 4. Sponsors

Fields:

* name
* logo
* tier (gold / silver / bronze / partner)
* website
* description (EN/AR)

---

### 5. Sponsorship Packages

Gold:

* naming rights
* booth
* VIP access
* database access

Silver:

* branding
* booth
* social media

Bronze:

* website logo
* mentions

---

### 6. Team

Fields:

* name
* role
* image
* bio (EN/AR)
* social links

---

### 7. Media

Fields:

* title
* source
* logo
* link
* type (news / video / interview)

---

### 8. Gallery

Fields:

* title (EN/AR)
* image_url
* type (event / preparation)
* date

---

### 9. Timeline

Fields:

* milestone
* date
* description (EN/AR)
* status (pending / completed)

---

### 10. Contact / Leads

Fields:

* name
* email
* company
* phone
* message
* created_at

---

## API Structure

### Public APIs

GET /api/event
GET /api/stats
GET /api/editions
GET /api/sponsors
GET /api/team
GET /api/gallery
GET /api/media
GET /api/timeline

---

### Admin APIs

POST /api/sponsors
POST /api/team
POST /api/gallery
POST /api/media
POST /api/timeline

PUT /api/:resource/:id
DELETE /api/:resource/:id

---

## Security

* JWT authentication
* Password hashing (bcrypt)
* Input validation (Joi / Zod)
* Rate limiting
* Helmet (headers)
* CORS configuration

---

## File Upload

Options:

* Local storage (/uploads)
* Cloud (AWS S3 / Cloudinary) [recommended]

---

## Performance

* Use CDN for media
* Enable caching (Redis optional)
* Optimize database queries

---

## Deployment

Backend:

* Render / Railway / AWS

Database:

* MongoDB Atlas

---

## Future Enhancements

* Live scoreboard
* Team registration system
* Real-time updates (WebSockets)
* Sponsor dashboard
* Event analytics

---

## Summary

This backend is designed to be:

* Scalable
* Secure
* Bilingual
* Production-ready

It can evolve from a competition backend into a full cybersecurity platform.
