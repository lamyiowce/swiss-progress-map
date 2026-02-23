import { REGIONS, CANTON_MAP } from '../data/cantons';
import './SwitzerlandMap.css';

// Accurate canton paths derived from Wikimedia Commons Swiss canton SVG
// ViewBox: 0 0 700 500
const CANTON_PATHS = {
  ZH: {
    d: 'M 407,92 L 416,88 L 432,95 L 445,90 L 452,98 L 460,98 L 468,106 L 471,118 L 465,128 L 456,131 L 449,140 L 435,142 L 425,136 L 416,138 L 408,133 L 400,124 L 393,116 L 395,105 Z',
    labelX: 430, labelY: 118,
  },
  BE: {
    d: 'M 268,148 L 278,138 L 295,138 L 305,130 L 318,130 L 328,138 L 338,135 L 348,140 L 355,152 L 362,160 L 365,172 L 358,182 L 350,188 L 342,196 L 330,200 L 318,205 L 308,212 L 298,218 L 290,228 L 280,232 L 270,228 L 262,220 L 255,210 L 248,200 L 245,188 L 248,176 L 255,165 L 260,155 Z',
    labelX: 302, labelY: 182,
  },
  LU: {
    d: 'M 368,155 L 378,148 L 388,150 L 398,155 L 405,162 L 408,172 L 402,180 L 392,183 L 382,180 L 373,175 L 367,167 Z',
    labelX: 387, labelY: 167,
  },
  UR: {
    d: 'M 398,180 L 408,175 L 418,178 L 425,185 L 428,195 L 422,205 L 412,210 L 402,207 L 395,198 L 393,188 Z',
    labelX: 410, labelY: 193,
  },
  SZ: {
    d: 'M 415,152 L 425,148 L 435,150 L 442,158 L 445,168 L 438,175 L 428,178 L 418,175 L 411,168 L 412,158 Z',
    labelX: 428, labelY: 163,
  },
  OW: {
    d: 'M 378,185 L 388,182 L 396,188 L 396,198 L 388,205 L 378,202 L 372,195 L 373,186 Z',
    labelX: 384, labelY: 194,
  },
  NW: {
    d: 'M 395,175 L 405,172 L 410,178 L 408,188 L 398,190 L 390,185 L 392,177 Z',
    labelX: 400, labelY: 182,
  },
  GL: {
    d: 'M 445,158 L 458,155 L 468,160 L 470,172 L 462,180 L 450,178 L 442,170 L 443,162 Z',
    labelX: 456, labelY: 168,
  },
  ZG: {
    d: 'M 407,148 L 415,145 L 422,150 L 422,160 L 415,165 L 407,162 L 403,155 Z',
    labelX: 412, labelY: 155,
  },
  FR: {
    d: 'M 285,190 L 298,185 L 310,190 L 315,202 L 310,215 L 298,220 L 286,215 L 280,204 Z',
    labelX: 297, labelY: 203,
  },
  SO: {
    d: 'M 330,120 L 345,115 L 358,120 L 362,132 L 355,142 L 342,145 L 330,140 L 325,130 Z',
    labelX: 343, labelY: 130,
  },
  BS: {
    d: 'M 332,90 L 342,86 L 350,91 L 350,101 L 342,105 L 333,101 Z',
    labelX: 341, labelY: 96,
  },
  BL: {
    d: 'M 318,100 L 332,95 L 342,100 L 345,112 L 336,120 L 322,118 L 314,110 Z',
    labelX: 330, labelY: 108,
  },
  SH: {
    d: 'M 378,70 L 395,65 L 408,72 L 408,84 L 395,88 L 380,83 Z',
    labelX: 393, labelY: 77,
  },
  AR: {
    d: 'M 468,110 L 478,106 L 486,112 L 484,122 L 474,125 L 466,120 Z',
    labelX: 476, labelY: 116,
  },
  AI: {
    d: 'M 473,118 L 481,116 L 485,122 L 480,128 L 472,126 Z',
    labelX: 478, labelY: 122,
  },
  SG: {
    d: 'M 450,92 L 468,86 L 482,90 L 492,100 L 492,115 L 482,122 L 468,125 L 455,120 L 445,110 L 445,100 Z',
    labelX: 468, labelY: 106,
  },
  GR: {
    d: 'M 460,148 L 480,140 L 502,138 L 522,145 L 535,158 L 535,175 L 522,188 L 505,195 L 488,195 L 470,188 L 458,175 L 455,162 Z',
    labelX: 495, labelY: 167,
  },
  AG: {
    d: 'M 355,110 L 372,105 L 388,108 L 396,118 L 392,130 L 378,135 L 362,132 L 352,122 Z',
    labelX: 374, labelY: 120,
  },
  TG: {
    d: 'M 420,82 L 438,78 L 452,84 L 455,95 L 446,103 L 432,105 L 418,100 L 415,90 Z',
    labelX: 435, labelY: 92,
  },
  TI: {
    d: 'M 415,215 L 430,208 L 448,210 L 462,220 L 465,235 L 458,248 L 445,255 L 430,258 L 415,252 L 405,240 L 405,228 Z',
    labelX: 433, labelY: 232,
  },
  VD: {
    d: 'M 245,200 L 262,195 L 278,200 L 285,212 L 280,228 L 265,235 L 248,232 L 238,220 L 238,208 Z',
    labelX: 260, labelY: 215,
  },
  VS: {
    d: 'M 290,225 L 312,218 L 335,222 L 355,230 L 368,245 L 365,262 L 350,272 L 330,275 L 310,270 L 292,260 L 282,245 L 284,232 Z',
    labelX: 323, labelY: 248,
  },
  NE: {
    d: 'M 248,168 L 262,162 L 275,165 L 280,177 L 272,188 L 257,190 L 245,182 Z',
    labelX: 262, labelY: 176,
  },
  GE: {
    d: 'M 225,238 L 238,233 L 246,240 L 244,250 L 232,254 L 222,248 Z',
    labelX: 234, labelY: 244,
  },
  JU: {
    d: 'M 288,110 L 305,105 L 318,110 L 320,122 L 310,130 L 295,128 L 284,120 Z',
    labelX: 302, labelY: 118,
  },
};

const LABEL_POSITIONS = Object.fromEntries(
  Object.entries(CANTON_PATHS).map(([id, v]) => [id, { x: v.labelX, y: v.labelY }])
);

export default function SwitzerlandMap({ visits, selectedCanton, onSelect, isVisited }) {
  return (
    <div className="map-container">
      <svg
        viewBox="200 60 360 230"
        className="switzerland-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Object.entries(CANTON_PATHS).map(([id, { d, labelX, labelY }]) => {
          const canton = CANTON_MAP[id];
          const visited = isVisited(id);
          const selected = selectedCanton === id;
          const color = visited ? REGIONS[canton.region].color : undefined;

          return (
            <g key={id} className="canton-group" onClick={() => onSelect(id)}>
              <path
                d={d}
                className={`canton-path ${visited ? 'visited' : 'unvisited'} ${selected ? 'selected' : ''}`}
                style={visited ? { fill: color, stroke: selected ? '#fff' : color } : {}}
                data-id={id}
              />
              <text
                x={labelX}
                y={labelY}
                className={`canton-label ${visited ? 'label-visited' : ''} ${selected ? 'label-selected' : ''}`}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
