export default function disasterTypesPicker(curDisasterType) {
    const disasterTypesMap = {
        'Wildfire': 'Wildfire',
        'Flood': 'Flood',
        'Earthquake': 'Earthquake',
        'Hurricane': 'Hurricane',
        'Drought': 'Drought',
        'Tsunami': 'Tsunami',
        'Other': 'Other',
    };

    const categories = Object.keys(disasterTypesMap).map(disasterType => ({
        disasterType,
        label: disasterTypesMap[disasterType],
        selected: disasterType === curDisasterType ? "selected" : ''
    }));

    return categories;
}