export const moqRoutes = [
  {
    id: "ready-stock",
    title: "Existing style",
    label: "Catalogue style quantity",
    value: "Most listed styles: 120 pieces, subject to confirmation",
    summary:
      "Review the specific style's available sizes, colors and stock before ordering.",
  },
  {
    id: "private-label",
    title: "Your label",
    label: "Private label quantity",
    value: "Confirmed against labels, waistband and packaging",
    summary:
      "Choose an existing fit and review the minimums for your branding components.",
  },
  {
    id: "custom-color",
    title: "Your colors",
    label: "Custom color quantity",
    value: "Confirmed for the selected fabric and dyeing route",
    summary:
      "Fabric, dye lot and color development determine the custom-color minimum.",
  },
  {
    id: "full-oem",
    title: "Your own design",
    label: "Full OEM quantity",
    value: "Quoted against the complete development brief",
    summary:
      "Pattern, construction, materials and packaging are reviewed before a quantity is confirmed.",
  },
] as const;
