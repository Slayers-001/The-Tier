import { NextResponse } from 'next/server';

/**
 * ============================================================
 * NORDEN_TIER_BACKEND // WEBHOOK_GATEWAY_V1
 * HANDLES SECURE TRANSMISSION TO DISCORD
 * ============================================================
 */

const SHOP_WEBHOOK = "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV";
const STAFF_WEBHOOK = "https://discord.com/api/webhooks/1491499961194643520/mIOWT_M4hid2Ba8Zs6bhSwEe3wejpilOqUV4JgXG3Nq3OURw_dT7zb5cNbwVy1Y4NIYM";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, content, embed } = body;

    // Determine which webhook to use based on the 'type' sent from the frontend
    const targetWebhook = type === 'SHOP' ? SHOP_WEBHOOK : STAFF_WEBHOOK;

    const payload = {
      username: type === 'SHOP' ? "Norden Market System" : "Norden Staff Console",
      avatar_url: "https://mc-heads.net/avatar/Utkarsh/100", // Displays your skin as the webhook sender
      content: content || "",
      embeds: embed ? [embed] : []
    };

    const response = await fetch(targetWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord Error:", errorText);
      return NextResponse.json({ success: false, error: "Discord rejected request" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Server Webhook Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
