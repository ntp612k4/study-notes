import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import "./App.css";

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [subjects, setSubjects] = useState([
    { id: "math", name: "Toán", color: "#ff6b6b", icon: "🔢" },
    { id: "physics", name: "Lý", color: "#4ecdc4", icon: "⚡" },
    { id: "english", name: "Anh", color: "#45b7d1", icon: "📖" },
    { id: "computer", name: "CNTT", color: "#96ceb4", icon: "💻" },
    { id: "chemistry", name: "Hóa", color: "#ffeaa7", icon: "🧪" },
    { id: "biology", name: "Sinh", color: "#fd79a8", icon: "🌿" },
  ]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectIcon, setNewSubjectIcon] = useState("📚");
  const [selectedColor, setSelectedColor] = useState("#ff6b6b");

  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#ffeaa7",
    "#fd79a8",
    "#a29bfe",
    "#55efc4",
    "#fab1a0",
    "#00b894",
  ];
  const icons = [
    "🔢",
    "⚡",
    "🇬🇧",
    "💻",
    "🧪",
    "🌿",
    "📚",
    "🎨",
    "🎵",
    "⚽",
    "🍕",
    "📖",
    "🔬",
    "📐",
    "✏️",
    "🎓",
  ];

  const loadData = async () => {
    try {
      const { value: notesValue } = await Preferences.get({
        key: "study-notes",
      });
      const { value: subjectsValue } = await Preferences.get({
        key: "study-subjects",
      });
      if (notesValue) setNotes(JSON.parse(notesValue));
      if (subjectsValue) setSubjects(JSON.parse(subjectsValue));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveNotes = async (newNotes) => {
    try {
      await Preferences.set({
        key: "study-notes",
        value: JSON.stringify(newNotes),
      });
      setNotes(newNotes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const saveSubjects = async (newSubjects) => {
    try {
      await Preferences.set({
        key: "study-subjects",
        value: JSON.stringify(newSubjects),
      });
      setSubjects(newSubjects);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setCurrentNote(notes[subject.id] || "");
  };

  const handleSaveNote = () => {
    const newNotes = { ...notes, [selectedSubject.id]: currentNote };
    saveNotes(newNotes);
    alert("Lưu thành công!");
  };

  const handleDeleteNote = () => {
    const newNotes = { ...notes };
    delete newNotes[selectedSubject.id];
    saveNotes(newNotes);
    setCurrentNote("");
    alert("Xóa thành công!");
  };

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) {
      alert("Nhập tên môn học!");
      return;
    }
    const newId = newSubjectName.toLowerCase().replace(/\s+/g, "_");
    const updatedSubjects = [
      ...subjects,
      {
        id: newId,
        name: newSubjectName,
        color: selectedColor,
        icon: newSubjectIcon,
      },
    ];
    saveSubjects(updatedSubjects);
    setNewSubjectName("");
    setNewSubjectIcon("");
    setSelectedColor("#ff6b6b");
    setShowAddSubject(false);
  };

  const handleDeleteSubject = (subjectId) => {
    if (window.confirm("Xóa môn học này?")) {
      const updatedSubjects = subjects.filter((s) => s.id !== subjectId);
      saveSubjects(updatedSubjects);
      const newNotes = { ...notes };
      delete newNotes[subjectId];
      saveNotes(newNotes);
      if (selectedSubject?.id === subjectId) setSelectedSubject(null);
    }
  };

  return (
    <div className="app">
      {!selectedSubject ? (
        <div className="main-screen">
          <h1 className="app-title">📚 Ghi chú học tập</h1>
          <p className="app-subtitle">Chọn môn học</p>
          <div className="subjects-grid">
            {subjects.map((subject) => (
              <div key={subject.id} className="subject-card-wrapper">
                <div
                  className="subject-card"
                  style={{ backgroundColor: subject.color }}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <div className="subject-icon">{subject.icon}</div>
                  <h3 className="subject-name">{subject.name}</h3>
                  <p className="note-count">
                    {notes[subject.id]
                      ? notes[subject.id].length + " ký tự"
                      : "Chưa có"}
                  </p>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteSubject(subject.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          <button
            className="add-subject-btn"
            onClick={() => setShowAddSubject(true)}
          >
            ➕ Thêm môn học
          </button>
          {showAddSubject && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Thêm môn học mới</h2>
                <input
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="Tên môn học"
                  className="form-input"
                />
                <label>Icon:</label>
                <div className="icon-picker">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      className={newSubjectIcon === icon ? "selected" : ""}
                      onClick={() => setNewSubjectIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <label>Màu:</label>
                <div className="color-picker">
                  {colors.map((color) => (
                    <button
                      key={color}
                      style={{ backgroundColor: color }}
                      className={selectedColor === color ? "selected" : ""}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
                <div className="modal-actions">
                  <button className="save-button" onClick={handleAddSubject}>
                    Thêm
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setShowAddSubject(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="note-screen">
          <div className="note-header">
            <button
              className="back-button"
              onClick={() => setSelectedSubject(null)}
            >
              ← Quay lại
            </button>
            <h2 className="note-title">
              {selectedSubject.icon} {selectedSubject.name}
            </h2>
          </div>
          <div className="note-content">
            <textarea
              className="note-input"
              placeholder="Ghi chú..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
            <div className="note-actions">
              <button className="save-button" onClick={handleSaveNote}>
                💾 Lưu ghi chú
              </button>
              {notes[selectedSubject.id] && (
                <button className="delete-note-btn" onClick={handleDeleteNote}>
                  🗑️ Xóa ghi chú
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
