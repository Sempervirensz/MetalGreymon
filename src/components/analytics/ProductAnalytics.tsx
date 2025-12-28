'use client';

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { QrCode, Search, Globe2, ShieldAlert, BarChart3, Users2, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface ProductAnalyticsProps {
  productName: string;
  productId: string;
  sampleTrend?: Array<{ d: string; scans: number }>;
  topLocations?: Array<{ location: string; scans: number; unique: number; returning: number }>;
  deviceSplit?: Array<{ name: string; value: number }>;
  channelSplit?: Array<{ name: string; value: number }>;
  events?: Array<{
    time: string;
    event: string;
    qrId: string;
    productId: string;
    location: string;
    device: string;
    channel: string;
    user: string;
    flag: boolean;
  }>;
}

const defaultTrend = [
  { d: "Dec 01", scans: 820 },
  { d: "Dec 02", scans: 910 },
  { d: "Dec 03", scans: 1150 },
  { d: "Dec 04", scans: 980 },
  { d: "Dec 05", scans: 1320 },
  { d: "Dec 06", scans: 1480 },
  { d: "Dec 07", scans: 1210 },
  { d: "Dec 08", scans: 1600 },
  { d: "Dec 09", scans: 1750 },
  { d: "Dec 10", scans: 2100 },
  { d: "Dec 11", scans: 1980 },
  { d: "Dec 12", scans: 2320 },
  { d: "Dec 13", scans: 2240 },
  { d: "Dec 14", scans: 1900 },
];

const defaultLocations = [
  { location: "Phoenix, AZ (US)", scans: 6104, unique: 4910, returning: 22 },
  { location: "Los Angeles, CA (US)", scans: 4990, unique: 4210, returning: 17 },
  { location: "London (UK)", scans: 2114, unique: 1980, returning: 11 },
  { location: "Taipei (TW)", scans: 1880, unique: 1602, returning: 24 },
  { location: "Berlin (DE)", scans: 1292, unique: 1211, returning: 9 },
];

const defaultDeviceSplit = [
  { name: "Mobile", value: 92 },
  { name: "Desktop", value: 7 },
  { name: "Tablet", value: 1 },
];

const defaultChannelSplit = [
  { name: "Direct / QR", value: 61 },
  { name: "Organic Search", value: 14 },
  { name: "Paid Social", value: 11 },
  { name: "Email", value: 8 },
  { name: "Referral", value: 6 },
];

const defaultEvents = [
  {
    time: "2025-12-27 10:14",
    event: "scan_qr",
    qrId: "QR_14_00321",
    productId: "CAPLIN_COFFEE",
    location: "US / AZ / Phoenix",
    device: "Mobile",
    channel: "Direct/QR",
    user: "—",
    flag: false,
  },
  {
    time: "2025-12-27 10:14",
    event: "passport_view",
    qrId: "QR_14_00321",
    productId: "CAPLIN_COFFEE",
    location: "US / AZ / Phoenix",
    device: "Mobile",
    channel: "Direct/QR",
    user: "—",
    flag: false,
  },
];

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{value}</div>
      {hint ? <div className="mt-1 text-xs text-gray-400">{hint}</div> : null}
    </div>
  );
}

