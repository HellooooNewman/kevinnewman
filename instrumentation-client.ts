import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const isLiveSite = ["kevinnewman.ca", "www.kevinnewman.ca"].includes(
  window.location.hostname,
);

// Keep local development and preview deployments out of production analytics.
if (process.env.NODE_ENV === "production" && isLiveSite && projectToken) {
  try {
    posthog.init(projectToken, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://d.kevinnewman.ca",
      ui_host:
        process.env.NEXT_PUBLIC_POSTHOG_UI_HOST || "https://us.posthog.com",
      defaults: "2026-08-30",
      capture_pageview: "history_change",
      autocapture: true,
      person_profiles: "identified_only",
      cross_subdomain_cookie: false,
      disable_session_recording: true,
    });
  } catch (error) {
    console.warn("PostHog initialization failed", error);
  }
}
