import "./VariableArrow.scss";

export default function VariableArrow({ listId }) {
  return (
    <a className="arrow" href={`/locations/${listId}`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="96.000000pt"
        height="96.000000pt"
        viewBox="0 0 96.000000 96.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path
            d="M560 690 c-12 -12 -20 -33 -20 -55 l0 -35 -190 0 c-234 0 -230 2
-230 -120 0 -122 -4 -120 230 -120 l190 0 0 -35 c0 -38 28 -75 58 -75 23 0 52
21 160 114 86 73 92 81 92 116 0 35 -6 43 -92 116 -144 124 -160 132 -198 94z"
          />
        </g>
      </svg>
    </a>
  );
}
