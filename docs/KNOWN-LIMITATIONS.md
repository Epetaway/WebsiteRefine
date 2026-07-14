# Known Limitations

## Deployment and services

- DNS, HTTPS, deployment aliases, and the currently live production build require verification in their provider dashboards.
- Google Analytics and SendGrid depend on deployment environment variables.
- Contact records use in-memory storage and are lost when the server process restarts. Email notification is the durable path when SendGrid is configured.
- The contact endpoint includes a honeypot and basic in-process rate limiting. It does not include CAPTCHA or a shared/distributed rate-limit store.

## Professional record

- AMA Fight Club's exact end month is not confirmed; the site uses `Jan 2025 - 2025`.
- The current non-technology employer/title/start date are intentionally omitted because they are unconfirmed.

## Investigations

- No investigation claims validated human outcomes or peer-reviewed research status.
- WithYou retains a documented legacy privacy inconsistency and screens that are implemented but not integrated.
- DojoNet's instructor workflow is not represented as implemented.
- Gundam Forge's competitive restriction coverage and public production hosting are not verified.

## QA boundary

- Automated type, lint, build, behavior, and browser checks cover the integrated repository.
- Physical-device screen-reader tests, network throttling, provider-side email delivery, and independent recruiter review remain follow-up activities.
