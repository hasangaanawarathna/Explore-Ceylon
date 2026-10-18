import "server-only";

const NOTIFICATION_EMAIL = "hasanngaanawarathna@gmail.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export async function sendAdminLoginNotification(email: string, loginDate = new Date()) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_LOGIN_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Resend notification settings are not configured.");

  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(loginDate);
  const time = new Intl.DateTimeFormat("en-LK", {
    timeZone: "Asia/Colombo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(loginDate);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [process.env.ADMIN_LOGIN_NOTIFY_EMAIL || NOTIFICATION_EMAIL],
      subject: "Explore Ceylon admin login notification",
      html: `<h2>Admin login successful</h2><p><strong>Login email:</strong> ${escapeHtml(email)}</p><p><strong>Login date:</strong> ${date}</p><p><strong>Login time:</strong> ${time}</p><p><strong>Status:</strong> Success</p>`,
    }),
  });

  if (!response.ok) throw new Error(`Resend returned HTTP ${response.status}.`);
}
