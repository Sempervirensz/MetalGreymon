'use client';

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

type NfcStatus = "idle" | "writing" | "success" | "error" | "unsupported";
type NdefMessageInit = { records: { recordType: string; data: string }[] };
type NdefReaderCtor = new () => { write: (message: NdefMessageInit | string) => Promise<void> };

interface AccessCardProps {
  url: string;
}

export default function AccessCard({ url }: AccessCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);
  const [nfcStatus, setNfcStatus] = useState<NfcStatus>("idle");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setQrError(null);
      setQrDataUrl(null);
    });

    QRCode.toDataURL(url, {
      width: 220,
      margin: 1,
      errorCorrectionLevel: "Q",
      color: { dark: "#141414", light: "#ffffff" },
    })
      .then((dataUrl) => {
        if (!cancelled) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch((err) => {
        console.error("Failed to render QR code", err);
        if (!cancelled) {
          setQrError("Could not render QR code. Copy the URL below instead.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyStatus("error");
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
      setCopyStatus("error");
    }
  };

  const handleWriteNfc = async () => {
    if (typeof window === "undefined") return;
    const { NDEFReader } = window as unknown as { NDEFReader?: NdefReaderCtor };
    if (!NDEFReader) {
      setNfcStatus("unsupported");
      return;
    }

    try {
      const ndef = new NDEFReader();
      setNfcStatus("writing");
      await ndef.write({ records: [{ recordType: "url", data: url }] });
      setNfcStatus("success");
      setTimeout(() => setNfcStatus("idle"), 2500);
    } catch (err) {
      console.error("Failed to write NFC tag", err);
      setNfcStatus("error");
    }
  };

  const nfcMessage = (() => {
    switch (nfcStatus) {
      case "writing":
        return "Hold a writable NFC tag near your device.";
      case "success":
        return "Tag updated with NDEF URL!";
      case "error":
        return "Couldn't access the tag. Unlock the device and try again.";
      case "unsupported":
        return "Web NFC not available. Use an external writer instead.";
      default:
        return "Encode as NDEF URL for instant tap-to-open.";
    }
  })();

  return (
    <div className="grid gap-4 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:grid-cols-[136px,1fr] sm:items-center">
      <div className="flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-3">
        {qrDataUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={qrDataUrl} alt={`QR code for ${url}`} className="h-28 w-28" />
        ) : (
          <div className="h-28 w-28 animate-pulse rounded-lg bg-neutral-200" />
        )}
      </div>
      <div className="text-sm">
        <div className="font-semibold text-neutral-900">Scan QR or Tap NFC</div>
        <div className="mt-1 break-all font-mono text-xs text-neutral-600">Opens: {url}</div>
        {qrError && <div className="mt-2 text-xs text-rose-600">{qrError}</div>}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={handleCopy}
            className={
              "inline-flex items-center rounded-full border px-3 py-1 font-medium transition " +
              (copyStatus === "copied"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : copyStatus === "error"
                  ? "border-rose-400 bg-rose-50 text-rose-600"
                  : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 hover:bg-white")
            }
          >
            {copyStatus === "copied" ? "Copied!" : copyStatus === "error" ? "Copy unavailable" : "Copy URL"}
          </button>
          <button
            type="button"
            onClick={handleWriteNfc}
            className={
              "inline-flex items-center rounded-full border px-3 py-1 font-medium transition " +
              (nfcStatus === "success"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : nfcStatus === "error" || nfcStatus === "unsupported"
                  ? "border-rose-400 bg-rose-50 text-rose-600"
                  : "border-neutral-200 bg-neutral-900 text-white hover:bg-neutral-800")
            }
            disabled={nfcStatus === "writing"}
          >
            {nfcStatus === "writing"
              ? "Writing..."
              : nfcStatus === "success"
                ? "Tag ready"
                : nfcStatus === "unsupported"
                  ? "Web NFC unavailable"
                  : "Write to NFC"}
          </button>
        </div>
        <div className="mt-2 text-[11px] text-neutral-500" aria-live="polite">{nfcMessage}</div>
      </div>
    </div>
  );
}
