import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3154baafde90aac14647ae3ae1d1ea56@o4510772512948224.ingest.de.sentry.io/4510772542701648",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
    }),
  ],
});