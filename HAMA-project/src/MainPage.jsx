import "./MainPage.css";
import { Link } from "react-router-dom";
import EmotionPicker, { EMOTIONS } from "../components/EmotionPicker";
import EntryCard from "../components/EntryCard";
import { useDiaryStore, todayKey, useSeedOnce } from "../store/useDiaryStore";
// 아이콘이다
import iconProfile from "../assets/icons/profile.svg";
import iconSearch from "../assets/icons/search.svg";
import iconCow from "../assets/icons/chat_cow.svg";

export default function MainPage() {
  useSeedOnce();

  const {
    todayMood,
    setTodayMood,
    filterMood,
    setFilterMood,
    keyword,
    setKeyword,
    filteredEntries,
  } = useDiaryStore((s) => ({
    todayMood: s.todayMood,
    setTodayMood: s.setTodayMood,
    filterMood: s.filterMood,
    setFilterMood: s.setFilterMood,
    keyword: s.keyword,
    setKeyword: s.setKeyword,
    filteredEntries: s.filteredEntries,
  }));

  const dateStr = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const tkey = todayKey();
  const todaySelected = todayMood[tkey] || null;
  const entries = filteredEntries();

  return (
    <div className="main-wrap">
      {/* 헤더 */}
      <header className="topbar">
        <div className="topbar-inner">
          <strong className="brand">HAMA</strong>
          <button
            className="icon-btn"
            onClick={() => alert("프로필로 이동(추후 라우팅)")}
          >
            <img src={iconProfile} alt="프로필" />
          </button>
        </div>
      </header>

      <main className="container">
        <section className="greet">
          <div className="date">{dateStr}</div>
          <div className="headline">안녕하세요! 오늘 하루는 어떠신가요?</div>
        </section>

        {/* 오늘의 감정 */}
        <section className="today-mood">
          <div className="section-caption">TODAY EMOTION DIARY</div>
          <EmotionPicker value={todaySelected} onChange={setTodayMood} />
          <div className="mood-info">
            {todaySelected ? (
              <>
                오늘의 감정이 <b>{EMOTIONS[todaySelected].label}</b>로
                기록되었어요.
              </>
            ) : (
              "오늘의 감정을 선택해 주세요."
            )}
          </div>
        </section>

        {/* 검색/필터 */}
        <section className="search-filter">
          <div className="search-row">
            <div className="search-icon">
              <img src={iconSearch} alt="" />
            </div>
            <input
              className="search-input"
              placeholder="키워드를 입력하여 검색하기"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="chips">
            {["전체", "joy", "meh", "sad", "angry"].map((k) => {
              const label = k === "전체" ? "전체" : EMOTIONS[k].label;
              const active = filterMood === k;
              return (
                <button
                  key={k}
                  className={`chip ${active ? "active" : ""}`}
                  onClick={() => setFilterMood(k)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* HAMA와 대화하기 */}
        <section className="chat-cta">
          <Link to="/chat" className="chat-card">
            <img src={iconCow} alt="하마 캐릭터" className="chat-icon" />
            <div className="chat-title">
              HAMA와
              <br />
              대화하기
            </div>
          </Link>
        </section>

        {/* 결과 리스트 */}
        <section className="entry-list">
          {entries.length === 0 ? (
            <div className="empty">검색/필터 결과가 없습니다.</div>
          ) : (
            entries.map((e) => <EntryCard key={e.id} {...e} />)
          )}
        </section>
      </main>
    </div>
  );
}
