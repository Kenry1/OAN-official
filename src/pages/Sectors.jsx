import React, { useMemo, useState, useEffect } from 'react'
import HideOnScrollHeader from '../components/HideOnScrollHeader.jsx'
import Footer from '../components/Footer'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'
import {
  kenyaCenter,
  clientHeatPoints,
  solarHeatPoints,
  solarPlants,
  dataCenters,
  fiberCables,
  powerLines,
  series,
  buildMonthlyDataset,
  buildStackedRegionsDataset,
  clientTypes,
  regionsList,
} from '../data/sectorsData.js'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  Brush,
} from 'recharts'
import html2canvas from 'html2canvas'

function HeatmapLayer({ points, radius = 20, blur = 15, maxZoom = 17, gradient, opacity = 0.6 }) {
  const map = useMap()
  useEffect(() => {
    if (!points || points.length === 0) return
    const layer = L.heatLayer(points, { radius, blur, maxZoom, gradient, maxOpacity: opacity }).addTo(map)
    return () => {
      map.removeLayer(layer)
    }
  }, [map, points, radius, blur, maxZoom, gradient, opacity])
  return null
}

function ExportButtons({ targetId, csvBuilder, fileBase }) {
  const onExportPNG = async () => {
    const el = document.getElementById(targetId)
    if (!el) return
    const canvas = await html2canvas(el)
    const link = document.createElement('a')
    link.download = `${fileBase}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
  const onExportCSV = () => {
    const { filename, content } = csvBuilder()
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }
  return (
    <div className="flex items-center gap-2">
      <button onClick={onExportPNG} className="px-3 py-1 rounded border bg-white hover:bg-gray-50 text-sm">Export PNG</button>
      <button onClick={onExportCSV} className="px-3 py-1 rounded border bg-white hover:bg-gray-50 text-sm">Export CSV</button>
    </div>
  )
}

export default function Sectors() {
  const [showClients, setShowClients] = useState(true)
  const [showSolar, setShowSolar] = useState(true)
  const [showCables, setShowCables] = useState(true)
  const [showDataCenters, setShowDataCenters] = useState(true)
  const [showPower, setShowPower] = useState(true)
  const [followRoads, setFollowRoads] = useState(true)

  const [year, setYear] = useState(series.years[2])
  const [regions, setRegions] = useState(Object.keys(series.activeClientsByRegion))
  const [types, setTypes] = useState(clientTypes)

  const clientsStack = useMemo(() => buildStackedRegionsDataset(series.activeClientsByRegion, year), [year])
  const solarMonthly = useMemo(() => buildMonthlyDataset(series.solarCapacityMW, year), [year])
  const networkMonthly = useMemo(() => buildMonthlyDataset(series.networkCoverageIdx, year), [year])

  const regionOptions = Object.keys(series.activeClientsByRegion)
  const toggleRegion = (r) => {
    setRegions((prev) => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }
  const toggleType = (t) => {
    setTypes((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  const filteredClientHeat = useMemo(() =>
    clientHeatPoints
      .filter(p => (!regions.length || regions.includes(p.region)))
      .filter(p => (!types.length || types.includes(p.type)))
      .map(p => [p.lat, p.lng, p.intensity])
  , [regions, types])

  const filteredSolarHeat = useMemo(() =>
    solarHeatPoints
      .filter(p => (!regions.length || regions.includes(p.region)))
      .map(p => [p.lat, p.lng, p.intensity])
  , [regions])

  const filteredSolarPlants = useMemo(() => solarPlants.filter(s => (!regions.length || regions.includes(s.region))), [regions])
  const filteredDataCenters = useMemo(() => dataCenters.filter(d => (!regions.length || regions.includes(d.region))), [regions])

  // Helper to fetch road-following route from OSRM
  async function fetchRoadRoute(latlngs) {
    try {
      if (!latlngs || latlngs.length < 2) return null
      const coords = latlngs.map(([lat, lng]) => `${lng},${lat}`).join(';')
      const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
      const res = await fetch(url)
      if (!res.ok) return null
      const json = await res.json()
      const line = json?.routes?.[0]?.geometry?.coordinates || []
      if (!line.length) return null
      // Convert [lng,lat] -> [lat,lng]
      return line.map(([lng, lat]) => [lat, lng])
    } catch (e) {
      return null
    }
  }

  function RoadPolyline({ positions, color, weight, dashArray, opacity, popupContent }) {
    const [roadPositions, setRoadPositions] = useState(null)
    useEffect(() => {
      let mounted = true
      async function run() {
        if (!followRoads) {
          setRoadPositions(null)
          return
        }
        const routed = await fetchRoadRoute(positions)
        if (mounted) setRoadPositions(routed)
      }
      run()
      return () => { mounted = false }
    }, [positions, followRoads])
    const pts = roadPositions || positions
    return (
      <Polyline positions={pts} color={color} weight={weight} dashArray={dashArray} opacity={opacity}>
        {popupContent}
      </Polyline>
    )
  }

  const clientsCSV = () => {
    const header = ['month', ...regionOptions].join(',')
    const rows = clientsStack.map(r => [r.month, ...regionOptions.map(k => r[k] ?? '')].join(','))
    return { filename: `clients_${year}.csv`, content: [header, ...rows].join('\n') }
  }
  const solarCSV = () => {
    const header = 'month,capacityMW'
    const rows = solarMonthly.map(r => [r.month, r.value].join(','))
    return { filename: `solar_${year}.csv`, content: [header, ...rows].join('\n') }
  }
  const networkCSV = () => {
    const header = 'month,coverageIdx'
    const rows = networkMonthly.map(r => [r.month, r.value].join(','))
    return { filename: `network_${year}.csv`, content: [header, ...rows].join('\n') }
  }

  return (
    <div className="min-h-screen bg-white">
      <HideOnScrollHeader />

      <main className="container mx-auto px-4 pt-28 pb-16">
        <header className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kenya Sectors</h1>
            <p className="text-gray-600">Telecom and Energy infrastructure overview, client distribution, and trends</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700">Year</label>
            <select value={year} onChange={e => setYear(Number(e.target.value))} className="px-3 py-2 border rounded">
              {series.years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </header>

        {/* Map Section */}
        <section className="mb-10">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="absolute z-10 right-4 top-4 bg-white/90 backdrop-blur p-3 rounded-xl border border-gray-200 shadow flex flex-col gap-2 max-w-[260px]">
              <div className="text-sm font-semibold mb-1">Layers</div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showClients} onChange={() => setShowClients(v => !v)} /> Clients heatmap</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showSolar} onChange={() => setShowSolar(v => !v)} /> Solar heatmap</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showCables} onChange={() => setShowCables(v => !v)} /> Fiber cables</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showDataCenters} onChange={() => setShowDataCenters(v => !v)} /> Data centers</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showPower} onChange={() => setShowPower(v => !v)} /> Power lines</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={followRoads} onChange={() => setFollowRoads(v => !v)} /> Follow roads</label>
              <div className="h-px bg-gray-200 my-2" />
              <div className="text-xs font-semibold">Regions</div>
              <div className="flex flex-wrap gap-2">
                {regionOptions.map(r => (
                  <label key={`r-${r}`} className={`text-xs px-2 py-1 rounded-full border cursor-pointer ${regions.includes(r) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700'}`}>
                    <input type="checkbox" className="sr-only" checked={regions.includes(r)} onChange={() => toggleRegion(r)} />
                    {r}
                  </label>
                ))}
              </div>
              <div className="text-xs font-semibold mt-2">Client Types</div>
              <div className="flex flex-wrap gap-2">
                {clientTypes.map(t => (
                  <label key={`t-${t}`} className={`text-xs px-2 py-1 rounded-full border cursor-pointer ${types.includes(t) ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-700'}`}>
                    <input type="checkbox" className="sr-only" checked={types.includes(t)} onChange={() => toggleType(t)} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <MapContainer center={[kenyaCenter.lat, kenyaCenter.lng]} zoom={7} style={{ height: 520, width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {showClients && (
                <HeatmapLayer points={filteredClientHeat} gradient={{ 0.4: 'blue', 0.65: 'lime', 1: 'red' }} />
              )}
              {showSolar && (
                <HeatmapLayer points={filteredSolarHeat} gradient={{ 0.4: 'orange', 1: 'yellow' }} />
              )}
              {showCables && fiberCables.map((c, i) => (
                <RoadPolyline
                  key={i}
                  positions={c.path}
                  color="#2563eb"
                  weight={4}
                  opacity={0.8}
                  popupContent={
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">{c.name}</div>
                        <div>Capacity: {c.capacityGbps} Gbps</div>
                      </div>
                    </Popup>
                  }
                />
              ))}
              {showPower && powerLines.map((l, i) => (
                <RoadPolyline
                  key={`p-${i}`}
                  positions={l.path}
                  color="#16a34a"
                  weight={3}
                  dashArray="6 6"
                  opacity={0.9}
                  popupContent={
                    <Popup>
                      <div className="text-sm">
                        <div className="font-semibold">Power line</div>
                        <div>Voltage: {l.voltageKV} kV</div>
                      </div>
                    </Popup>
                  }
                />
              ))}
              {showDataCenters && filteredDataCenters.map((d, i) => (
                <CircleMarker key={i} center={[d.lat, d.lng]} radius={8} pathOptions={{ color: '#111827', fillColor: '#111827', fillOpacity: 0.9 }}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{d.name}</div>
                      <div>Provider: {d.provider}</div>
                      <div>Capacity: {d.capacity}</div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
              {showSolar && filteredSolarPlants.map((s, i) => (
                <CircleMarker key={`s-${i}`} center={[s.lat, s.lng]} radius={6} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.85 }}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold">{s.name}</div>
                      <div>Capacity: {s.capacityMW} MW</div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Analysis Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Analysis</h2>
            <div className="flex items-center gap-4">
              <ExportButtons targetId="clients-chart" csvBuilder={clientsCSV} fileBase={`clients_${year}`} />
              <ExportButtons targetId="solar-chart" csvBuilder={solarCSV} fileBase={`solar_${year}`} />
              <ExportButtons targetId="network-chart" csvBuilder={networkCSV} fileBase={`network_${year}`} />
            </div>
          </div>

          {/* Active clients by region (stacked area) */}
          <div id="clients-chart" className="rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="text-sm text-gray-700">Regions:</div>
              {regionOptions.map(r => (
                <label key={r} className={`text-sm px-3 py-1 rounded-full border cursor-pointer ${regions.includes(r) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-700'}`}>
                  <input type="checkbox" className="sr-only" checked={regions.includes(r)} onChange={() => toggleRegion(r)} />
                  {r}
                </label>
              ))}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <AreaChart data={clientsStack} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                  <defs>
                    {regionOptions.map((r, i) => (
                      <linearGradient key={r} id={`color-${r}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={['#2563eb', '#16a34a', '#f59e0b'][i % 3]} stopOpacity={0.35}/>
                        <stop offset="95%" stopColor={['#2563eb', '#16a34a', '#f59e0b'][i % 3]} stopOpacity={0.05}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {regionOptions.filter(r => regions.includes(r)).map((r, i) => (
                    <Area key={r} type="monotone" dataKey={r} stackId="1" stroke={['#2563eb', '#16a34a', '#f59e0b'][i % 3]} fill={`url(#color-${r})`} />
                  ))}
                  <Brush dataKey="month" height={16} stroke="#9ca3af" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-sm text-gray-600">Active clients continue to grow across all regions with Nairobi leading, reflecting increased last‑mile connectivity and enterprise onboarding.</p>
          </div>

          {/* Solar capacity (bar) */}
          <div id="solar-chart" className="rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={solarMonthly} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Capacity (MW)" fill="#f59e0b" />
                  <Brush dataKey="month" height={16} stroke="#9ca3af" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-sm text-gray-600">Solar capacity shows steady expansion driven by new plant deployments at the Coast and Rift Valley locations.</p>
          </div>

          {/* Network coverage (line) */}
          <div id="network-chart" className="rounded-2xl border border-gray-200 p-4 shadow-sm">
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={networkMonthly} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Coverage Index" stroke="#2563eb" dot={false} />
                  <Brush dataKey="month" height={16} stroke="#9ca3af" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-sm text-gray-600">Coverage index improves with backbone upgrades and metro fiber densification, reinforcing reliability SLAs.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
