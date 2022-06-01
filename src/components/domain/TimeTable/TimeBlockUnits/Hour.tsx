import type { HourProps } from "../type";

const Hour: React.FC<HourProps> = ({ hour }) => (
  <div
    style={{
      fontWeight: hour % 6 === 0 ? "900" : undefined,
    }}
  >
    {hour}
    <span>시</span>
  </div>
);

export default Hour;
