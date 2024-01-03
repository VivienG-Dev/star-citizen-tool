export interface Component {
  component_class: string;
  component_size: string;
  details: string;
  manufacturer: string;
  mounts: string;
  name: string;
  quantity: string;
  size: string;
  type: string;
}

interface RSIWeapon {
  missiles: Component[];
  turrets: Component[];
  utility_items: string[];
  weapons: Component[];
}

interface RSIAvionic {
  computers: Component[];
  radar: Component[];
}

interface RSIModular {
  coolers: Component[];
  power_plants: Component[];
  shield_generators: Component[];
}

export interface Ship {
  id: string;
  description: string;
  manufacturer: {
    name: string;
    code: string;
  };
  compiled: {
    RSIAvionic: RSIAvionic;
    RSIModular: RSIModular;
    RSIWeapon: RSIWeapon;
  };
  focus: string;
  size: string;
  name: string;
  media: { source_url: string }[];
  production_status: string;
  beam: number;
  length: number;
  cargocapacity: number;
  crew: number;
  speed: number;
  image: string;
  price: number;
  scm_speed: number;
  afterburner_speed: number;
  pitch_max: number;
  roll_max: number;
  xaxis_acceleration: number;
  yaxis_acceleration: number;
  zaxis_acceleration: number;
  height: number;
  mass: number;
  yaw_max: number;
  min_crew: number;
  max_crew: number;
}