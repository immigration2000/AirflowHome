# Units

Internal physics uses SI units.

| Quantity | Unit |
|---|---|
| Distance | meter (m) |
| Area | square meter (m²) |
| Air speed | meter/second (m/s) |
| Pressure | pascal (Pa) |
| Volumetric flow | cubic meter/second (m³/s) |
| Temperature | degree Celsius (°C) |
| Heat output | watt (W) |
| Angle | degree (°) |

Provider adapters convert incoming values before returning domain objects.

Do not mix km/h and m/s, cm and m, hPa and Pa, or radians and degrees. Conversion factors belong in named helpers.
