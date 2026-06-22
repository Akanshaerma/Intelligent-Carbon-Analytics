// Carbon Footprint Calculation Constants (in kg CO2 per unit)
const EMISSION_FACTORS = {
    transport: 0.21,   // 0.21 kg CO2 per km (Average Car)
    electricity: 0.85, // 0.85 kg CO2 per unit (kWh)
    food: 2.5          // 2.5 kg CO2 per kg of meat/heavy meal
};

const calculateCarbon = (category, amount) => {
    const factor = EMISSION_FACTORS[category] || 0;
    return Number((amount * factor).toFixed(2)); // Round off to 2 decimal places
};

module.exports = calculateCarbon;