function MiniTable({
  columns,
  rows,
}: {
  columns: { key: string; label: string; align?: "left" | "right" }[];
  rows: Record<string, any>[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((c) => (
          <div
            key={c.key}
            className={`px-4 py-3 text-xs font-medium text-gray-500 bg-gray-50 ${
              c.align === "right" ? "text-right" : "text-left"
            }`}
          >
            {c.label}
          </div>
        ))}
        {rows.map((r, idx) =>
          columns.map((c) => (
            <div
              key={`${idx}-${c.key}`}
              className={`px-4 py-3 text-sm border-t border-gray-100 ${
                c.align === "right" ? "text-right tabular-nums" : "text-left"
              }`}
            >
              {r[c.key]}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default function ProductAnalytics({ 
  productName, 
  productId,
  sampleTrend = defaultTrend,
  topLocations = defaultLocations,
  deviceSplit = defaultDeviceSplit,
  channelSplit = defaultChannelSplit,
  events = defaultEvents,
}: ProductAnalyticsProps) {
  const [dateRange, setDateRange] = useState("Last 28 days");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [countryFilter, setCountryFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    const s = search.trim().toLowerCase();
    return events.filter((e) => {
      const matchSearch = !s || [e.qrId, e.productId, e.event, e.location, e.channel].some((x) => String(x).toLowerCase().includes(s));
      const matchCountry = countryFilter === "all" || e.location.startsWith(countryFilter);
      const matchChannel = channelFilter === "all" || e.channel === channelFilter;
      return matchSearch && matchCountry && matchChannel;
    });
  }, [search, countryFilter, channelFilter, events]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/50">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center shadow-sm">
                <QrCode className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-tight text-gray-900">{productName} Analytics</div>
                <div className="text-sm text-gray-500">Product ID: {productId}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm"
              >
                <option>Last 7 days</option>
                <option>Last 28 days</option>
                <option>Last 90 days</option>
                <option>Custom</option>
              </select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search qr_id / product_id / event / location"
                  className="pl-9 pr-4 py-2 w-[320px] rounded-full border border-gray-200 text-sm"
                />
              </div>

              <Chip icon={<Globe2 className="h-3.5 w-3.5" />} text="Geo: IP-derived" />
              <Chip icon={<ShieldAlert className="h-3.5 w-3.5" />} text="Privacy: no GPS" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm w-44"
            >
              <option value="all">All countries</option>
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="TW">TW</option>
              <option value="DE">DE</option>
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm w-44"
            >
              <option value="all">All channels</option>
              {channelSplit.map((c) => (
                <option key={c.name} value={c.name === "Direct / QR" ? "Direct/QR" : c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="ml-auto flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                Environment: Vercel/Cloudflare headers
              </span>
              <Button variant="secondary" className="rounded-full">
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "events"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users2 className="h-4 w-4 inline mr-2" />
            Events
          </button>
        </div>

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Stat label="Total scans" value="48,210" hint="All scan_qr events" />
              <Stat label="Unique scanners" value="36,980" hint="Approx users" />
              <Stat label="Returning" value="19%" hint="Repeat scanners" />
              <Stat label="Top country" value="US (61%)" hint="IP-derived" />
              <Stat label="Avg engagement" value="00:42" hint="Post-scan time" />
              <Stat label="Flags" value="27" hint="Anomaly rules" />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-5 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Scans over time</span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      Annotate spikes
                    </span>
                  </div>
                </div>
                <div className="p-5 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="d" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="scans" strokeWidth={2} stroke="#ea580c" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-5 pb-2">
                  <div className="font-semibold text-gray-900">Top locations</div>
                </div>
                <div className="p-5">
                  <MiniTable
                    columns={[
                      { key: "location", label: "Location" },
                      { key: "scans", label: "Scans", align: "right" },
                      { key: "unique", label: "Unique", align: "right" },
                      { key: "returning", label: "Return", align: "right" },
                    ]}
                    rows={topLocations.map((x) => ({
                      ...x,
                      returning: `${x.returning}%`,
                    }))}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-5 pb-2">
                  <div className="font-semibold text-gray-900">Devices</div>
                </div>
                <div className="p-5 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie data={deviceSplit} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={2}>
                        {deviceSplit.map((_, i) => (
                          <Cell key={i} fill={["#ea580c", "#f97316", "#fb923c"][i]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {deviceSplit.map((d) => (
                      <span key={d.name} className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                        {d.name}: {d.value}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-5 pb-2">
                  <div className="font-semibold text-gray-900">Acquisition</div>
                </div>
                <div className="p-5 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelSplit} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ea580c" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-5 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Anomalies</span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                      27 flagged
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 p-4">
                      <div className="mt-0.5">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Burst scans</div>
                        <div className="text-sm text-gray-500">50+ scans in 60s from same city + same device fingerprint.</div>
                        <div className="mt-2">
                          <span className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-600">
                            Rule: burst_city_ua
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-5 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Event stream</span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                    Showing {filteredEvents.length} events
                  </span>
                  <Button variant="secondary" className="rounded-full">
                    Create alert
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-12 gap-2 px-2 py-2 text-xs text-gray-500 bg-gray-50">
                <div className="col-span-2">Timestamp</div>
                <div className="col-span-2">Event</div>
                <div className="col-span-2">qr_id</div>
                <div className="col-span-2">product_id</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1">Device</div>
                <div className="col-span-1 text-right">Flag</div>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="max-h-[440px] overflow-y-auto space-y-2 py-2">
                {filteredEvents.map((e, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 rounded-2xl border border-gray-200 p-3 hover:bg-gray-50 transition">
                    <div className="col-span-2 text-sm tabular-nums text-gray-900">{e.time}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        e.event === "scan_qr" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {e.event}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm font-mono text-gray-900">{e.qrId}</div>
                    <div className="col-span-2 text-sm font-mono text-gray-900">{e.productId}</div>
                    <div className="col-span-2 text-sm text-gray-700">{e.location}</div>
                    <div className="col-span-1 text-sm text-gray-700">{e.device}</div>
                    <div className="col-span-1 flex justify-end">
                      {e.flag ? (
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                          Flag
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full border border-gray-200 text-xs text-gray-500">
                          —
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
