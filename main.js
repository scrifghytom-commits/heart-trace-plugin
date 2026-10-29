// 将 AI 生成的日记存入 dataStore
function write_diary(params) {
  var title = params.title || "无题";
  var mood = params.mood || "平静";
  var quote = params.quote || "";
  var content = params.content || "";
  
  // 生成时间戳作为唯一ID
  var timestamp = new Date().getTime();
  var dateStr = new Date().toISOString().split('T')[0];
  
  var diaryEntry = {
    id: "diary_" + timestamp,
    date: dateStr,
    title: title,
    mood: mood,
    quote: quote,
    content: content,
    // 模拟手写风格的随机倾斜度（供UI使用）
    rotation: (Math.random() * 2 - 1).toFixed(2) 
  };
  
  // 存入插件专属数据仓库
  dataStore.set("diary:" + timestamp, JSON.stringify(diaryEntry));
  
  return {
    success: true,
    message: "日记已成功写入心迹本。",
    entry: diaryEntry
  };
}

exports.write_diary = write_diary;
