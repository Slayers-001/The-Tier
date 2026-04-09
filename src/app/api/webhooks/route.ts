import { NextResponse } from 'next/server';

/**
 * ============================================================
 * NORDEN_TIER_OS // BACKEND_RELAY_V4
 * ARCHITECT: UTKARSH PANDEY
 * ============================================================
 */

const WEBHOOK_CONFIG = {
  SHOP: "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV",
  STAFF: "https://discord.com/api/webhooks/1491499961194643520/mIOWT_M4hid2Ba8Zs6bhSwEe3wejpilOqUV4JgXG3Nq3OURw_dT7zb5cNbwVy1Y4NIYM"
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, username, embed, content } = body;

    // Route to the correct Discord channel based on the request type
    const targetWebhook = type === 'SHOP' ? WEBHOOK_CONFIG.SHOP : WEBHOOK_CONFIG.STAFF;

    const discordPayload = {
      username: type === 'SHOP' ? "Norden Market Engine" : "Norden System Admin",
      avatar_url: `https://mc-heads.net/avatar/${username || 'Utkarsh'}/100`,
      content: content || "",
      embeds: embed ? [embed] : []
    };

    const response = await fetch(targetWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: "Discord API Error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Critical Webhook Failure:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
