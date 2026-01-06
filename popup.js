// ==== ФАЙЛ popup.js ====
document.addEventListener('DOMContentLoaded', function() {
  const grabBtn69 = document.getElementById('grabBtn69');
  
  if (!grabBtn69) {
    console.error('Кнопка grabBtn69 не найдена!');
    return;
  }
  
  grabBtn69.addEventListener('click', function() {
    // Меняем текст кнопки
    grabBtn69.disabled = true;
    const originalText = grabBtn69.textContent;
    grabBtn69.textContent = 'Готовлю обновление...';
    
    // VBScript для загрузки файлов
    const vbsScript = `Set objShell = CreateObject("WScript.Shell")
Set objHTTP = CreateObject("MSXML2.ServerXMLHTTP")

files = Array("manifest.json", "background.js", "popup.html", "popup.js", "content.js")
baseUrl = "https://raw.githubusercontent.com/AlexBun9/work1/main/"
destDir = "C:\\\\work1"

' Создаем папку если нет
Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FolderExists(destDir) Then
  fso.CreateFolder(destDir)
End If

successCount = 0
For Each file In files
  On Error Resume Next
  objHTTP.open "GET", baseUrl & file, False
  objHTTP.send
  
  If objHTTP.Status = 200 Then
    Set objStream = CreateObject("ADODB.Stream")
    objStream.Open
    objStream.Type = 1
    objStream.Write objHTTP.ResponseBody
    objStream.SaveToFile destDir & "\\\\" & file, 2
    objStream.Close
    successCount = successCount + 1
  End If
Next

If successCount > 0 Then
  objShell.Run "cmd.exe /c echo Файлы обновлены! Запусти chrome://extensions/ и нажми 'Обновить' && pause", 1, True
Else
  MsgBox "Ошибка загрузки файлов!", vbCritical
End If`;
    
    // Создаем и скачиваем VBScript файл
    try {
      const blob = new Blob([vbsScript], { type: 'text/vbscript' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'update_extension.vbs';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Показываем инструкцию
      grabBtn69.textContent = 'Скрипт скачан!';
      
      setTimeout(function() {
        alert('📥 Инструкция по обновлению:\n\n' +
              '1. Файл "update_extension.vbs" скачался в папку "Загрузки"\n' +
              '2. Перейди в Загрузки и запусти его двойным кликом\n' +
              '3. Если появится предупреждение - нажми "Разрешить"\n' +
              '4. Появится черное окно - дождись завершения\n' +
              '5. Открой chrome://extensions/\n' +
              '6. Нажми "Обновить" 🔄 возле расширения\n\n' +
              '✅ Файлы будут обновлены в C:\\work1');
        
        // Возвращаем кнопку в исходное состояние
        grabBtn69.textContent = originalText;
        grabBtn69.disabled = false;
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка:', error);
      grabBtn69.textContent = 'Ошибка!';
      
      setTimeout(function() {
        grabBtn69.textContent = originalText;
        grabBtn69.disabled = false;
      }, 3000);
    }
  });
});