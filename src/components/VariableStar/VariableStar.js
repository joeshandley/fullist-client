import "./VariableStar.scss";

export default function VariableStar({ clickHandler, isFavourite }) {
  return (
    <svg
      className="star"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="96.000000pt"
      height="96.000000pt"
      viewBox="0 0 96.000000 96.000000"
      preserveAspectRatio="xMidYMid meet"
      onClick={() => {
        clickHandler();
      }}
    >
      <g
        className={`star__fill${isFavourite ? " star__fill--favourite" : ""}`}
        transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M453 873 c-7 -2 -38 -51 -68 -108 -31 -57 -64 -106 -73 -109 -9 -3
-59 -12 -109 -21 -115 -19 -118 -20 -132 -51 -15 -34 -4 -53 85 -144 l74 -76
-16 -113 c-19 -127 -13 -156 32 -167 21 -5 51 5 131 45 l103 51 100 -50 c109
-55 138 -60 165 -30 17 19 17 25 2 142 l-17 122 85 87 c50 51 85 95 85 107 0
43 -30 60 -130 77 -52 8 -104 17 -115 20 -13 3 -37 36 -70 97 -67 123 -85 140
-132 121z"
        />
      </g>
    </svg>
  );
}
