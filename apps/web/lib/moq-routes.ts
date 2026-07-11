export const moqRoutes = [
  {
    id: "ready-stock",
    title: "Ready-stock or mature style",
    label: "Ready Stock MOQ",
    value: "from 100 pcs per style when available",
    summary: "Low MOQ is available only for ready-stock or mature styles when available."
  },
  {
    id: "private-label",
    title: "Private label",
    label: "Private Label MOQ",
    value: "500 pcs per style for logo label or waistband programs",
    summary: "Logo-label and waistband programs use a separate MOQ based on the required components."
  },
  {
    id: "custom-color",
    title: "Custom color",
    label: "Custom Color MOQ",
    value: "1,000 pcs per color depending on fabric and dyeing route",
    summary: "Custom color MOQ depends on fabric, dyeing route, and color development."
  },
  {
    id: "full-oem",
    title: "Full OEM",
    label: "Full OEM MOQ",
    value: "1,000-3,000 pcs per style depending on pattern, fabric, and packaging",
    summary: "Full OEM MOQ depends on pattern, fabric, and packaging."
  }
] as const;
