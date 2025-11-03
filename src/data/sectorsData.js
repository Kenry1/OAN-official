// Core geospatial and time series data for the Sectors page

export const kenyaCenter = { lat: -1.286389, lng: 36.817223 };

// Active clients (for heatmap): [lat, lng, intensity]
export const regionsList = ['Nairobi', 'Coast', 'Western', 'Rift Valley'];
export const clientTypes = ['Enterprise', 'Consumer', 'Carrier'];

export const clientHeatPoints = [
  { lat: -1.286389, lng: 36.817223, intensity: 0.9, region: 'Nairobi', type: 'Enterprise', label: 'Nairobi CBD' },
  { lat: -1.3032, lng: 36.7073, intensity: 0.6, region: 'Nairobi', type: 'Consumer', label: 'Karen' },
  { lat: -1.0836, lng: 37.0134, intensity: 0.4, region: 'Nairobi', type: 'Carrier', label: 'Thika' },
  { lat: -1.2921, lng: 36.8225, intensity: 0.7, region: 'Nairobi', type: 'Enterprise', label: 'Westlands' },
  { lat: -3.9386, lng: 39.6682, intensity: 0.5, region: 'Coast', type: 'Enterprise', label: 'Mombasa' },
  { lat: -0.0917, lng: 34.7679, intensity: 0.45, region: 'Western', type: 'Consumer', label: 'Kisumu' },
  { lat: 0.5167, lng: 35.2833, intensity: 0.35, region: 'Rift Valley', type: 'Carrier', label: 'Eldoret' },
  { lat: 0.0236, lng: 37.9062, intensity: 0.3, region: 'Eastern', type: 'Consumer', label: 'Meru' },
];

// Solar plants (also heatmap + markers)
export const solarHeatPoints = [
  { lat: -3.9386, lng: 39.6682, intensity: 0.5, region: 'Coast' },
  { lat: -2.2773, lng: 40.9020, intensity: 0.35, region: 'Coast' },
  { lat: 0.5167, lng: 35.2833, intensity: 0.25, region: 'Rift Valley' },
];

export const solarPlants = [
  { lat: -3.9386, lng: 39.6682, name: 'Miritini Solar', capacityMW: 50, region: 'Coast' },
  { lat: -2.2773, lng: 40.902, name: 'Lamu Solar', capacityMW: 25, region: 'Coast' },
  { lat: 0.5167, lng: 35.2833, name: 'Eldoret Solar', capacityMW: 18, region: 'Rift Valley' },
];

export const dataCenters = [
  { lat: -1.2733, lng: 36.8119, name: 'DC Westlands', capacity: '3MW', provider: 'AAN', region: 'Nairobi' },
  { lat: -1.3276, lng: 36.8147, name: 'DC Karen', capacity: '2MW', provider: 'PartnerCo', region: 'Nairobi' },
];

// Fiber/network cable trails (simplified line segments)
export const fiberCables = [
  {
    name: 'Backbone A', capacityGbps: 400,
    path: [
      [-3.9386, 39.6682], // Mombasa
      [-1.286389, 36.817223], // Nairobi
      [0.5167, 35.2833], // Eldoret
    ]
  },
  {
    name: 'Metro Nairobi', capacityGbps: 200,
    path: [
      [-1.318, 36.77],
      [-1.286389, 36.817223],
      [-1.26, 36.83],
    ]
  }
];

// Power line routes
export const powerLines = [
  {
    voltageKV: 220,
    path: [
      [-1.4, 37.0],
      [-1.286389, 36.817223],
      [-0.0917, 34.7679],
    ]
  }
];

// Time-series (last 3 years, monthly)
const years = [new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()];

function genSeries(base, noise = 5) {
  const arr = [];
  for (let m = 1; m <= 12; m++) {
    const factor = 1 + (m / 12) * 0.2;
    arr.push(Math.round(base * factor + (Math.random() * noise - noise / 2)));
  }
  return arr;
}

export const series = {
  years,
  activeClientsByRegion: {
    Nairobi: { [years[0]]: genSeries(300), [years[1]]: genSeries(340), [years[2]]: genSeries(380) },
    Coast: { [years[0]]: genSeries(120), [years[1]]: genSeries(140), [years[2]]: genSeries(160) },
    Western: { [years[0]]: genSeries(100), [years[1]]: genSeries(120), [years[2]]: genSeries(150) },
  },
  solarCapacityMW: { [years[0]]: genSeries(10, 2), [years[1]]: genSeries(14, 2), [years[2]]: genSeries(18, 2) },
  networkCoverageIdx: { [years[0]]: genSeries(50, 4), [years[1]]: genSeries(60, 4), [years[2]]: genSeries(70, 4) },
};

export function buildMonthlyDataset(objByYear, year) {
  return Array.from({ length: 12 }).map((_, i) => ({ month: i + 1, value: objByYear[year][i] }));
}

export function buildStackedRegionsDataset(mapByRegion, year) {
  return Array.from({ length: 12 }).map((_, i) => {
    const row = { month: i + 1 };
    Object.entries(mapByRegion).forEach(([region, byYear]) => {
      row[region] = byYear[year][i];
    });
    return row;
  });
}


