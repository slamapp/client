import type { ChangeEvent } from "react";
import { Radio } from "~/components/base";

export const slotItems = [
  { value: "dawn", text: "새벽" },
  { value: "morning", text: "아침" },
  { value: "afternoon", text: "낮" },
  { value: "night", text: "밤" },
] as const;

interface SlotPickerProps {
  selectedSlot: typeof slotItems[number]["value"];
  className?: string;
  currentDateTimeSlot: typeof slotItems[number]["value"] | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
  selectedSlot,
  className,
  onChange,
  currentDateTimeSlot,
}) => {
  const limit = slotItems.findIndex(
    ({ value }) => value === currentDateTimeSlot
  );

  return (
    <Radio.Group onChange={onChange} className={className}>
      {slotItems.map(
        ({ text, value }, index) =>
          !(index < limit) && (
            <Radio.Item
              key={value}
              text={text}
              value={value}
              checked={selectedSlot === value}
            />
          )
      )}
    </Radio.Group>
  );
};

export default SlotPicker;
