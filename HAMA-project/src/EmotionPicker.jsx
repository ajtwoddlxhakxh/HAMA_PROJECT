import "./EmotionPicker.css";

import iconJoy from "../assets/icons/mood_joy.svg";
import iconMeh from "../assets/icons/mood_meh.svg";
import iconSad from "../assets/icons/mood_sad.svg";
import iconAngry from "../assets/icons/mood_angry.svg";

const EMOTIONS = {
  joy: { label: "기쁨", icon: iconJoy },
  meh: { label: "쏘쏘", icon: iconMeh },
  sad: { label: "슬픔", icon: iconSad },
  angry: { label: "화남", icon: iconAngry },
};

export default function EmotionPicker({ value, onChange }) {
  return (
    <div className="ep-container">
      <div className="ep-grid">
        {Object.entries(EMOTIONS).map(([key, info]) => {
          const active = value === key;
          return (
            <button
              key={key}
              onClick={() => onChange?.(key)}
              className={`ep-btn ${active ? "active" : ""}`}
              title={info.label}
              aria-pressed={active}
            >
              <img src={info.icon} alt={info.label} className="ep-icon" />
              <div className="ep-label">{info.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// 다른 컴포넌트에서도 쓰고 싶으면 export
export { EMOTIONS };
