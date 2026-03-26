import type { ReferenceDoc } from "@/shared/types";

import { reference as fingeringCharts } from "./fingering-charts";
import { reference as jianpuGuide } from "./jianpu-guide";
import { reference as musicTheory } from "./music-theory";
import { reference as maintenance } from "./maintenance";
import { reference as resources } from "./resources";
import { reference as dKeyDizi } from "./d-key-dizi";
import { reference as jianpuFormatSpec } from "./jianpu-format-spec";

export const references: ReferenceDoc[] = [
  fingeringCharts,
  jianpuGuide,
  musicTheory,
  maintenance,
  resources,
  dKeyDizi,
  jianpuFormatSpec,
];
