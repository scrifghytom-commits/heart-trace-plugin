// 写入日记 (AI 调用)
function write_diary(params) {
  var timestamp = new Date().getTime();
  var dateStr = new Date().toISOString().split('T')[0];
  
  var diaryEntry = {
    id: "diary_" + timestamp,
    date: dateStr,
    title: params.title || "无题",
    mood: params.mood || "平静",
    quote: params.quote || "",
    content: params.content || "",
    isEdited: false,
    rotation: (Math.random() * 2 - 1).toFixed(2)
  };
  
  dataStore.set("diary:" + timestamp, JSON.stringify(diaryEntry));
  dataStore.set("latest_diary_key", "diary:" + timestamp); // 记录最新一篇
  
  return { success: true, message: "日记已存入心迹本。", entry: diaryEntry };
}

// 更新日记 (供用户网页端编辑保存)
function update_diary(params) {
  var key = params.id;
  var existing = dataStore.get(key);
  if (!existing) {
    return { success: false, error: "日记不存在" };
  }
  
  var diaryEntry = JSON.parse(existing);
  diaryEntry.title = params.title || diaryEntry.title;
  diaryEntry.mood = params.mood || diaryEntry.mood;
  diaryEntry.quote = params.quote !== undefined ? params.quote : diaryEntry.quote;
  diaryEntry.content = params.content || diaryEntry.content;
  diaryEntry.isEdited = true; // 标记为用户已编辑
  
  dataStore.set(key, JSON.stringify(diaryEntry));
  return { success: true, entry: diaryEntry };
}

exports.write_diary = write_diary;
exports.update_diary = update_diary;
