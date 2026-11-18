export default function WatchSpecs({ specs = {} }) {
  const specificationFields = [
    ["movement", "Movement"],
    ["strapMaterial", "Strap Material"],
    ["dialColour", "Dial Colour"],
    ["displayType", "Display Type"],
    ["caseMaterial", "Case Material"],
    ["waterResistance", "Water Resistance"],
    ["caseDiameter", "Case Diameter"],
    ["dialShape", "Dial Shape"],
    ["caseShape", "Case Shape"],
    ["dialSize", "Dial Size"],
    ["screenSize", "Screen Size"],
    ["batteryLife", "Battery Life"],
    ["connectivity", "Connectivity"],
    ["compatibleDevices", "Compatible Devices"],
    ["sensors", "Sensors"],
    ["chargingType", "Charging Type"],
  ];
  const availableSpecs = specificationFields.filter(([key]) => {
    const value = specs?.[key];
    return (
      (typeof value === "string" || typeof value === "number") &&
      String(value).trim() !== ""
    );
  });

  if (availableSpecs.length === 0) {
    return (
      <p className="rounded-sm border border-[#DED8CD] bg-[#F5F2EC] p-5 text-sm text-[#6D6961]">
        Specifications are currently unavailable.
      </p>
    );
  }

  return (
    <>
      <dl
        aria-label="Watch specifications"
        className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#DED8CD] bg-[#DED8CD] sm:grid-cols-2"
      >
        {availableSpecs.map(([key, label]) => (
          <div key={key} className="bg-[#FBFAF7] px-5 py-4">
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-[#9B8055]">
              {label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#35332F]">
              {specs[key]}
            </dd>
          </div>
        ))}
      </dl>
      {availableSpecs.length < 4 && (
        <p className="mt-3 text-xs leading-5 text-[#6D6961]">
          Fewer than four verified specifications are available in the current
          product data.
        </p>
      )}
    </>
  );
}
