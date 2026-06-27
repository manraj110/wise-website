"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    __pendingHash?: string;
  }
}

export default function HashScrollFix() {
  useEffect(() => {
    const hash = window.__pendingHash || window.location.hash;

    if (!hash) {
      document.documentElement.style.visibility = "";
      return;
    }

    const id = hash.slice(1);
    const NAV_OFFSET = 100;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.style.visibility = "hidden";
    document.body.classList.add("hash-settling");

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let maxTimer: ReturnType<typeof setTimeout> | null = null;
    let graceTimer: ReturnType<typeof setTimeout> | null = null;
    let pollId: number | null = null;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "auto" });
      return true;
    };

    const reveal = () => {
      document.documentElement.style.visibility = "";
      document.body.classList.remove("hash-settling");
      try {
        history.replaceState(
          null,
          "",
          `${location.pathname}${location.search}${hash}`,
        );
      } catch {}
    };

    const finish = () => {
      if (cancelled) return;
      cancelled = true;

      scrollToTarget();
      requestAnimationFrame(() => {
        scrollToTarget();
        reveal();

        graceTimer = setTimeout(() => {
          resizeObserver?.disconnect();
          if (pollId) cancelAnimationFrame(pollId);
        }, 1200);
      });

      if (settleTimer) clearTimeout(settleTimer);
      if (maxTimer) clearTimeout(maxTimer);
    };

    const onLayoutChange = () => {
      scrollToTarget();
      if (cancelled) return;
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(finish, 350);
    };

    const beginSettling = () => {
      scrollToTarget();
      settleTimer = setTimeout(finish, 350);
      maxTimer = setTimeout(finish, 4000);

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(onLayoutChange);
        resizeObserver.observe(document.body);
      } else {
        let lastHeight = document.body.scrollHeight;
        const poll = () => {
          const h = document.body.scrollHeight;
          if (h !== lastHeight) {
            lastHeight = h;
            onLayoutChange();
          }
          pollId = requestAnimationFrame(poll);
        };
        pollId = requestAnimationFrame(poll);
      }
    };

    const start = () => {
      const fontsReady =
        "fonts" in document ? document.fonts.ready : Promise.resolve();
      Promise.resolve(fontsReady).then(() => {
        if (!cancelled) beginSettling();
      });
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      resizeObserver?.disconnect();
      if (settleTimer) clearTimeout(settleTimer);
      if (maxTimer) clearTimeout(maxTimer);
      if (graceTimer) clearTimeout(graceTimer);
      if (pollId) cancelAnimationFrame(pollId);
      document.documentElement.style.visibility = "";
      document.body.classList.remove("hash-settling");
    };
  }, []);

  return null;
}
