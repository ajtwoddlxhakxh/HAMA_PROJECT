import "./EntryCard.css";
import iconJoy from "../assets/icons/mood_joy.svg";
import iconMeh from "../assets/icons/mood_meh.svg";
import iconSad from "../assets/icons/mood_sad.svg";
import iconAngry from "../assets/icons/mood_angry.svg";

const ICON_BY_MOOD = {
  joy: iconJoy,
  meh: iconMeh,
  sad: iconSad,
  angry: iconAngry,
};

export default function EntryCard({ date, content, mood, image }) {
  const icon = ICON_BY_MOOD[mood];
  return (
    <div className="entry-card">
      {image && <img src={image} alt="" className="entry-thumb" />}
      <div className="entry-body">
        <div className="entry-date">{date}</div>
        <div className="entry-title">
          {icon && <img src={icon} alt={mood} className="entry-icon" />}
          <strong>
            {content.length > 18 ? content.slice(0, 18) + "…" : content}
          </strong>
        </div>
        <div className="entry-text">{content}</div>
      </div>
    </div>
  );
}
