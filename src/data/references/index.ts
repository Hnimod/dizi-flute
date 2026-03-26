import type { ReferenceDoc } from "@/shared/types";

import { reference as fingeringCharts } from "./fingering-charts";
import { reference as jianpuGuide } from "./jianpu-guide";
import { reference as musicTheory } from "./music-theory";
import { reference as maintenance } from "./maintenance";
import { reference as resources } from "./resources";
import { reference as dKeyDizi } from "./d-key-dizi";
import { reference as jianpuFormatSpec } from "./jianpu-format-spec";
import { reference as northernSouthernStyles } from "./northern-southern-styles";
import { reference as practiceGuide } from "./practice-guide";
import { reference as buyingGuide } from "./buying-guide";

export const references: ReferenceDoc[] = [
  fingeringCharts,
  jianpuGuide,
  musicTheory,
  northernSouthernStyles,
  practiceGuide,
  buyingGuide,
  maintenance,
  resources,
  dKeyDizi,
  jianpuFormatSpec,
];
