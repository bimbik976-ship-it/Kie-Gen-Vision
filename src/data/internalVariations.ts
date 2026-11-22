/**
 * Comprehensive Internal Creative Variation System
 * 
 * Large internal option pool for:
 * 1. Background
 * 2. Mood
 * 3. Kategori
 * 4. Dekorasi
 * 5. Flower
 * 6. Basin (Multi-dimensional 3-level)
 * 7. Bamboo
 * 
 * Includes composition frameworks, descriptive structures, and anti-repetition signatures.
 */

// ==========================================
// 1. BACKGROUND INTERNAL CREATIVE POOL
// ==========================================
export interface BackgroundVariation {
  id: string;
  uiCategory: string; // which UI option this belongs to, or 'All'
  title: string;
  environmentStructure: string;
  spatialDepth: string;
  vegetationDensity: string;
  terrainAndSurfaces: string;
  atmosphericEnclosure: string;
}

export const INTERNAL_BACKGROUND_POOL: BackgroundVariation[] = [
  // Zen Garden Variants
  {
    id: 'zen_raked_gravel_terrace',
    uiCategory: 'Japanese Zen Garden',
    title: 'Raked Quartz Gravel & Moss Island Terrace',
    environmentStructure: 'an authentic karesansui dry landscape terrace with concentric raked white quartz gravel ripples encircling moss-crested anchor stones',
    spatialDepth: 'shallow foreground leading to a low charred cedar veranda wall, with soft Japanese black pine silhouettes framing the distant background',
    vegetationDensity: 'sparse, disciplined bonsai-pruned dwarf pines and velvety hummocks of kyoto moss',
    terrainAndSurfaces: 'immaculately raked fine granite gravel meeting dark, wet flagstone stepping paths',
    atmosphericEnclosure: 'open contemplative sky balanced by an austere low clay-and-timber boundary wall',
  },
  {
    id: 'zen_secluded_tea_courtyard',
    uiCategory: 'Japanese Zen Garden',
    title: 'Wabi-Sabi Tea Pavilion Alcove',
    environmentStructure: 'a quiet alcove beside a weathered earthen plaster wall with exposed bamboo laths and antique roof tiles',
    spatialDepth: 'intimate mid-ground depth with soft focus paper shoji screens glowing faintly in the upper-left periphery',
    vegetationDensity: 'scattered cushions of hair-cap moss and a solitary weeping Japanese maple leaning gracefully',
    terrainAndSurfaces: 'dark blue-gray slate stepping stones sunken into fine gray river gravel',
    atmosphericEnclosure: 'sheltered tranquil corner shielded from wind by thick woven bamboo fencing',
  },
  {
    id: 'zen_temple_moss_corridor',
    uiCategory: 'Japanese Zen Garden',
    title: 'Kyoto Temple Moss Cloister',
    environmentStructure: 'an ancient temple garden corridor bordered by rounded granite curb stones and centuries-old cedar pillars',
    spatialDepth: 'deep linear perspective of mossy mounds receding toward a distant stone pagoda silhouette',
    vegetationDensity: 'dense, unbroken carpet of emerald velvet moss shaded by soaring cryptomeria trees',
    terrainAndSurfaces: 'damp charcoal river stones polished by footsteps, flanked by rich organic loam',
    atmosphericEnclosure: 'deeply shaded, cool cathedral-like woodland canopy filtering ambient sky light',
  },

  // Mountain Spring Variants
  {
    id: 'mountain_limestone_ravine',
    uiCategory: 'Misty Mountain Spring',
    title: 'Alpine Limestone Spring Grotto',
    environmentStructure: 'a secluded mountain rock face where fresh mineral spring water seeps continuously from natural limestone fissures',
    spatialDepth: 'tiered rocky cliff rising in the middle ground, with soft mountain mist swirling through the upper ravine',
    vegetationDensity: 'wild maidenhair ferns and moisture-loving saxifrage nestled in rock crevices',
    terrainAndSurfaces: 'water-washed basalt shelves, damp gravel banks, and tumbled crystalline river stones',
    atmosphericEnclosure: 'high natural rock enclosure with cool, humid micro-climate and swirling updrafts of mist',
  },
  {
    id: 'mountain_fern_cascade_glen',
    uiCategory: 'Misty Mountain Spring',
    title: 'Highland Fern & Spring Glen',
    environmentStructure: 'a quiet mountain shelf positioned near a gentle subterranean natural spring runoff',
    spatialDepth: 'layered depth with nearby moss boulders giving way to mist-veiled silhouettes of highland larch trees',
    vegetationDensity: 'lush feathery mountain ferns, wild alpine moss, and delicate mountain lichen',
    terrainAndSurfaces: 'dark slate scree beds interspersed with damp, spongy humus soil',
    atmosphericEnclosure: 'open mountain air with drifting low-altitude cloud tendrils curling through the clearing',
  },
  {
    id: 'mountain_ancient_spring_shelf',
    uiCategory: 'Misty Mountain Spring',
    title: 'Mossy Spring Escarpment',
    environmentStructure: 'an ancient stone terrace built into a natural slope where spring water feeds a calm pool',
    spatialDepth: 'graduated vertical elevation with towering damp rock faces behind and open valley mist beyond',
    vegetationDensity: 'hanging tendrils of mountain moss and dwarf alpine rhododendrons in crevice niches',
    terrainAndSurfaces: 'rough-cleaved stone ledges glistening with perpetual moisture and mineral patina',
    atmosphericEnclosure: 'sheltered hollow beneath an overhanging rock ledge, protected yet filled with mountain air',
  },

  // Tropical Bamboo Sanctuary Variants
  {
    id: 'tropical_shaded_bamboo_glen',
    uiCategory: 'Tropical Bamboo Sanctuary',
    title: 'Sunken Tropical Bamboo Glen',
    environmentStructure: 'a sunken botanical sanctuary surrounded by towering golden and emerald bamboo culms',
    spatialDepth: 'dense vertical layering of bamboo stalks creating rhythmic depth planes receding into emerald gloom',
    vegetationDensity: 'luxuriant tropical understory with broad elephant ear leaves, dwarf fishtail palms, and climbing philodendron',
    terrainAndSurfaces: 'dark volcanic cinder soil scattered with fallen bamboo leaves and wet porous lava rock',
    atmosphericEnclosure: 'dense vaulted bamboo canopy creating an organic cathedral ceiling of dappled emerald light',
  },
  {
    id: 'tropical_stream_bamboo_haven',
    uiCategory: 'Tropical Bamboo Sanctuary',
    title: 'Riverside Tropical Bamboo Haven',
    environmentStructure: 'a tranquil clearing along a slow-moving tropical garden stream bordered by giant moso bamboo',
    spatialDepth: 'diagonal water path receding into soft-focus tropical foliage and towering bamboo silhouettes',
    vegetationDensity: 'dense clusters of bird-of-paradise foliage, wild ginger blossoms, and velvety river moss',
    terrainAndSurfaces: 'smooth river-tumbled black basalt boulders and wet, compacted volcanic sand',
    atmosphericEnclosure: 'warm, humid greenhouse-like stillness with gentle breezes rustling upper culm tips',
  },

  // Minimalist Water Atrium Variants
  {
    id: 'minimalist_reflecting_atrium',
    uiCategory: 'Minimalist Water Atrium',
    title: 'Architectural Polished Concrete & Water Court',
    environmentStructure: 'a refined modern architectural atrium featuring monolithic board-formed concrete planes and dark reflecting pools',
    spatialDepth: 'crisp rectilinear sightlines receding past floor-to-ceiling frameless glass into an open sky void',
    vegetationDensity: 'austere and singular: a single sculptural black pine or solitary Japanese maple in a stone well',
    terrainAndSurfaces: 'honed gray basalt pavers, dark river pebble perimeter drains, and still sheet-water planes',
    atmosphericEnclosure: 'semi-enclosed skywell courtyard focusing daylight directly into the tranquil interior',
  },
  {
    id: 'minimalist_cedar_glass_pavilion',
    uiCategory: 'Minimalist Water Atrium',
    title: 'Hinoki Cedar & Shaded Water Sanctum',
    environmentStructure: 'a quiet modern pavilion with horizontal slatted hinoki wood screens and a cantilevered stone basin shelf',
    spatialDepth: 'layered architectural screens filtering light between interior stone platforms and an exterior bamboo garden',
    vegetationDensity: 'restrained: miniature moss mound with a solitary micro-fern in a shallow stone incision',
    terrainAndSurfaces: 'matte charcoal granite floor tiles with narrow water channels flowing flush with the stone',
    atmosphericEnclosure: 'sheltered architectural portico with controlled soft ambient perimeter illumination',
  },

  // Moss Rock Tea Garden Variants
  {
    id: 'moss_rock_roji_clearing',
    uiCategory: 'Moss Rock Tea Garden',
    title: 'Chaniwa Inner Tea Path Clearing',
    environmentStructure: 'an intimate inner tea garden (roji) nestled between ancient weathered stone borders and rustic cedar bark fences',
    spatialDepth: 'meandering stepping stone path (tobi-ishi) curling behind a large moss-cushioned boulder into soft shadows',
    vegetationDensity: 'thick cushions of star moss, wild camellia shrubs, and delicate maidenhair fern fronds',
    terrainAndSurfaces: 'naturally water-worn river stepping stones bedded in dark organic forest floor loam',
    atmosphericEnclosure: 'intimate, enclosed contemplation space shaded by weeping cherry branches and mountain maple',
  },
  {
    id: 'moss_ancient_boulder_nook',
    uiCategory: 'Moss Rock Tea Garden',
    title: 'Lichen-Dappled Boulder Sanctuary',
    environmentStructure: 'a quiet garden nook framed by massive, millennia-old glacial boulders draped in thick emerald bryophyte moss',
    spatialDepth: 'compact immediate mid-ground with boulders forming a natural amphitheater around the water basin',
    vegetationDensity: 'deep multi-layered moss varieties, tiny creeping thyme, and delicate Japanese forest grass',
    terrainAndSurfaces: 'irregular slate chips, damp forest pebbles, and soft damp peat borders',
    atmosphericEnclosure: 'quiet, deeply grounded woodland alcove with muted acoustics and still air',
  },

  // Deep Forest Roji Trail Variants
  {
    id: 'deep_forest_cedar_trail',
    uiCategory: 'Deep Forest Roji Trail',
    title: 'Ancient Cryptomeria Forest Trail',
    environmentStructure: 'a historic pilgrimage trail through ancient towering Japanese cedar (sugi) trees with massive buttress roots',
    spatialDepth: 'deep longitudinal woodland perspective with distant sun rays cutting through cathedral tree trunks',
    vegetationDensity: 'wild forest floor carpeted in wood sorrel, wild ginger leaves, and towering ostrich ferns',
    terrainAndSurfaces: 'centuries-old stone flagstones weathered unevenly by rain and moss growth',
    atmosphericEnclosure: 'majestic forest enclosure with moist, cool air saturated with pine resin and ozone',
  },

  // Modern Architectural Courtyard Variants
  {
    id: 'modern_black_granite_sanctum',
    uiCategory: 'Modern Architectural Courtyard',
    title: 'Honed Black Granite & Water Court',
    environmentStructure: 'a contemporary luxury courtyard featuring dark honed Zimbabwe granite walls with a continuous sheet-water cascade',
    spatialDepth: 'structured geometric planes framing a central sunken garden island surrounded by mirror-finish water',
    vegetationDensity: 'sculptural cloud-pruned Japanese yew (Niwaki) rising from a crisp geometric moss bed',
    terrainAndSurfaces: 'large-format flamed granite slabs interspersed with dark river pebble runnels',
    atmosphericEnclosure: 'open private open-air sky terrace with tall clean architectural privacy screens',
  },

  // Secluded Kyoto Temple Grounds Variants
  {
    id: 'kyoto_temple_veranda_garden',
    uiCategory: 'Secluded Kyoto Temple Grounds',
    title: 'Temple Engawa Garden Sanctuary',
    environmentStructure: 'a private cloistered courtyard adjoining a traditional timber temple veranda (engawa) with overhanging eaves',
    spatialDepth: 'foreground stone basin framed by timber veranda post on the right, looking out toward raked gravel and mossy mounds',
    vegetationDensity: 'ancient weeping weeping cherry, sculptured azalea shrubs, and undisturbed carpets of moss',
    terrainAndSurfaces: 'smooth river-stone drip line under the eaves meeting dry gravel and stepping stones',
    atmosphericEnclosure: 'tranquil, sacred seclusion steeped in centuries of silence and mindful care',
  },

  // Rainforest Spring Sanctuary Variants
  {
    id: 'rainforest_canopy_spring',
    uiCategory: 'Rainforest Spring Sanctuary',
    title: 'Primeval Rainforest Spring Basin',
    environmentStructure: 'a lush primeval forest clearing where a natural thermal or cool freshwater spring bubbles through volcanic rocks',
    spatialDepth: 'dense multi-tiered jungle canopy with hanging lianas and epiphyte-laden branches extending overhead',
    vegetationDensity: 'hyper-dense tropical flora: giant bird-nest ferns, staghorn ferns, monstera, and lush moss cushions',
    terrainAndSurfaces: 'dark vesicular volcanic rock, damp riverbed gravel, and rich decaying organic soil',
    atmosphericEnclosure: 'humid, moisture-laden atmosphere with visible vapor rising gently from the earth',
  },
  { id: 'bg_luminous_bamboo_forest', uiCategory: 'Luminous Bamboo Forest Sanctuary', title: 'Luminous Emerald Bamboo Sanctuary', environmentStructure: 'a dense emerald bamboo forest surrounding a tranquil water feature with subtle warm and turquoise points of light', spatialDepth: 'deep layered bamboo trunks receding into a soft atmospheric corridor', vegetationDensity: 'lush tropical understory with glossy broad leaves and fine ferns', terrainAndSurfaces: 'smooth wet river stones and shallow reflective water', atmosphericEnclosure: 'enclosed forest canopy with magical soft illumination and humid depth' },
  { id: 'bg_turquoise_pebble_creek', uiCategory: 'Turquoise Pebble Creek Garden', title: 'Turquoise Pebble Creek Retreat', environmentStructure: 'a shallow crystal-clear creek flowing through smooth pale pebbles and rounded stones', spatialDepth: 'the water path leads toward a softly blurred botanical background', vegetationDensity: 'fresh low green plants clustered naturally along the creek edges', terrainAndSurfaces: 'polished wet pebbles beneath transparent turquoise water', atmosphericEnclosure: 'cool, serene creek microclimate with soft reflected light' },
  { id: 'bg_enchanted_night_bamboo', uiCategory: 'Enchanted Night Bamboo Grove', title: 'Enchanted Midnight Bamboo Grove', environmentStructure: 'towering bamboo surrounding a secluded illuminated water sanctuary at night', spatialDepth: 'vertical bamboo layers fade gradually into deep teal darkness', vegetationDensity: 'dense tropical leaves with occasional tiny luminous accents', terrainAndSurfaces: 'wet stones and reflective pools catching warm and cyan highlights', atmosphericEnclosure: 'mysterious humid night atmosphere with gentle glowing points' },
  { id: 'bg_biolum_water_garden', uiCategory: 'Bioluminescent Water Garden', title: 'Bioluminescent Bamboo Water Garden', environmentStructure: 'a fantastical botanical water garden where turquoise illumination softly emanates around the flowing water feature', spatialDepth: 'receding bamboo trunks and foliage create a layered glowing tunnel', vegetationDensity: 'lush green foliage framing the water while remaining secondary to the focal feature', terrainAndSurfaces: 'rounded wet river stones and clear reflective water', atmosphericEnclosure: 'dreamlike humid enclosure with restrained bioluminescent ambience' },
  { id: 'bg_glowing_tropical_stream', uiCategory: 'Glowing Tropical Stream Sanctuary', title: 'Glowing Tropical Stream Sanctuary', environmentStructure: 'a tranquil tropical stream winding through bamboo, smooth stones, and dense botanical growth', spatialDepth: 'the stream creates a strong central depth path toward distant foliage', vegetationDensity: 'rich tropical greenery with layered leaves and delicate ground plants', terrainAndSurfaces: 'rounded pale stones, shallow water, and wet reflective surfaces', atmosphericEnclosure: 'warm humid sanctuary with subtle golden and turquoise glow' },
  { id: 'bg_clear_moonlit_bamboo', uiCategory: 'Clear Moonlit Bamboo Sanctuary', title: 'Clear Moonlit Bamboo Sanctuary', environmentStructure: 'a tranquil bamboo water sanctuary beneath a large clearly visible moon in an open night sky', spatialDepth: 'layered bamboo and foliage frame the scene while leaving a clean opening around the moon', vegetationDensity: 'lush dark emerald bamboo and tropical plants with soft moonlit edges', terrainAndSurfaces: 'smooth wet stones and reflective water catching a crisp moon reflection', atmosphericEnclosure: 'clear calm night atmosphere with the moon visibly defined and unobscured, subtle cool blue illumination, no heavy haze covering the moon' },
  { id: 'bg_visible_full_moon', uiCategory: 'Visible Full Moon Forest Garden', title: 'Visible Full Moon Forest Garden', environmentStructure: 'a serene forest water garden with a large bright full moon clearly visible above the tree line', spatialDepth: 'the garden recedes into layered foliage while the upper background opens toward the visible moon', vegetationDensity: 'dense tropical greenery with controlled silhouettes that do not obscure the moon', terrainAndSurfaces: 'wet natural stones and calm reflective water carrying a distinct moon reflection', atmosphericEnclosure: 'clean moonlit night with crisp atmospheric separation and a clearly recognizable full moon' },
  { id: 'bg_moonlit_water_clear_moon', uiCategory: 'Moonlit Water Garden with Clear Moon', title: 'Moonlit Water Garden with Clear Moon', environmentStructure: 'a peaceful water garden surrounded by bamboo and tropical foliage with a clearly visible moon positioned in an open portion of the sky', spatialDepth: 'foreground water leads toward the garden while the distant canopy creates a natural frame around the moon', vegetationDensity: 'lush foliage arranged to frame rather than block the moon', terrainAndSurfaces: 'smooth wet stones and still water with a visible moon reflection', atmosphericEnclosure: 'quiet transparent night atmosphere with crisp moonlight and the moon remaining visually prominent' },

  // Non-bamboo flower backgrounds: 15 flowers x clear moon / no moon.
  { id: 'bg_flower_purple_orchid_clear_moon', uiCategory: 'Purple Orchid Garden — Clear Moon', title: 'Purple Orchid Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring purple orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the purple orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_purple_orchid_no_moon', uiCategory: 'Purple Orchid Garden — No Moon', title: 'Purple Orchid Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring purple orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the purple orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_white_orchid_clear_moon', uiCategory: 'White Orchid Garden — Clear Moon', title: 'White Orchid Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring white orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the white orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_white_orchid_no_moon', uiCategory: 'White Orchid Garden — No Moon', title: 'White Orchid Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring white orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the white orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_lavender_clear_moon', uiCategory: 'Lavender Garden — Clear Moon', title: 'Lavender Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring soft lavender flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the soft lavender flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_lavender_no_moon', uiCategory: 'Lavender Garden — No Moon', title: 'Lavender Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring soft lavender flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the soft lavender flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_plumeria_clear_moon', uiCategory: 'Plumeria Garden — Clear Moon', title: 'Plumeria Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring white and pale-pink plumeria blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the white and pale-pink plumeria blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_plumeria_no_moon', uiCategory: 'Plumeria Garden — No Moon', title: 'Plumeria Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring white and pale-pink plumeria blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the white and pale-pink plumeria blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_hibiscus_clear_moon', uiCategory: 'Hibiscus Garden — Clear Moon', title: 'Hibiscus Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring lush hibiscus flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the lush hibiscus flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_hibiscus_no_moon', uiCategory: 'Hibiscus Garden — No Moon', title: 'Hibiscus Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring lush hibiscus flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the lush hibiscus flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_blue_hydrangea_clear_moon', uiCategory: 'Blue Hydrangea Garden — Clear Moon', title: 'Blue Hydrangea Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring clusters of blue hydrangea as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the clusters of blue hydrangea, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_blue_hydrangea_no_moon', uiCategory: 'Blue Hydrangea Garden — No Moon', title: 'Blue Hydrangea Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring clusters of blue hydrangea as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the clusters of blue hydrangea, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_white_gardenia_clear_moon', uiCategory: 'White Gardenia Garden — Clear Moon', title: 'White Gardenia Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring creamy white gardenia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the creamy white gardenia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_white_gardenia_no_moon', uiCategory: 'White Gardenia Garden — No Moon', title: 'White Gardenia Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring creamy white gardenia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the creamy white gardenia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_bird_of_paradise_clear_moon', uiCategory: 'Bird of Paradise Garden — Clear Moon', title: 'Bird of Paradise Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring sculptural bird of paradise flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the sculptural bird of paradise flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_bird_of_paradise_no_moon', uiCategory: 'Bird of Paradise Garden — No Moon', title: 'Bird of Paradise Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring sculptural bird of paradise flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the sculptural bird of paradise flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_lotus_clear_moon', uiCategory: 'Lotus Garden — Clear Moon', title: 'Lotus Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring elegant lotus flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the elegant lotus flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_lotus_no_moon', uiCategory: 'Lotus Garden — No Moon', title: 'Lotus Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring elegant lotus flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the elegant lotus flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_water_lily_clear_moon', uiCategory: 'Water Lily Garden — Clear Moon', title: 'Water Lily Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring floating water lilies as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the floating water lilies, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_water_lily_no_moon', uiCategory: 'Water Lily Garden — No Moon', title: 'Water Lily Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring floating water lilies as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the floating water lilies, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_jasmine_clear_moon', uiCategory: 'Jasmine Garden — Clear Moon', title: 'Jasmine Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring small white jasmine flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the small white jasmine flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_jasmine_no_moon', uiCategory: 'Jasmine Garden — No Moon', title: 'Jasmine Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring small white jasmine flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the small white jasmine flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_pink_orchid_clear_moon', uiCategory: 'Pink Orchid Garden — Clear Moon', title: 'Pink Orchid Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring delicate pink orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the delicate pink orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_pink_orchid_no_moon', uiCategory: 'Pink Orchid Garden — No Moon', title: 'Pink Orchid Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring delicate pink orchid blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the delicate pink orchid blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_white_magnolia_clear_moon', uiCategory: 'White Magnolia Garden — Clear Moon', title: 'White Magnolia Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring large white magnolia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the large white magnolia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_white_magnolia_no_moon', uiCategory: 'White Magnolia Garden — No Moon', title: 'White Magnolia Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring large white magnolia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the large white magnolia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_camellia_clear_moon', uiCategory: 'Camellia Garden — Clear Moon', title: 'Camellia Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring soft camellia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the soft camellia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_camellia_no_moon', uiCategory: 'Camellia Garden — No Moon', title: 'Camellia Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring soft camellia blossoms as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the soft camellia blossoms, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },
  { id: 'bg_flower_blue_iris_clear_moon', uiCategory: 'Blue Iris Garden — Clear Moon', title: 'Blue Iris Garden — Clear Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring blue iris flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage toward an open sky with a large clearly visible moon', vegetationDensity: 'lush tropical and ornamental greenery arranged around the blue iris flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'clear calm moonlit night with crisp moonlight and the moon unobscured' },
  { id: 'bg_flower_blue_iris_no_moon', uiCategory: 'Blue Iris Garden — No Moon', title: 'Blue Iris Garden — No Moon', environmentStructure: 'a tranquil non-bamboo botanical water garden featuring blue iris flowers as the signature background planting', spatialDepth: 'the water feature leads through layered foliage beneath a natural open sky with no moon visible', vegetationDensity: 'lush tropical and ornamental greenery arranged around the blue iris flowers, with the flower composition clearly readable', terrainAndSurfaces: 'smooth wet stones, shallow reflective water, and natural garden surfaces', atmosphericEnclosure: 'calm natural evening atmosphere with soft ambient garden lighting and no moon visible' },

];

// ==========================================
// 2. MOOD INTERNAL CREATIVE POOL
// ==========================================
export interface MoodVariation {
  id: string;
  uiCategory: string;
  title: string;
  lightingDirective: string;
  atmosphericNuance: string;
  colorHarmony: string;
  specularAndReflection: string;
}

export const INTERNAL_MOOD_POOL: MoodVariation[] = [
  // Peaceful & Meditative
  {
    id: 'meditative_soft_zenith',
    uiCategory: 'Peaceful & Meditative',
    title: 'Soft Zenith Diffuse Serenity',
    lightingDirective: 'soft, shadowless daylight filtered through a continuous canopy of fine bamboo foliage, casting gentle, non-directional illumination',
    atmosphericNuance: 'unbroken silence, tranquil equilibrium, and a contemplative absence of haste or motion',
    colorHarmony: 'muted sage greens, warm weathered stone grays, earthy charcoal, and crystalline water silver',
    specularAndReflection: 'delicate, calm specular sheen on the water mirror reflecting the soft overhead sky like liquid glass',
  },
  {
    id: 'meditative_still_sanctuary',
    uiCategory: 'Peaceful & Meditative',
    title: 'Still Sanctuary Repose',
    lightingDirective: 'gentle ambient illumination with low contrast and whisper-soft gradients across organic stone curves',
    atmosphericNuance: 'deep internal calm, restorative stillness, and an aura of timeless contemplative peace',
    colorHarmony: 'deep jade, velvet moss emerald, wet schist dark gray, and pale bamboo ochre',
    specularAndReflection: 'subtle, micro-ripples creating concentric rings of soft silver light around the water entry point',
  },

  // Misty Morning Calm
  {
    id: 'misty_morning_dew_veil',
    uiCategory: 'Misty Morning Calm',
    title: 'Pre-Dawn Dew Veil & Drifting Fog',
    lightingDirective: 'cool, low-angled morning light gently piercing through lingering mountain mist, revealing delicate volumetric light rays (crepuscular rays)',
    atmosphericNuance: 'crisp alpine freshness, high humidity, cool mountain air, and waking botanical vitality',
    colorHarmony: 'cool slate blues, celadon greens, soft misty whites, and damp dark granite tones',
    specularAndReflection: 'myriad glistening dew droplets beading upon moss tips and stone rims, catching pinpoint morning glints',
  },
  {
    id: 'misty_morning_pale_dawn',
    uiCategory: 'Misty Morning Calm',
    title: 'Pale Dawn Haze & Soft Horizon',
    lightingDirective: 'diffuse silvery morning luminescence with soft, ethereal gradients dissolving harsh edges',
    atmosphericNuance: 'tranquil waking stillness, gentle vapor rising from the water, and cool mountain solitude',
    colorHarmony: 'pearly grays, pale sage, morning sky silver, and saturated damp bark umber',
    specularAndReflection: 'soft diffuse highlight across the wet basin rim, with mist particles scattering ambient daylight',
  },

  // Warm Golden Hour
  {
    id: 'golden_hour_raking_amber',
    uiCategory: 'Warm Golden Hour',
    title: 'Raking Amber Sunbeams & Long Shadows',
    lightingDirective: 'low-angled, warm 3200K golden sunlight raking horizontally across the scene, carving rich relief across stone textures and moss mounds',
    atmosphericNuance: 'nostalgic afternoon warmth, gentle deceleration of time, and rich harmonic relaxation',
    colorHarmony: 'deep amber gold, warm terracotta ochre, glowing chartreuse moss highlights, and velvety umber shadows',
    specularAndReflection: 'intense, warm golden specular flashes dancing across the rippling water surface and glistening wet stone edges',
  },
  {
    id: 'golden_hour_dusk_warmth',
    uiCategory: 'Warm Golden Hour',
    title: 'Late Afternoon Honey Glow',
    lightingDirective: 'honeyed sunlight filtering through fluttering bamboo foliage, casting dynamic dappled patterns of warm light and cool shadow',
    atmosphericNuance: 'soothing sanctuary warmth, end-of-day peace, and the rich scents of warm cedar and damp soil',
    colorHarmony: 'burnished bronze, warm granite amber, olive green, and gilded water reflections',
    specularAndReflection: 'luminous reflections of the golden sky mirrored cleanly in the undisturbed margins of the pool',
  },

  // Twilight Tranquility
  {
    id: 'twilight_blue_amber_duality',
    uiCategory: 'Twilight Tranquility',
    title: 'Deep Indigo Dusk & Soft Candle Glow',
    lightingDirective: 'cool 6500K deep blue hour ambient twilight overhead beautifully contrasted by the warm 2400K organic glow of a nearby candle or lantern flame',
    atmosphericNuance: 'intimate nocturnal retreat, hushed whispers of the evening breeze, and serene spatial enclosure',
    colorHarmony: 'deep indigo blue, slate navy, warm beeswax gold, and deep charcoal stone silhouettes',
    specularAndReflection: 'rich dual-toned reflections on the water surface: cool ambient twilight mirrored against warm dancing flame highlights',
  },

  // Ethereal Moonlit Glow
  {
    id: 'moonlit_silver_luminescence',
    uiCategory: 'Ethereal Moonlit Glow',
    title: 'Full Moon Silver Beam & Midnight Solitude',
    lightingDirective: 'cool, silvery moonlight cascading from above, casting soft, elegant shadows and highlighting wet surfaces with crisp specular pearls',
    atmosphericNuance: 'dreamlike nocturnal mystique, ethereal quietude, and a magical sense of secluded sanctuary',
    colorHarmony: 'monochromatic silver, midnight navy, cool charcoal, and pale ivory water gleams',
    specularAndReflection: 'high-contrast lunar reflection shivering in the center of the dark obsidian-like water mirror',
  },

  // Fresh Post-Rain Dew
  {
    id: 'post_rain_saturated_clarity',
    uiCategory: 'Fresh Post-Rain Dew',
    title: 'Post-Downpour Optical Clarity & Saturated Leaves',
    lightingDirective: 'crystal-clear diffused daylight breaking through departing rainclouds, illuminating freshly washed surfaces with pristine clarity',
    atmosphericNuance: 'petrichor scent, ozone-rich air, energetic renewal, and complete absence of airborne dust',
    colorHarmony: 'vividly saturated emerald moss, deep black wet stone, glistening jade leaves, and pristine water transparency',
    specularAndReflection: 'thousands of convex water beads clinging to leaves, stone rims, and bamboo nodes, acting as microscopic lenses',
  },

  // Deep Mountain Solitude
  {
    id: 'mountain_solitude_cool_clarity',
    uiCategory: 'Deep Mountain Solitude',
    title: 'High Altitude Stillness & Pure Spring Chill',
    lightingDirective: 'unfiltered, crisp high-mountain ambient light with deep natural depth and sharp micro-contrasts',
    atmosphericNuance: 'untouched primeval isolation, crisp alpine purity, and the rhythmic acoustic heartbeat of falling water',
    colorHarmony: 'mineral granite gray, alpine lichen chartreuse, deep pine shadow, and ice-clear spring water',
    specularAndReflection: 'unblemished mirror reflections with crystalline refraction showing the fine sediment and stone bottom of the basin',
  },

  // Soft Diffuse Overcast Stillness
  {
    id: 'overcast_softbox_purity',
    uiCategory: 'Soft Diffuse Overcast Stillness',
    title: 'Natural Softbox Diffusion & Velvet Shadows',
    lightingDirective: 'perfect natural cloud-diffuser overhead producing pure, wrap-around soft lighting with zero harsh glares and infinitely smooth falloff',
    atmosphericNuance: 'timeless quietude, profound visual calm, and uncompromised focus on organic textures and craft',
    colorHarmony: 'balanced neutral grays, forest moss greens, muted bark tones, and pearl-gray water reflections',
    specularAndReflection: 'creamy, satin-like water highlights without blown highlights or harsh reflections',
  },
  { id: 'mood_ethereal_aqua', uiCategory: 'Ethereal Aqua Serenity', title: 'Ethereal Aqua Serenity', lightingDirective: 'soft luminous turquoise ambient light with gentle warm highlights on wet stone', atmosphericNuance: 'deeply calming aquatic stillness with a clean dreamlike spa atmosphere', colorHarmony: 'aqua turquoise, cool ivory stone, emerald foliage, and soft silver reflections', specularAndReflection: 'silky cyan reflections gliding across the calm water surface' },
  { id: 'mood_biolum_calm', uiCategory: 'Magical Bioluminescent Calm', title: 'Magical Bioluminescent Calm', lightingDirective: 'restrained cyan and warm pinpoint illumination softly diffused through dense foliage', atmosphericNuance: 'quiet enchanted serenity without harsh fantasy effects', colorHarmony: 'deep teal, emerald green, luminous cyan, warm amber, and pearl white', specularAndReflection: 'small glowing reflections shimmering gently on water and polished stones' },
  { id: 'mood_luminous_tropical', uiCategory: 'Luminous Tropical Tranquility', title: 'Luminous Tropical Tranquility', lightingDirective: 'soft tropical ambient illumination with fresh green bounce light and delicate water highlights', atmosphericNuance: 'refreshing humid calm and restorative botanical energy', colorHarmony: 'emerald, turquoise, pale aqua, warm ivory, and subtle gold', specularAndReflection: 'clear glassy reflections with gentle turquoise highlights' },
  { id: 'mood_dreamy_aquatic', uiCategory: 'Dreamy Aquatic Escape', title: 'Dreamy Aquatic Escape', lightingDirective: 'diffused cinematic aqua light blended with soft neutral highlights', atmosphericNuance: 'weightless dreamlike calm surrounding a continuously flowing water feature', colorHarmony: 'misty teal, aqua blue, pale stone, soft green, and ivory', specularAndReflection: 'smooth liquid reflections with soft bloom-like highlights kept photorealistic' },

];

// ==========================================
// 3. KATEGORI INTERNAL CREATIVE POOL
// ==========================================
export interface KategoriVariation {
  id: string;
  uiCategory: string;
  title: string;
  spatialConcept: string;
  philosophicalTone: string;
  waterFeatureRole: string;
}

export const INTERNAL_KATEGORI_POOL: KategoriVariation[] = [
  // Spa Garden
  {
    id: 'spa_hydro_wellness',
    uiCategory: 'Spa Garden',
    title: 'Luxury Hydro-Wellness Sanctuary',
    spatialConcept: 'a secluded botanical spa bathing courtyard with tactile heated stone slabs, aromatic cedar wood, and soothing natural spring flow',
    philosophicalTone: 'rejuvenation, physical restoration, sensory comfort, and luxurious organic harmony',
    waterFeatureRole: 'an inviting, pristine chōzubachi and hot spring water feature designed for ritual hand-cleansing and acoustic serenity',
  },
  {
    id: 'spa_natural_onsen_alcove',
    uiCategory: 'Spa Garden',
    title: 'Thermal Spring & Hinoki Alcove',
    spatialConcept: 'an intimate Japanese onsen garden nook featuring natural volcanic rock basins, smooth cedar duckboards, and delicate herbal steam',
    philosophicalTone: 'deep somatic relaxation, purification, and communion with natural thermal elements',
    waterFeatureRole: 'a natural spring basin with gentle continuous overflow spilling across heated river pebbles',
  },

  // Traditional Chōzubachi
  {
    id: 'traditional_tsukubai_ritual',
    uiCategory: 'Traditional Chōzubachi',
    title: 'Authentic Tea Ceremony Tsukubai Arrangement',
    spatialConcept: 'a strictly composed tsukubai arrangement with a low stone basin (chōzubachi), front stepping stone (mae-ishi), lantern (teshoku-ishi), and ladle shelf',
    philosophicalTone: 'humility, mindful purification before tea ceremony, wabi-sabi reverence for natural imperfection',
    waterFeatureRole: 'the ceremonial heart of the garden, forcing the visitor to kneel low to wash hands and rinse the mind',
  },
  {
    id: 'traditional_temple_purification',
    uiCategory: 'Traditional Chōzubachi',
    title: 'Kyoto Temple Water Cleansing Station',
    spatialConcept: 'a monumental carved stone water pavilion with wooden ladles resting on bamboo rails and deep moss surrounding the catch-basin',
    philosophicalTone: 'spiritual purification, ancient monastic tradition, and contemplative focus',
    waterFeatureRole: 'an abundant, continuous mountain spring flow splashing rhythmically into an ancient carved stone basin',
  },

  // Zen Water Feature
  {
    id: 'zen_karesansui_water_anchor',
    uiCategory: 'Zen Water Feature',
    title: 'Karesansui Living Water Accent',
    spatialConcept: 'a living water stone basin set within a dry-landscape garden of raked granite gravel and moss islands, uniting static and kinetic elements',
    philosophicalTone: 'the paradox of stillness and eternal movement, emptiness and presence, yin and yang equilibrium',
    waterFeatureRole: 'the sole kinetic focal point in an otherwise motionless, meditative stone garden',
  },

  // Rainforest Spring Sanctuary
  {
    id: 'rainforest_biophilic_grotto',
    uiCategory: 'Rainforest Spring Sanctuary',
    title: 'Biophilic Rainforest Spring Grotto',
    spatialConcept: 'a wild, untamed subtropical rock alcove with ancient mossy boulders, dripping tree ferns, and natural volcanic water channels',
    philosophicalTone: 'primeval abundance, raw ecological vitality, and primordial water connection',
    waterFeatureRole: 'a naturally water-hollowed volcanic boulder collecting spring seepage amidst dripping tropical foliage',
  },

  // Tea Ceremony Garden
  {
    id: 'tea_garden_roji_sanctuary',
    uiCategory: 'Tea Ceremony Garden',
    title: 'Chaniwa Wabi Roji Sanctuary',
    spatialConcept: 'the inner roji passage of a traditional tea house, featuring irregular mossy stepping stones and rustic wattle fences',
    philosophicalTone: 'leaving the worldly dust behind, cultivating unpretentious simplicity, and embracing quiet nature',
    waterFeatureRole: 'a weathered water stone positioned low to the ground to evoke contemplative reverence',
  },

  // Modern Luxury Courtyard
  {
    id: 'modern_minimalist_hydro_court',
    uiCategory: 'Modern Luxury Courtyard',
    title: 'Contemporary Minimalist Hydro-Courtyard',
    spatialConcept: 'a masterfully designed architectural patio combining honed black basalt, crisp linear water runnels, and minimalist negative space',
    philosophicalTone: 'geometric precision, refined restraint, modern tranquility, and high-end architectural composure',
    waterFeatureRole: 'a custom hand-finished stone basin acting as a sculptural centerpiece on a bed of river stones',
  },

  // Botanical Hydro-Sanctuary
  {
    id: 'botanical_rare_species_sanctuary',
    uiCategory: 'Botanical Hydro-Sanctuary',
    title: 'Curated Botanical Water Conservatory',
    spatialConcept: 'a curated micro-botanical garden with rare miniature fern species, aquatic flowering plants, and carefully placed stone water features',
    philosophicalTone: 'scientific elegance, botanical wonder, and deep horticultural devotion',
    waterFeatureRole: 'a multi-tiered water garden feeding rare moss varieties and supporting aquatic flora',
  },
  { id: 'kat_enchanted_bamboo_water', uiCategory: 'Enchanted Bamboo Water Sanctuary', title: 'Enchanted Bamboo Water Sanctuary', spatialConcept: 'a secluded bamboo grove centered around a sculptural flowing water feature, smooth stones, and subtle lantern illumination', philosophicalTone: 'peaceful wonder, natural harmony, and immersive water-centered retreat', waterFeatureRole: 'the central cascading water feature provides continuous visual and acoustic serenity' },
  { id: 'kat_fantasy_spa_water', uiCategory: 'Fantasy Spa Water Garden', title: 'Fantasy Spa Water Garden', spatialConcept: 'a luxurious botanical spa vignette combining pale stone, clear turquoise water, towels, lantern light, and lush greenery', philosophicalTone: 'sensory relaxation, refined comfort, and dreamy escapism', waterFeatureRole: 'a sculptural tiered cascade acts as the dominant spa centerpiece' },
  { id: 'kat_biolum_zen_oasis', uiCategory: 'Bioluminescent Zen Oasis', title: 'Bioluminescent Zen Oasis', spatialConcept: 'a quiet zen water sanctuary in a dark bamboo grove with restrained luminous accents and polished wet stones', philosophicalTone: 'stillness, mystery, and contemplative immersion', waterFeatureRole: 'a glowing cascade anchors the composition while water reflections carry the atmosphere' },
  { id: 'kat_tropical_aquatic', uiCategory: 'Tropical Aquatic Sanctuary', title: 'Tropical Aquatic Sanctuary', spatialConcept: 'a lush tropical stream garden with smooth rounded stones, dense foliage, bamboo, and a sculptural cascading fountain', philosophicalTone: 'freshness, abundance, and restorative natural vitality', waterFeatureRole: 'continuous cascading water connects the foreground pool with the elevated stone bowls' },

];

// ==========================================
// 4. DEKORASI INTERNAL CREATIVE POOL
// ==========================================
export interface DekorasiVariation {
  id: string;
  uiCategory: string;
  title: string;
  primaryElements: string;
  placementHarmony: string;
  lightingRole: string;
}

export const INTERNAL_DEKORASI_POOL: DekorasiVariation[] = [
  // Candle + Stone Lantern
  {
    id: 'dekorasi_oribe_lantern_votives',
    uiCategory: 'Candle + Stone Lantern',
    title: 'Weathered Oribe Stone Lantern & Natural Beeswax Votives',
    primaryElements: 'a moss-covered Oribe carved granite lantern with a softly glowing interior, accompanied by two low-lying beeswax candle votives in stone cups',
    placementHarmony: 'stationed in the mid-ground behind the basin to the right, casting a warm amber rim-light across the stone edges',
    lightingRole: 'provides warm, flickering 2200K organic accent lighting that reflects delicately across the water mirror',
  },
  {
    id: 'dekorasi_kasuga_lantern_floating_flame',
    uiCategory: 'Candle + Stone Lantern',
    title: 'Ancient Kasuga-dōrō & Floating Water Candle',
    primaryElements: 'a tall, weathered hexagonal Kasuga stone lantern dappled with lichen, paired with a small floating candle nestled in a hollow ceramic leaf on the water',
    placementHarmony: 'lantern anchors the upper-left quadrant while the floating flame glides near the calm water edge',
    lightingRole: 'creates gentle glowing specular points on wet stone surfaces and soft shadows behind ferns',
  },

  // Smooth River Stones + Incense
  {
    id: 'dekorasi_black_obsidian_incense',
    uiCategory: 'Smooth River Stones + Incense',
    title: 'Polished Black River Obsidian & Sandalwood Smoke',
    primaryElements: 'a deliberate grouping of tumbled black obsidian river stones nestled in moss, beside a small hand-thrown ceramic incense burner emitting a gossamer thread of sandalwood smoke',
    placementHarmony: 'arranged in the immediate foreground corner, grounding the composition with tactile textures',
    lightingRole: 'the delicate smoke ribbon catches soft morning backlighting as it curls gently toward the upper frame',
  },

  // Moss Rocks + Wooden Ladle (Hishaku)
  {
    id: 'dekorasi_hishaku_hinoki_moss_boulders',
    uiCategory: 'Moss Rocks + Wooden Ladle (Hishaku)',
    title: 'Traditional Hinoki Wood Hishaku Ladle & Emerald Moss Boulders',
    primaryElements: 'an authentic handcrafted hinoki cypress water ladle (hishaku) with a slender bamboo handle resting diagonally across the basin rim, flanked by velvety emerald moss boulders',
    placementHarmony: 'ladle provides a deliberate human ritual scale while moss boulders cradle the base of the basin',
    lightingRole: 'pale cypress wood reflects soft ambient light, contrasting with the dark wet stone of the basin',
  },

  // Stepping Stones + Bonsai
  {
    id: 'dekorasi_tobi_ishi_cloud_bonsai',
    uiCategory: 'Stepping Stones + Bonsai',
    title: 'Weathered Tobi-Ishi Stepping Stones & Gnarled Bonsai',
    primaryElements: 'flat, water-worn basalt stepping stones (tobi-ishi) embedded in moss, beside an antique fifty-year-old Japanese black pine bonsai on a rustic stone slab',
    placementHarmony: 'stepping stones create a subtle visual pathway leading the eye from the foreground into the background',
    lightingRole: 'sculptural bonsai needles filter ambient light into exquisite lace-like shadow patterns',
  },

  // Cast Iron Kettle + Oil Lamp
  {
    id: 'dekorasi_tetsubin_cast_iron_lamp',
    uiCategory: 'Cast Iron Kettle + Oil Lamp',
    title: 'Antique Tetsubin Iron Kettle & Brass Oil Lamp',
    primaryElements: 'a patinated cast-iron tetsubin tea kettle with a pebbled surface, set beside a traditional brass wick oil lamp with a tiny golden flame',
    placementHarmony: 'resting upon a raised, dry flat river stone in the mid-ground just outside the water splash zone',
    lightingRole: 'produces warm, focused pinpoint illumination that highlights the rough texture of the iron and nearby water droplets',
  },

  // Floating Lotus Candles
  {
    id: 'dekorasi_floating_lotus_votives',
    uiCategory: 'Floating Lotus Candles',
    title: 'Ceramic Lotus Leaf Votives & Drifting Flames',
    primaryElements: 'three miniature hand-carved floating lotus flower candles with golden cotton wicks drifting gently across the dark water mirror',
    placementHarmony: 'positioned on the surface of the basin water, creating dynamic focal illumination',
    lightingRole: 'radiates warm amber ripples outward across the calm water pool, casting golden caustic patterns on the inner stone walls',
  },

  // Bamboo Wind Chimes + Raked Gravel
  {
    id: 'dekorasi_windchime_raked_gravel',
    uiCategory: 'Bamboo Wind Chimes + Raked Gravel',
    title: 'Rustic Bamboo Wind Bells & Concentric Gravel Waves',
    primaryElements: 'a hollow-stem bamboo wind chime hanging softly in the out-of-focus background, above concentric circles raked into fine gray granite gravel',
    placementHarmony: 'gravel sweeps along the foreground border while the bamboo chime adds atmospheric depth in the soft background',
    lightingRole: 'raked gravel ridges create high-texture micro-shadows that emphasize geometric discipline against organic water flow',
  },

  // Handcrafted Washi Lanterns + Wet Pebbles
  {
    id: 'dekorasi_washi_paper_lanterns_pebbles',
    uiCategory: 'Hand-folded Washi Lanterns + Wet Pebbles',
    title: 'Geometric Washi Lanterns & Glistening River Pebbles',
    primaryElements: 'two hand-folded white washi paper lanterns with cedar bases glowing warmly, surrounded by an organic spill of glistening wet multicolour river pebbles',
    placementHarmony: 'lanterns nestle softly amidst damp ferns at the base of the basin, illuminating the wet pebble bed',
    lightingRole: 'soft, diffuse 2700K parchment glow that washes over the lower half of the stone basin and adjacent foliage',
  },

  // Decorative Lanterns
  {
    id: 'dekorasi_decorative_lanterns',
    uiCategory: 'Decorative Lanterns',
    title: 'Decorative Garden Lantern Pair',
    primaryElements: 'two elegant decorative lanterns in natural stone and aged metal, with softly glowing warm interiors and subtle handcrafted detailing',
    placementHarmony: 'placed symmetrically but slightly offset in the mid-ground beside the water feature, framing the basin without blocking the main subject',
    lightingRole: 'casts a restrained warm amber glow onto nearby stone, bamboo, and water reflections',
  },

  // Rolled Spa Towels
  {
    id: 'dekorasi_rolled_spa_towels',
    uiCategory: 'Rolled Spa Towels',
    title: 'Freshly Rolled Spa Towels',
    primaryElements: 'three neatly rolled premium spa towels in soft natural ivory cotton, stacked with subtle variations in height and fold texture',
    placementHarmony: 'arranged on a dry stone ledge beside the basin, safely outside the splash zone and integrated naturally into the spa setting',
    lightingRole: 'soft fabric surfaces catch diffuse ambient light and add a calm tactile contrast to wet stone and foliage',
  },

  // Aromatherapy Oil Bottles
  {
    id: 'dekorasi_aromatherapy_oil_bottles',
    uiCategory: 'Aromatherapy Oil Bottles',
    title: 'Small Aromatherapy Oil Bottles',
    primaryElements: 'a curated trio of small amber and clear glass aromatherapy oil bottles with natural cork and wooden caps, containing subtly tinted botanical oils',
    placementHarmony: 'grouped neatly on a small dry wooden or stone tray near the basin, with enough spacing to keep each bottle visually distinct',
    lightingRole: 'glass edges and amber liquid catch delicate warm highlights without creating distracting glare',
  },

  // Candle Options — maximum 3 candles
  { id: 'dekorasi_1_candle', uiCategory: '1 Lilin', title: '1 Lilin', primaryElements: 'one small elegant candle placed near the rolled spa towels, with a clearly visible natural flame and soft ambient candlelight', placementHarmony: 'positioned on the dry stone ledge beside the towels, safely separated from the flowing water', lightingRole: 'the single natural flame creates a soft warm glow on the nearby towels, stone surface, and water without overpowering the scene' },
  { id: 'dekorasi_2_candles', uiCategory: '2 Lilin', title: '2 Lilin', primaryElements: 'two small elegant candles placed near the rolled spa towels, each with a clearly visible natural flame and soft ambient candlelight', placementHarmony: 'arranged together on the dry stone ledge beside the towels with balanced spacing and safely separated from the flowing water', lightingRole: 'the two natural flames create a soft coordinated warm glow on the towels, stone surface, and nearby water' },
  { id: 'dekorasi_3_candles', uiCategory: '3 Lilin', title: '3 Lilin', primaryElements: 'three small elegant candles placed near the rolled spa towels, each with a clearly visible natural flame and soft ambient candlelight', placementHarmony: 'arranged as a compact spa decoration on the dry stone ledge beside the towels, with clear spacing and safely separated from the flowing water', lightingRole: 'the three natural flames create a gentle layered warm glow across the towels, stone surface, and nearby water without overpowering the scene' },

  { id: 'dekorasi_1_candle_towels', uiCategory: '1 Lilin + Spa Towels', title: '1 Candle & Spa Towels', primaryElements: 'one small elegant candle with a natural flame paired with neatly rolled premium spa towels', placementHarmony: 'arranged together on a dry stone ledge beside the basin, with the candle safely separated from splashing water', lightingRole: 'the natural candle flame adds a subtle warm highlight to the soft towel texture and nearby stone' },
  { id: 'dekorasi_2_candles_towels', uiCategory: '2 Lilin + Spa Towels', title: '2 Candles & Spa Towels', primaryElements: 'two small elegant candles with natural flames paired with neatly rolled premium spa towels', placementHarmony: 'balanced as a compact spa vignette on a dry stone ledge beside the basin, safely away from flowing water', lightingRole: 'the two natural flames create gentle warm accents across the towels and stone without overpowering the scene' },
  { id: 'dekorasi_1_candle_oils', uiCategory: '1 Lilin + Oil Bottles', title: '1 Candle & Aromatherapy Oils', primaryElements: 'one small elegant candle with a natural flame accompanied by a few refined amber and clear aromatherapy oil bottles', placementHarmony: 'grouped neatly on a dry stone or wooden tray beside the basin with clear spacing and safe separation from water', lightingRole: 'the candle adds a restrained warm highlight to the glass bottles and surrounding stone' },
  { id: 'dekorasi_2_candles_oils', uiCategory: '2 Lilin + Oil Bottles', title: '2 Candles & Aromatherapy Oils', primaryElements: 'two small elegant candles with natural flames accompanied by refined amber and clear aromatherapy oil bottles', placementHarmony: 'arranged as a balanced spa vignette on a dry tray beside the basin, safely outside the splash zone', lightingRole: 'the paired natural flames create soft warm reflections along the glass bottles and stone surface' },
  { id: 'dekorasi_1_candle_towels_oils', uiCategory: '1 Lilin + Spa Towels + Oil Bottles', title: '1 Candle, Spa Towels & Aromatherapy Oils', primaryElements: 'one small elegant candle with a natural flame, neatly rolled spa towels, and a few amber and clear aromatherapy oil bottles', placementHarmony: 'styled as a cohesive spa arrangement on a dry stone ledge beside the basin, with safe spacing between all objects', lightingRole: 'the candle provides a soft warm accent while the towels and glass bottles catch subtle natural highlights' },
  { id: 'dekorasi_2_candles_towels_oils', uiCategory: '2 Lilin + Spa Towels + Oil Bottles', title: '2 Candles, Spa Towels & Aromatherapy Oils', primaryElements: 'two small elegant candles with natural flames, neatly rolled spa towels, and several amber and clear aromatherapy oil bottles', placementHarmony: 'balanced as a refined spa vignette on a dry stone ledge beside the basin, safely separated from flowing water', lightingRole: 'the two natural flames add layered warm accents to the towels, glass bottles, and nearby stone' },
  { id: 'dekorasi_3_candles_towels_oils', uiCategory: '3 Lilin + Spa Towels + Oil Bottles', title: '3 Candles, Spa Towels & Aromatherapy Oils', primaryElements: 'three small elegant candles with natural flames, neatly rolled spa towels, and a curated group of amber and clear aromatherapy oil bottles', placementHarmony: 'arranged as a luxurious but uncluttered spa vignette on a dry stone ledge beside the basin, with safe spacing from water', lightingRole: 'the three natural flames create a gentle layered warm glow across the towels, glass bottles, stone, and nearby water reflections' },


  // Additional candle combinations
  { id: 'dekorasi_candle_white_stones', uiCategory: 'Lilin + White Spa Stones', title: 'Candle & Smooth White Spa Stones', primaryElements: 'one to three small elegant candles with natural flames arranged among smooth white spa stones', placementHarmony: 'grouped on a dry stone ledge beside the water feature with clear spacing from splashing water', lightingRole: 'natural candlelight creates soft warm highlights across the white stones and nearby water' },
  { id: 'dekorasi_candle_tropical_flowers', uiCategory: 'Lilin + Tropical Flowers', title: 'Candle & Tropical Flowers', primaryElements: 'one to three small elegant candles with natural flames surrounded by delicate tropical flowers', placementHarmony: 'flowers form a loose natural cluster around the candles on a dry ledge beside the basin', lightingRole: 'the warm candle glow softly illuminates flower petals and nearby wet surfaces' },
  { id: 'dekorasi_candle_flower_petals', uiCategory: 'Lilin + Flower Petals', title: 'Candle & Scattered Flower Petals', primaryElements: 'one to three small elegant candles with natural flames accompanied by scattered fresh flower petals', placementHarmony: 'petals are lightly scattered around the candle arrangement without covering the main objects', lightingRole: 'gentle natural flame highlights the petal edges and creates subtle warm reflections' },
  { id: 'dekorasi_candle_ceramic_tray', uiCategory: 'Lilin + Ceramic Tray', title: 'Candle & Ceramic Spa Tray', primaryElements: 'one to three small elegant candles with natural flames arranged on a refined low ceramic spa tray', placementHarmony: 'the tray rests on a dry stone platform beside the basin, safely outside the splash zone', lightingRole: 'natural candlelight reveals the ceramic texture and creates a restrained warm accent' },
  { id: 'dekorasi_candle_water_bowl', uiCategory: 'Lilin + Small Water Bowl', title: 'Candle & Small Water Bowl', primaryElements: 'one to three small elegant candles with natural flames beside a small decorative water bowl', placementHarmony: 'the compact arrangement sits on a dry ledge near the basin with balanced spacing', lightingRole: 'the natural flame creates delicate warm reflections on the small water surface and surrounding stone' },
  { id: 'dekorasi_candle_bamboo', uiCategory: 'Lilin + Bamboo Accent', title: 'Candle & Natural Bamboo Accent', primaryElements: 'one to three small elegant candles with natural flames paired with a restrained natural bamboo accent', placementHarmony: 'the bamboo accent sits behind or beside the candles, adding vertical structure without blocking the water feature', lightingRole: 'warm candlelight grazes the natural bamboo texture and nearby wet stone' },
  { id: 'dekorasi_candle_tropical_leaves', uiCategory: 'Lilin + Tropical Leaves', title: 'Candle & Tropical Leaf Accent', primaryElements: 'one to three small elegant candles with natural flames framed by a few small glossy tropical leaves', placementHarmony: 'leaves are positioned around the outer edge of the candle arrangement, leaving the flames unobstructed', lightingRole: 'natural candlelight adds soft highlights to the glossy leaf surfaces and nearby water' },
  { id: 'dekorasi_candle_crystals', uiCategory: 'Lilin + Decorative Crystals', title: 'Candle & Decorative Crystals', primaryElements: 'one to three small elegant candles with natural flames accompanied by a small cluster of translucent decorative crystals', placementHarmony: 'crystals are arranged sparingly beside the candles on a dry stone or ceramic surface', lightingRole: 'the flame creates subtle warm glints through the crystal edges without overpowering the scene' },
  { id: 'dekorasi_candle_lantern', uiCategory: 'Lilin + Lantern', title: 'Candle & Garden Lantern', primaryElements: 'one to three small elegant candles with natural flames paired with one compact decorative garden lantern', placementHarmony: 'the lantern and candles form a balanced spa vignette on a dry ledge beside the basin', lightingRole: 'combined natural candle and lantern glow creates a layered but restrained warm atmosphere' },
  { id: 'dekorasi_candle_flowers_stones', uiCategory: 'Lilin + Flowers + White Stones', title: 'Candle, Flowers & White Spa Stones', primaryElements: 'one to three small elegant candles with natural flames, delicate tropical flowers, and smooth white spa stones', placementHarmony: 'the elements form a natural layered cluster on a dry ledge beside the water feature', lightingRole: 'warm candlelight gently reveals the flowers, white stones, and nearby water reflections' },
  { id: 'dekorasi_candle_towels_flowers_stones', uiCategory: 'Lilin + Handuk + Flowers + White Stones', title: 'Candle, Spa Towels, Flowers & White Stones', primaryElements: 'one to three small elegant candles with natural flames, neatly rolled spa towels, delicate flowers, and smooth white spa stones', placementHarmony: 'arranged as a refined spa vignette on a dry ledge beside the basin with clear spacing and no clutter', lightingRole: 'natural candlelight adds a soft warm accent across the towels, flowers, stones, and nearby water' },
  { id: 'dekorasi_candle_oils_flowers', uiCategory: 'Lilin + Oil Bottles + Flowers', title: 'Candle, Aromatherapy Oils & Flowers', primaryElements: 'one to three small elegant candles with natural flames, refined aromatherapy oil bottles, and delicate tropical flowers', placementHarmony: 'grouped neatly on a dry stone or wooden tray beside the basin with safe spacing from water', lightingRole: 'the natural flames create warm highlights on the glass bottles and flower petals' },

  // Lanterns + Spa Towels + Oil Bottles
  {
    id: 'dekorasi_lantern_towels_oil_bottles',
    uiCategory: 'Lanterns + Spa Towels + Oil Bottles',
    title: 'Zen Spa Lantern, Towels & Aromatherapy Oils',
    primaryElements: 'a refined spa arrangement combining a small decorative lantern, neatly rolled ivory spa towels, and several small amber aromatherapy oil bottles with natural caps',
    placementHarmony: 'carefully arranged on a dry stone ledge or low wooden tray beside the water feature, balanced as a cohesive spa vignette without crowding the basin',
    lightingRole: 'the lantern provides a gentle warm accent while the glass oil bottles and clean towels catch soft natural highlights',
  },
  { id: 'dekorasi_white_lantern_towels', uiCategory: 'White Stone Lantern + Rolled Spa Towels', title: 'White Stone Lantern & Rolled Spa Towels', primaryElements: 'a softly illuminated white stone garden lantern beside two neatly rolled plush ivory spa towels', placementHarmony: 'arranged on a low pale stone platform beside the water feature, balanced without crowding the focal cascade', lightingRole: 'the lantern adds a warm intimate glow while the towels catch soft cool ambient highlights' },
  { id: 'dekorasi_lantern_candles_towels', uiCategory: 'Lantern + Candles + Spa Towels', title: 'Lantern, Candles & Spa Towels', primaryElements: 'a compact garden lantern, two small warm candles, and neatly rolled ivory spa towels', placementHarmony: 'grouped on a dry stone ledge beside the basin with clear separation from flowing water', lightingRole: 'warm candlelight and lantern glow create subtle reflections across nearby wet stone' },
  { id: 'dekorasi_towels_oils', uiCategory: 'Spa Towels + Oil Bottles', title: 'Spa Towels & Aromatherapy Oil Bottles', primaryElements: 'freshly rolled cream spa towels accompanied by small elegant amber and clear aromatherapy oil bottles', placementHarmony: 'styled as a restrained spa vignette on a low dry stone shelf', lightingRole: 'soft highlights reveal the glass bottles and plush towel texture without becoming the focal point' },

];

// ==========================================
// 5. FLOWER INTERNAL CREATIVE POOL
// ==========================================
export interface FlowerVariation {
  id: string;
  uiCategory: string;
  title: string;
  speciesScientific: string;
  bloomState: string;
  colorAndPetals: string;
  spatialPlacement: string;
  relationshipToWaterAndStone: string;
}

export const INTERNAL_FLOWER_POOL: FlowerVariation[] = [
  // White Lotus
  {
    id: 'flower_white_lotus_solitary_center',
    uiCategory: 'White Lotus',
    title: 'Solitary Sacred White Lotus (Centered Mirror)',
    speciesScientific: 'Nelumbo nucifera',
    bloomState: 'in pristine, symmetrical full bloom with outer petals gently resting on the water',
    colorAndPetals: 'translucent alabaster white petals with a subtle lime-gold central seed pod and golden stamens',
    spatialPlacement: 'floating serenely near the center of the stone basin water mirror',
    relationshipToWaterAndStone: 'microscopic water droplets bead like mercury across the waxy hydrophobic petals, while concentric ripples lap gently against the dark basin rim',
  },
  {
    id: 'flower_white_lotus_paired_rim',
    uiCategory: 'White Lotus',
    title: 'White Lotus Blossom & Bud Nestled at Rim',
    speciesScientific: 'Nelumbo nucifera',
    bloomState: 'one open pristine blossom accompanied by an elegant, tightly spiraled green-tipped bud',
    colorAndPetals: 'pure snowy white with delicate pale-cream undertones and faint pink tips',
    spatialPlacement: 'tucked gracefully against the inner mossy curve of the stone basin',
    relationshipToWaterAndStone: 'anchored near the stone edge, contrasting the soft velvety petals against the dark, rugged granite surface',
  },

  // Pink Water Lily
  {
    id: 'flower_pink_water_lily_open',
    uiCategory: 'Pink Water Lily',
    title: 'Blush Pink Water Lily & Floating Pad',
    speciesScientific: 'Nymphaea',
    bloomState: 'fully expanded star-shaped blossom resting upon a solitary emerald floating lily pad',
    colorAndPetals: 'gradient petals shifting from tender rose-pink at the base to soft ivory at the tips with a vibrant saffron-yellow core',
    spatialPlacement: 'drifting gently in the right foreground of the water basin',
    relationshipToWaterAndStone: 'a single crystalline water drop sits poised in the center of the lily pad, reflecting the ambient garden canopy',
  },

  // Cherry Blossoms (Sakura)
  {
    id: 'flower_sakura_petals_floating',
    uiCategory: 'Cherry Blossoms (Sakura)',
    title: 'Fresh Sakura Blossoms & Scattered Drifting Petals',
    speciesScientific: 'Prunus serrulata',
    bloomState: 'freshly fallen morning cherry blossoms alongside a scattered trail of delicate single petals',
    colorAndPetals: 'softest blush pink and pale shell white with delicate crimson petal-bases',
    spatialPlacement: 'floating in a natural, drifting spiral across the water surface, with two petals resting on the wet stone rim',
    relationshipToWaterAndStone: 'petals follow the gentle surface currents generated by the bamboo water spout, accumulating near the overflow lip',
  },

  // Frangipani (Plumeria)
  {
    id: 'flower_plumeria_golden_heart',
    uiCategory: 'Frangipani (Plumeria)',
    title: 'Dew-Laden White Frangipani with Golden Heart',
    speciesScientific: 'Plumeria alba',
    bloomState: 'perfect five-petaled pinwheel blossom in fresh peak bloom',
    colorAndPetals: 'thick, velvety porcelain-white petals radiating outward from a vivid buttery yellow center',
    spatialPlacement: 'floating effortlessly upon the water surface just beside the bamboo water stream',
    relationshipToWaterAndStone: 'waxy petals resist moisture, glistening with tiny spherical dew beads that catch specular reflections',
  },

  // Wild Mountain Orchid
  {
    id: 'flower_mountain_orchid_cliff',
    uiCategory: 'Wild Mountain Orchid',
    title: 'Graceful Mountain Orchid Leaning Over Basin',
    speciesScientific: 'Cymbidium goeringii',
    bloomState: 'a slender arching spray with three delicate open blossoms and two pendulous buds',
    colorAndPetals: 'pale chartreuse green petals with fine burgundy-speckled lips and translucent throats',
    spatialPlacement: 'emerging organically from a moss-filled crevice in the stone behind the basin, arching gracefully over the pool',
    relationshipToWaterAndStone: 'tips of the slender green leaves brush the water surface, creating microscopic capillary ripples',
  },

  // Japanese Camellia (Tsubaki)
  {
    id: 'flower_camellia_tsubaki_crimson',
    uiCategory: 'Japanese Camellia (Tsubaki)',
    title: 'Fallen Winter Camellia (Tsubaki) on Dark Stone',
    speciesScientific: 'Camellia japonica',
    bloomState: 'intact, whole fallen flower in pristine condition with tight overlapping petals',
    colorAndPetals: 'deep, saturated scarlet-crimson petals contrasting with a dense boss of golden stamens',
    spatialPlacement: 'resting on a dark, wet flat river stone directly adjacent to the basin rim, with two loose petals in the water',
    relationshipToWaterAndStone: 'the intense crimson creates a striking visual focal anchor against the dark gray basalt and lush emerald moss',
  },

  // Single White Peony
  {
    id: 'flower_white_peony_ruffled',
    uiCategory: 'Single White Peony',
    title: 'Lush Ruffled White Tree Peony Blossom',
    speciesScientific: 'Paeonia suffruticosa',
    bloomState: 'magnificent full double-bloom with dozens of delicately ruffled, tissue-like petals',
    colorAndPetals: 'creamy bridal white with translucent petal margins and a hidden golden-yellow heart',
    spatialPlacement: 'floating near the basin edge with outer ruffled petals draping softly over the wet stone lip',
    relationshipToWaterAndStone: 'generous floral volume creates rich tactile layering against the dark, monolithic stone basin',
  },

  // Purple Water Iris
  {
    id: 'flower_purple_iris_hanashobu',
    uiCategory: 'Purple Water Iris',
    title: 'Japanese Water Iris (Hanashōbu) Accent',
    speciesScientific: 'Iris ensata',
    bloomState: 'elegant wide-petaled blossom with drooping velvety falls and upright standards',
    colorAndPetals: 'deep royal violet and indigo with vivid lemon-yellow signal streaks down the center of each fall',
    spatialPlacement: 'a solitary cut stem placed in a hollow stone vase beside the basin, with one fallen petal floating in the pool',
    relationshipToWaterAndStone: 'regal purple coloration establishes rich color contrast against green bamboo and warm stone tones',
  },

  // Floating Gardenia Petals
  {
    id: 'flower_gardenia_floating_velvet',
    uiCategory: 'Floating Gardenia Petals',
    title: 'Floating Ivory Gardenia Blossom & Scattered Petals',
    speciesScientific: 'Gardenia jasminoides',
    bloomState: 'creamy spiral-centered flower with thick, intoxicatingly fragrant petals',
    colorAndPetals: 'warm ivory and soft butter-cream with deep emerald waxy leaves attached',
    spatialPlacement: 'drifting in the calmest eddy of the water basin opposite the bamboo spout',
    relationshipToWaterAndStone: 'thick petals float high on the water surface, creating soft, circular shadows on the basin floor below',
  },
  { id: 'flower_white_frangipani_water', uiCategory: 'White Frangipani + Water Flowers', title: 'White Frangipani & Floating Water Flowers', speciesScientific: 'Plumeria alba and aquatic companion blossoms', bloomState: 'fresh peak-bloom white flowers with a few delicate blossoms drifting on the water', colorAndPetals: 'porcelain-white petals with warm yellow centers and tiny fresh green accents', spatialPlacement: 'clustered naturally near the basin edges and scattered lightly across the water surface', relationshipToWaterAndStone: 'the blossoms create soft floating accents while preserving clear views of the water and stone' },
  { id: 'flower_small_white_floating', uiCategory: 'Small Floating White Flowers', title: 'Small Floating White Blossoms', speciesScientific: 'mixed small white tropical blossoms', bloomState: 'fresh intact blossoms with a few loose petals', colorAndPetals: 'clean white petals with subtle cream and yellow centers', spatialPlacement: 'lightly scattered across calm water and tucked near wet stone edges', relationshipToWaterAndStone: 'small flowers drift naturally with gentle surface currents around the cascade' },
  { id: 'flower_white_tropical', uiCategory: 'White Tropical Blossoms', title: 'White Tropical Botanical Blossoms', speciesScientific: 'mixed tropical white flowering plants', bloomState: 'fresh open blooms at varied natural stages', colorAndPetals: 'ivory-white petals with soft yellow centers and deep green foliage', spatialPlacement: 'framing the fountain from the sides with a few blossoms near the waterline', relationshipToWaterAndStone: 'white petals contrast gently against turquoise water and pale stone surfaces' },
  { id: 'flower_mixed_tropical_white', uiCategory: 'Mixed Tropical White Flowers', title: 'Mixed Tropical White Flower Border', speciesScientific: 'mixed tropical flowering species', bloomState: 'natural mixed blossoms with varied sizes', colorAndPetals: 'white, ivory, and subtle cream flowers with restrained yellow centers', spatialPlacement: 'layered along the foreground and middle-ground edges without obscuring the fountain', relationshipToWaterAndStone: 'flowers echo the pale stone palette while adding organic softness around the water feature' },


  // New flower menu choices
  { id: 'flower_purple_orchid', uiCategory: 'Purple Orchid', title: 'Elegant Purple Orchid', speciesScientific: 'Phalaenopsis orchid', bloomState: 'freshly opened blooms with graceful natural curvature', colorAndPetals: 'rich violet-purple petals with subtle magenta veining and a refined pale center', spatialPlacement: 'clustered naturally along the garden edge beside the water feature', relationshipToWaterAndStone: 'deep purple tones create elegant contrast against cool blue water, green foliage, and wet stone' },
  { id: 'flower_white_orchid', uiCategory: 'White Orchid', title: 'Pure White Orchid', speciesScientific: 'Phalaenopsis orchid', bloomState: 'clean, pristine blossoms at varied natural stages', colorAndPetals: 'soft porcelain-white petals with a delicate creamy center', spatialPlacement: 'arranged lightly near the spa platform and basin edge without crowding the scene', relationshipToWaterAndStone: 'white petals echo the luminous water and create a clean luxury-spa accent' },
  { id: 'flower_lavender_new', uiCategory: 'Lavender', title: 'Soft Lavender Sprigs', speciesScientific: 'Lavandula angustifolia', bloomState: 'slender fresh flowering spikes with tiny clustered blossoms', colorAndPetals: 'muted lavender-purple flowers with silvery green stems', spatialPlacement: 'growing in small natural clusters beside the stone water feature', relationshipToWaterAndStone: 'fine lavender spikes add soft vertical texture and harmonize with cool blue surroundings' },
  { id: 'flower_plumeria_new', uiCategory: 'Plumeria / Frangipani', title: 'White Plumeria with Golden Centers', speciesScientific: 'Plumeria alba', bloomState: 'fresh five-petaled tropical blossoms in peak bloom', colorAndPetals: 'creamy white petals with warm yellow-gold centers', spatialPlacement: 'scattered naturally near the waterline and along the spa platform', relationshipToWaterAndStone: 'waxy petals catch tiny moisture highlights while remaining visually light around the basin' },
  { id: 'flower_hibiscus_new', uiCategory: 'Hibiscus', title: 'Tropical Hibiscus Accent', speciesScientific: 'Hibiscus rosa-sinensis', bloomState: 'large open tropical blossoms with gently curved petals', colorAndPetals: 'vivid pink-red petals with a warm contrasting center', spatialPlacement: 'placed as a restrained tropical accent in the surrounding foliage', relationshipToWaterAndStone: 'bold blossoms provide controlled color contrast against tranquil blue water' },
  { id: 'flower_blue_hydrangea', uiCategory: 'Blue Hydrangea', title: 'Blue Hydrangea Cluster', speciesScientific: 'Hydrangea macrophylla', bloomState: 'full rounded clusters of small fresh florets', colorAndPetals: 'cool powder-blue to deep blue petals with subtle tonal variation', spatialPlacement: 'grouped softly beside the water feature and partially behind the basin', relationshipToWaterAndStone: 'blue blooms visually merge with the water palette while retaining clear floral texture' },
  { id: 'flower_white_gardenia', uiCategory: 'White Gardenia', title: 'White Gardenia Blossoms', speciesScientific: 'Gardenia jasminoides', bloomState: 'fresh layered rosette blossoms with thick smooth petals', colorAndPetals: 'warm ivory-white petals with a soft creamy center', spatialPlacement: 'clustered naturally beside the spa towels and along the basin edge', relationshipToWaterAndStone: 'luxurious white blossoms brighten the wet stone and cool water without overpowering them' },
  { id: 'flower_bird_of_paradise', uiCategory: 'Bird of Paradise', title: 'Bird of Paradise Tropical Statement', speciesScientific: 'Strelitzia reginae', bloomState: 'dramatic upright tropical flowers emerging from sculptural leaves', colorAndPetals: 'orange petals with deep blue-purple accents', spatialPlacement: 'positioned toward the rear side of the composition as a vertical tropical focal accent', relationshipToWaterAndStone: 'architectural foliage adds height and tropical character while keeping the water feature visible' },
  { id: 'flower_lotus_new', uiCategory: 'Lotus', title: 'Serene Lotus Blossom', speciesScientific: 'Nelumbo nucifera', bloomState: 'graceful open lotus bloom with layered symmetrical petals', colorAndPetals: 'soft white to pale blush petals with a subtle golden center', spatialPlacement: 'floating naturally on calm water near the basin or stream edge', relationshipToWaterAndStone: 'the lotus reinforces the tranquil aquatic character with delicate reflections and gentle ripples' },
  { id: 'flower_water_lily_new', uiCategory: 'Water Lily', title: 'Floating Water Lily', speciesScientific: 'Nymphaea', bloomState: 'fresh open flower resting above a broad floating lily pad', colorAndPetals: 'soft blue-white to pale pink petals with a warm central core', spatialPlacement: 'floating directly on the water surface near the basin overflow', relationshipToWaterAndStone: 'the blossom follows the water movement naturally and adds a calm aquatic focal detail' },
  { id: 'flower_jasmine_new', uiCategory: 'Jasmine', title: 'Delicate Jasmine Blossoms', speciesScientific: 'Jasminum', bloomState: 'small star-shaped blossoms at mixed fresh stages', colorAndPetals: 'clean white petals with tiny golden centers', spatialPlacement: 'scattered lightly through low foliage near the waterline', relationshipToWaterAndStone: 'small white blossoms create fine natural detail without filling the composition' },
  { id: 'flower_pink_orchid', uiCategory: 'Pink Orchid', title: 'Soft Pink Orchid Accent', speciesScientific: 'Phalaenopsis orchid', bloomState: 'elegant open blossoms arranged along a slender flowering stem', colorAndPetals: 'soft blush-pink petals with deeper pink-magenta markings', spatialPlacement: 'resting naturally beside the spa towels or along the stone ledge', relationshipToWaterAndStone: 'gentle pink tones introduce a restrained warm accent against blue water' },
  { id: 'flower_white_magnolia', uiCategory: 'White Magnolia', title: 'Premium White Magnolia', speciesScientific: 'Magnolia grandiflora', bloomState: 'large pristine blossoms with broad layered petals', colorAndPetals: 'creamy white petals with a subtle warm ivory center', spatialPlacement: 'placed sparingly in the background or beside the basin as a premium botanical accent', relationshipToWaterAndStone: 'large clean blossoms create elegant contrast while preserving an uncluttered spa atmosphere' },
  { id: 'flower_camellia_new', uiCategory: 'Camellia', title: 'Soft Camellia Blossom', speciesScientific: 'Camellia japonica', bloomState: 'full rounded blossom with neatly overlapping petals', colorAndPetals: 'soft blush-pink to muted rose petals with a refined central detail', spatialPlacement: 'resting naturally on a damp stone ledge near the water feature', relationshipToWaterAndStone: 'the compact layered bloom complements smooth stones and reflective water surfaces' },
  { id: 'flower_blue_iris', uiCategory: 'Blue Iris', title: 'Blue Iris Accent', speciesScientific: 'Iris ensata', bloomState: 'fresh elegant blossoms with gently arching petals', colorAndPetals: 'cool blue-indigo petals with subtle violet depth and pale markings', spatialPlacement: 'growing naturally beside the stream or at the basin edge', relationshipToWaterAndStone: 'cool blue-indigo flowers harmonize with luminous water and nighttime garden tones' },

];

// ==========================================
// 6. BASIN MULTI-DIMENSIONAL 3-LEVEL POOL
// ==========================================
export const BASIN_INTERNAL_MATERIALS = [
  'hand-chiselled speckled salt-and-pepper granite with fine quartz flecks',
  'dense dark charcoal river basalt smoothed by millennia of alpine currents',
  'weathered vesicular volcanic lava stone with porous, textured micro-cavities',
  'smooth honed silver-gray travertine with subtle horizontal sedimentary strata',
  'ancient fossil-embedded mossy limestone with soft rounded geological contours',
  'hand-cleaved blue-gray slate with crisp, natural laminar cleavage planes',
  'dense fine-grained black soapstone exhibiting a silky, tactile wet sheen',
  'warm ironstone sandstone boulder with natural rust-toned mineral oxidation',
  'traditional fired dark stoneware ceramic with a matte unglazed exterior',
  'antique glazed celadon ceramic vessel featuring delicate tea-green craquelure glaze',
  'rough-hewn quartzite rock with crystalline facets that glint in ambient light',
  'monolithic dark metamorphic boulder with undulating natural water channels',
  'weathered river-tumbled schist with silvery mica inclusions',
  'earthy terracotta stoneware fired in an ancient wood-burning anagama kiln',
  'pale ash-gray granite boulder with natural lichen-dappled weathering',
  'translucent milky-white stone with subtle aqua veining and a wet polished sheen',
  'smooth pale blue-white ceramic with glossy water-safe glaze',
  'soft ivory travertine with rounded water-worn edges',
  'cool pearl-gray stone with delicate turquoise mineral veining',

];

export const BASIN_INTERNAL_FORMS = [
  'shallow wide circular bowl with an organically undulating lip',
  'deep asymmetrical natural river boulder hollowed by natural water erosion',
  'monolithic cylindrical chōzubachi with a wide, flat honed stone rim',
  'two-tiered stepped stone basin where water cascades gently from an upper pool into a lower catch-stone',
  'sculpted octagonal water stone with softened wabi-sabi wabi edges',
  'elongated oval trough carved into an organic river-stone boulder',
  'irregular concave stone bowl with a subtle natural overflow notch on the left',
  'compact square-cut stone basin with soft rounded interior contours',
  'gently curved natural stone basin with a wide, shallow lip designed for mirror-calm water',
  'sunken natural rock depression cradled seamlessly amidst surrounding moss mounds',
  'monolithic cubic stone vessel with rough chisel-fluted sides and a polished circular inner pool',
  'kidney-shaped water stone with an organic curved perimeter following natural rock grain',
  'heart-shaped carved stone basin with two gentle upper lobes and a tapered lower point, naturally softened by water erosion',
  'five-point star-shaped sculptural stone basin with softened rounded points and a shallow reflective inner pool',
  'six-point floral water basin with petal-like lobes carved into a single monolithic stone',
  'leaf-shaped elongated basin with a tapered tip, central water channel, and gently asymmetric natural rim',
  'crescent-shaped stone basin with a smooth concave inner pool and organically weathered outer edge',
  'hexagonal stone basin with subtly chamfered corners and softened wabi-sabi edges',
  'cross-shaped four-lobed water basin with rounded arms and a compact central pool',
  'freeform sculptural basin with an intentionally asymmetric silhouette, avoiding conventional circular geometry',
];

export const BASIN_INTERNAL_SURFACES = [
  'glistening wet reflective rim adorned with microscopic crystalline water droplets',
  'thick velvety emerald moss creeping organically over the outer weathered stone shoulder',
  'silky water-worn interior hollow smoothed to a satiny finish by continuous water flow',
  'rough chisel-toothed exterior texture creating a sharp tactile contrast with a glassy inner pool',
  'ancient pale-green and silver lichen patches mottling the exterior rock face with authentic patina',
  'dark water-saturated stone surface mirroring the soft ambient sky like polished obsidian',
  'subtle mineral deposit rings and rust-toned sediment streaks lining the inner waterline',
  'fine condensation beads clinging to cool, damp rock contours above the water level',
  'water-smoothed pebble-like rim where trickling overflow creates a continuous shimmering film',
  'weathered micro-crevices where tiny maidenhair fern spores have taken root along the outer base',
];

// ==========================================
// 7. BAMBOO INTERNAL CREATIVE POOL
// ==========================================
export interface BambooVariationDetail {
  id: string;
  uiCategory: string;
  title: string;
  architecture: string;
  stalkCharacteristics: string;
  waterDynamics: string;
  positionAndPlacement: string;
}

export const INTERNAL_BAMBOO_POOL: BambooVariationDetail[] = [
  {
    id: 'bamboo_none',
    uiCategory: 'Tidak memakai bamboo',
    title: 'No Bamboo Elements',
    architecture: 'no bamboo elements anywhere in the scene',
    stalkCharacteristics: 'no bamboo stalks, bamboo conduits, bamboo grove, or bamboo decorations',
    waterDynamics: 'water flows naturally through the basin and surrounding stream without a bamboo source',
    positionAndPlacement: 'keep the entire composition completely free of bamboo',
  },
  {
    id: 'bamboo_single_kakehi_diagonal',
    uiCategory: 'Single Green Bamboo Kakehi Spout',
    title: 'Traditional Angled Green Bamboo Kakehi',
    architecture: 'a single angled authentic green bamboo kakehi spout cut with a clean 45-degree diagonal beveled tip',
    stalkCharacteristics: 'mature 6cm diameter green bamboo with distinct node rings and fine longitudinal cellulose grain',
    waterDynamics: 'discharging a slender, glassy, continuous laminar trickle that enters the water surface with minimal splashing',
    positionAndPlacement: 'extending gracefully from the upper-right corner at a 40-degree angle, hovering 15 centimeters above the pool',
  },
  {
    id: 'bamboo_rustic_shishi_odoshi',
    uiCategory: 'Rustic Shishi-odoshi (Water Rocker)',
    title: 'Balanced Bamboo Shishi-odoshi (Water Rocker)',
    architecture: 'a traditional bamboo rocker (shishi-odoshi) poised delicately upon a carved wooden pivot peg between two upright bamboo posts',
    stalkCharacteristics: 'hollowed golden-brown weathered bamboo stalk bound with blackened hemp cord at the pivot node',
    waterDynamics: 'resting in pregnant silence just above the water level, fully filled with fresh mountain spring water, ready to tip',
    positionAndPlacement: 'anchored in the middle ground to the left of the stone basin, perfectly framed against soft moss stones',
  },
  {
    id: 'bamboo_paired_stalks_flume',
    uiCategory: 'Paired Bamboo Stalks',
    title: 'Paired Twin Bamboo Conduits with Tiered Spill',
    architecture: 'two parallel green bamboo conduits of staggered lengths bound together with traditional dark hemp rope (kuro-nawa)',
    stalkCharacteristics: 'slender 4cm stalks with vibrant olive-green skin and moisture glistening along the node rings',
    waterDynamics: 'twin delicate water streams arching outward, creating a harmonious double ripple pattern in the basin below',
    positionAndPlacement: 'entering from the left flank, resting upon a flat moss-covered boulder adjacent to the basin',
  },
  {
    id: 'bamboo_grove_cluster_vertical',
    uiCategory: 'Slender Bamboo Grove Cluster',
    title: 'Slender Vertical Bamboo Grove Backdrop',
    architecture: 'a rhythmic cluster of five living, upright green bamboo culms forming a natural vertical colonnade behind a horizontal water flume',
    stalkCharacteristics: 'tall, straight timber bamboo culms with feathery emerald leaves cascading into the upper frame',
    waterDynamics: 'a notched horizontal bamboo trough bridging two stalks directs a steady, clear water stream into the stone bowl',
    positionAndPlacement: 'vertical culms rise through the soft-focus background, establishing rich vertical depth and organic framing',
  },
  {
    id: 'bamboo_weathered_conduit_flume',
    uiCategory: 'Weathered Bamboo Conduit Flume',
    title: 'Weathered Golden Bamboo Water Flume',
    architecture: 'an antique, sun-bleached golden-amber bamboo pipe split horizontally to form an open water flume',
    stalkCharacteristics: 'rich amber patina with fine weathered hairline cracks, smooth water-worn interior canal, and mossy nodes',
    waterDynamics: 'crystal-clear spring water glides smoothly along the open channel before dropping cleanly from the terminal lip',
    positionAndPlacement: 'laid horizontally across two notched river stones along the upper-rear perimeter of the basin',
  },
  {
    id: 'bamboo_minimalist_cylindrical_kakehi',
    uiCategory: 'Minimalist Cylindrical Spout',
    title: 'Minimalist Purist Cylindrical Bamboo Spout',
    architecture: 'a clean, unornamented cylindrical green bamboo spout emerging perpendicularly from a cedar backing',
    stalkCharacteristics: 'flawlessly straight, unblemished emerald bamboo with a sharp 90-degree square cut at the water outlet',
    waterDynamics: 'producing a pure vertical water column that penetrates the water mirror with pinpoint precision',
    positionAndPlacement: 'positioned directly over the rear-center of the basin, emphasizing architectural symmetry and restraint',
  },
  {
    id: 'bamboo_curved_water_feature',
    uiCategory: 'Curved Bamboo Water Feature',
    title: 'Naturally Curved Bamboo Arch Conduit',
    architecture: 'a gracefully curved single bamboo stalk that follows a natural organic bow, creating an elegant arched silhouette',
    stalkCharacteristics: 'supple cured bamboo with subtle warmth in the node ridges and delicate droplet beads along the under-curve',
    waterDynamics: 'water curves gently along the interior bend before releasing in a rhythmic, pearl-like sequence of drops',
    positionAndPlacement: 'arching from the right mid-ground toward the center of the water basin in an elegant sweeping line',
  },
  {
    id: 'bamboo_layered_multitier',
    uiCategory: 'Layered Multi-Tier Spout',
    title: 'Two-Tiered Cascading Bamboo Spout System',
    architecture: 'a stepped two-level bamboo construction where an upper feeder tube fills a shorter lower bamboo cup that overflows into the basin',
    stalkCharacteristics: 'two complementary bamboo diameters: a thick 7cm lower reservoir and a slender 3cm upper feeder stalk',
    waterDynamics: 'creates a gentle, continuous double-step water acoustic, breaking water into soft crystalline rivulets',
    positionAndPlacement: 'positioned in the right rear quarter, creating architectural height and layered mid-ground complexity',
  },
  { id: 'bamboo_emerald_fountain_spout', uiCategory: 'Emerald Bamboo Fountain Spout', title: 'Fresh Emerald Bamboo Fountain Spout', architecture: 'a natural green bamboo spout with a clean angled opening feeding the main cascade', stalkCharacteristics: 'fresh emerald-green culm with distinct nodes, subtle moisture sheen, and healthy natural surface texture', waterDynamics: 'a smooth continuous clear stream entering the upper basin without aggressive splashing', positionAndPlacement: 'positioned behind or beside the upper basin as a natural elevated water source' },
  { id: 'bamboo_thick_green_cascade', uiCategory: 'Thick Green Bamboo Cascade Spout', title: 'Thick Green Bamboo Cascade Spout', architecture: 'a sturdy mature bamboo conduit delivering water into a sculptural tiered fountain', stalkCharacteristics: 'thick vivid green culm with pronounced node rings and realistic wet highlights', waterDynamics: 'steady transparent water flow forming a clean curtain into the upper bowl', positionAndPlacement: 'anchored in the rear middle ground with the outlet aligned over the highest basin' },
  { id: 'bamboo_twin_green_chutes', uiCategory: 'Twin Green Bamboo Water Chutes', title: 'Twin Green Bamboo Water Chutes', architecture: 'two parallel fresh green bamboo channels feeding complementary water streams', stalkCharacteristics: 'slender green culms with natural node spacing and glossy moisture', waterDynamics: 'two gentle continuous streams creating balanced overlapping ripples', positionAndPlacement: 'placed symmetrically or with slight offset behind the central water feature' },
  { id: 'bamboo_natural_arch_spout', uiCategory: 'Natural Bamboo Arch Spout', title: 'Natural Green Bamboo Arch Spout', architecture: 'a gracefully curved living-green bamboo conduit forming a soft organic arch', stalkCharacteristics: 'fresh green bamboo with subtle curvature, visible nodes, and tiny water droplets', waterDynamics: 'a narrow crystal-clear stream follows the natural arc before falling into the basin', positionAndPlacement: 'arching naturally from one side toward the upper portion of the water feature' },

];

// ==========================================
// 8. COMPOSITIONS ARCHITECTURAL FRAMEWORKS
// ==========================================
export interface CompositionFramework {
  id: string;
  name: string;
  spatialArrangement: string;
  foregroundAnchor: string;
  midgroundFocal: string;
  backgroundRecession: string;
  focalPointDetail: string;
  visualBalance: string;
}

export const COMPOSITION_FRAMEWORKS: CompositionFramework[] = [
  {
    id: 'comp_asymmetric_foreground_anchor',
    name: 'Asymmetric Tactile Anchor (Rule of Thirds)',
    spatialArrangement: 'The stone water basin is grounded with monumental weight in the lower-left third of the composition. The bamboo water spout enters diagonally from the upper-right, establishing dynamic diagonal tension.',
    foregroundAnchor: 'Crisp, tactile foreground featuring wet river pebbles, velvety moss mounds, and glistening water droplets right up to the bottom edge.',
    midgroundFocal: 'The water basin interior pool with its floating blossom and the water trickle creating concentric ripples.',
    backgroundRecession: 'The right side opens into a soft, atmospheric garden space with raked gravel or mossy stepping stones fading into soft focus.',
    focalPointDetail: 'The precise point where falling water meets the calm pool surface, creating delicate concentric silver ripples beside the floating flower.',
    visualBalance: 'Asymmetrical equilibrium: heavy stone weight on the left balanced by negative space and atmospheric garden depth on the right.',
  },
  {
    id: 'comp_centered_contemplative_intimacy',
    name: 'Centered Contemplative Intimacy',
    spatialArrangement: 'A balanced, direct frontal perspective centered upon the stone basin. Low-lying river stones and lush dwarf ferns cradle the basin perimeter in crisp focus.',
    foregroundAnchor: 'A semi-circular apron of dark, wet river stones and vibrant moss cushions framing the lower boundary of the frame.',
    midgroundFocal: 'The sculptural basin resting majestically at the center, holding the calm water mirror and floating floral element.',
    backgroundRecession: 'The background recedes into an atmospheric veil of vertical bamboo stalks and soft garden lanterns shrouded in misty silence.',
    focalPointDetail: 'The solitary blossom resting effortlessly on the undisturbed water mirror beside the bamboo spout.',
    visualBalance: 'Formal harmonious balance rooted in wabi-sabi contemplative stillness and centered spatial reverence.',
  },
  {
    id: 'comp_dynamic_diagonal_hydro_flow',
    name: 'Dynamic Diagonal Hydro-Flow',
    spatialArrangement: 'A sweeping diagonal visual vector flowing from the upper-left bamboo water source down across the sculpted basin toward the lower-right foreground.',
    foregroundAnchor: 'Water-worn slate slabs and scattered velvety moss rocks establishing rich, layered tactile depth in the lower frame.',
    midgroundFocal: 'The cascading stream dividing gently over the curved lip of the stone basin into an organic catch-pool below.',
    backgroundRecession: 'Deep vertical foliage planes, including bamboo culms and ancient temple plaster walls, receding through natural depth of field.',
    focalPointDetail: 'The cascade where the clear stream spills over the stone lip, catching directional light in shimmering micro-droplets.',
    visualBalance: 'Kinetic balance: continuous water flow guided along a strong diagonal axis against stable horizontal stone ledges.',
  },
  {
    id: 'comp_intimate_rim_perspective',
    name: 'Intimate Rim Perspective (Macro-Environmental)',
    spatialArrangement: 'The camera is positioned mere inches above the basin rim level, granting monumental intimacy to the wet stone contours, water surface tension, and floral petals.',
    foregroundAnchor: 'Hyper-detailed stone rim micro-textures, individual moss filaments, and beaded moisture droplets right at the threshold of vision.',
    midgroundFocal: 'The calm water plane stretching out like a liquid mirror, reflecting the surrounding garden canopy in soft distortion.',
    backgroundRecession: 'The garden setting dissolves into a creamy, luminous bokeh of green and amber foliage highlights.',
    focalPointDetail: 'The translucent petal margins of the flower touching the water, with surface tension meniscus visible along the edge.',
    visualBalance: 'Profound macro-to-micro depth: tactile immediacy in the foreground giving way to dreamy environmental atmosphere.',
  },
  {
    id: 'comp_enclosed_alcove_sanctuary',
    name: 'Sheltered Alcove Sanctuary',
    spatialArrangement: 'The basin is nestled within a natural rock-and-fern alcove, with organic stone formations and timber fencing framing both the left and right flanks.',
    foregroundAnchor: 'A gentle slope of damp organic soil, creeping thyme, and tumbled river pebbles leading toward the basin base.',
    midgroundFocal: 'The water feature enclosed within its natural niche, illuminated by soft ambient or lantern glow.',
    backgroundRecession: 'A dark, textured stone rock face or weathered cedar wall closing off the background, fostering deep intimacy.',
    focalPointDetail: 'The glowing water pool catching amber candlelight highlights beneath the sheltered canopy.',
    visualBalance: 'Protective, cocoon-like enclosure: frame edges embrace the center, creating a safe, serene sanctuary feeling.',
  },
];

// ==========================================
// 9. DIVERSE DESCRIPTIVE STRUCTURE TEMPLATES
// ==========================================
// To avoid repetitive "A photograph of..." template openings,
// we provide 3 distinct narrative approaches for the 3 prompts.
export interface SentenceArchitecture {
  openingFocus: 'material_and_form' | 'atmospheric_spatial' | 'hydro_kinetic';
  render: (params: {
    kategori: string;
    background: string;
    mood: string;
    suasana: string;
    basinDescription: string;
    bambooDescription: string;
    flowerDescription: string;
    dekorasiDescription: string;
    composition: CompositionFramework;
    lighting: string;
    specular: string;
  }) => string;
}

export const DIVERSE_SENTENCE_ARCHITECTURES: SentenceArchitecture[] = [
  // Prompt 1: Material and Sculptural Craftsmanship First
  {
    openingFocus: 'material_and_form',
    render: ({
      kategori,
      background,
      mood,
      suasana,
      basinDescription,
      bambooDescription,
      flowerDescription,
      dekorasiDescription,
      composition,
      lighting,
    }) => {
      return [
        `Architectural botanical study of an authentic ${kategori.toLowerCase()} situated within ${background.toLowerCase()}, captured in a ${mood.toLowerCase()} mood with a ${suasana.toLowerCase()} environmental setting.`,
        `The composition is anchored by a ${basinDescription}, holding a calm, undisturbed mirror of mountain spring water.`,
        `${bambooDescription}.`,
        `${flowerDescription}.`,
        `Around the stone water feature, ${dekorasiDescription}, creating an organic wabi-sabi relationship between craft and raw nature.`,
        `${composition.spatialArrangement}`,
        `${composition.foregroundAnchor}`,
        `${lighting} Every organic surface reveals hyper-fine micro-textures, from damp stone pores and damp botanical fibers to glistening dew beads. High-end architectural garden photography, 50mm prime lens aesthetic, shallow depth of field, 8k resolution, photorealistic clarity.`
      ].join(' ');
    },
  },

  // Prompt 2: Atmospheric Lighting & Spatial Depth First
  {
    openingFocus: 'atmospheric_spatial',
    render: ({
      kategori,
      background,
      mood,
      suasana,
      basinDescription,
      bambooDescription,
      flowerDescription,
      dekorasiDescription,
      composition,
      lighting,
    }) => {
      return [
        `Enveloped in a ${mood.toLowerCase()} mood during ${suasana.toLowerCase()}, this close environmental view reveals a secluded ${kategori.toLowerCase()} in ${background.toLowerCase()}.`,
        `${lighting}`,
        `Commanding the center of this serene sanctuary is a ${basinDescription}, filled with crystalline water reflecting the sky.`,
        `${bambooDescription}.`,
        `${flowerDescription}.`,
        `Mindfully positioned around the perimeter, ${dekorasiDescription}.`,
        `${composition.spatialArrangement}`,
        `The camera perspective is positioned slightly above basin level with a grounded three-quarter front view, producing natural creamy depth of field where the background recedes into soft atmospheric blur while foreground organic textures remain razor-sharp. Authentic garden photography, 8k clarity.`
      ].join(' ');
    },
  },

  // Prompt 3: Hydro-Kinetic Water Dynamics & Sensory Tactility First
  {
    openingFocus: 'hydro_kinetic',
    render: ({
      kategori,
      background,
      mood,
      suasana,
      basinDescription,
      bambooDescription,
      flowerDescription,
      dekorasiDescription,
      composition,
      lighting,
    }) => {
      return [
        `Tactile environmental perspective of a mindful ${kategori.toLowerCase()} nestled in ${background.toLowerCase()}, imbued with a ${mood.toLowerCase()} essence and ${suasana.toLowerCase()} setting.`,
        `${bambooDescription}.`,
        `The stream falls continuously into a ${basinDescription}, where gentle surface ripples lap rhythmically outward across the still pool.`,
        `${flowerDescription}.`,
        `Harmoniously integrating into the landscape, ${dekorasiDescription}.`,
        `${composition.spatialArrangement}`,
        `${composition.foregroundAnchor}`,
        `${lighting} Captured with a close environmental three-quarter front perspective slightly above the stone rim, highlighting rich textural contrast between wet rock, fresh green bamboo, and velvety petals. Pristine botanical garden photography, masterclass composition, 8k resolution.`
      ].join(' ');
    },
  },
];
