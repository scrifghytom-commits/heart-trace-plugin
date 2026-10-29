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
  
  dataStore.set(diaryEntry.id, JSON.stringify(diaryEntry));
  dataStore.set("latest_diary_key", diaryEntry.id); 
  
  return { success: true, message: "日记已存入心迹本。", entry: diaryEntry };
}

// 更新日记 (供网页端编辑保存)
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
  
  dataStore.set(key, JSON.stringify(diaryEntry));
  return { success: true, entry: diaryEntry };
}

// 【关键】获取列表：返回 JSON 字符串供 WebView 解析
function get_all_diaries() {
  var keys = dataStore.list("diary_");
  var list = [];
  for (var i = 0; i < keys.length; i++) {
    var raw = dataStore.get(keys[i]);
    if (raw) {
      list.push(JSON.parse(raw));
    }
  }
  // 按 ID 倒序（最新的在前）
  list.sort(function(a, b) { return b.id.localeCompare(a.id); });
  return { success: true, data: JSON.stringify(list) };
}

exports.write_diary = write_diary;
exports.update_diary = update_diary;
exports.get_all_diaries = get_all_diaries;
