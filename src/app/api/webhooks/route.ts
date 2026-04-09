import { NextResponse } from 'next/server';

/**
 * ============================================================
 * NORDEN_TIER_BACKEND // WEBHOOK_GATEWAY_V1
 * OWNER: UTKARSH PANDEY
 * STATUS: SECURE_RELAY_ACTIVE
 * ============================================================
 */

const WEBHOOKS = {
  SHOP: "https://discord.com/api/webhooks/1487157795169243236/7KlEaV40W3BPxlU0K276i8VO6gu5mk9Hu-hdmEBplKDSmagLIvuxDfMnhK8THr3FmdhV",
  STAFF: "https://discord.com/api/webhooks/1491499961194643520/mIOWT_M4hid2Ba8Zs6bhSwEe3wejpilOqUV4JgXG3Nq3OURw_dT7zb5cNbwVy1Y4NIYM"
};

export async function POST(req: Request) {
  try {
    const { type, content, embed, username } = await body(req);

    const targetUrl = type === 'SHOP' ? WEBHOOKS.SHOP : WEBHOOKS.STAFF;

    const discordPayload = {
      username: type === 'SHOP' ? "Norden Purchase Tracker" : "Norden Staff Node",
      avatar_url: `https://mc-heads.net/avatar/${username || 'Utkarsh'}/100`,
      content: content || "",
      embeds: embed ? [embed] : []
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) throw new Error("Discord API rejection");

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

async function body(req: Request) { return await req.json(); }
